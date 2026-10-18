using ERPInsightAI.Domain.Entities;
using ERPInsightAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPInsightAI.Infrastructure.Data;

public static class SeedData
{
    public static async Task InitializeAsync(ERPInsightAIDbContext context)
    {
        await context.Database.MigrateAsync();

        await SeedDepartments(context);

        await SeedMachines(context);

        await SeedEmployees(context);

        await SeedSalesOrders(context);

        await SeedProductionOrders(context);

        await SeedOperations(context);
    }

    private static async Task SeedDepartments(ERPInsightAIDbContext context)
    {
        if (await context.Departments.AnyAsync())
            return;

        var department = new Department(
            "URETIM",
            "Üretim"
        );

        context.Departments.Add(department);

        await context.SaveChangesAsync();
    }

    private static async Task SeedMachines(ERPInsightAIDbContext context)
    {
        if (await context.Machines.AnyAsync())
            return;

        var department = await context.Departments.FirstAsync();

        var machines = new List<Machine>
    {
        new Machine("M001","CNC Torna",department.Id),
        new Machine("M002","CNC Freze",department.Id),
        new Machine("M003","Lazer Kesim",department.Id),
        new Machine("M004","Robot Kaynak",department.Id),
        new Machine("M005","Abkant Pres",department.Id),
        new Machine("M006","Plazma Kesim",department.Id),
        new Machine("M007","Taşlama",department.Id),
        new Machine("M008","Delme Tezgahı",department.Id),
        new Machine("M009","Montaj Hattı",department.Id),
        new Machine("M010","Paketleme Hattı",department.Id)
    };

        context.Machines.AddRange(machines);

        await context.SaveChangesAsync();
    }

    private static async Task SeedEmployees(ERPInsightAIDbContext context)
    {
        if (await context.Employees.AnyAsync())
            return;

        var department = await context.Departments.FirstAsync();

        var employees = new List<Employee>
    {
        new Employee("EMP001","Ahmet","Yılmaz","Operatör",department.Id),
        new Employee("EMP002","Mehmet","Kaya","CNC Operatörü",department.Id),
        new Employee("EMP003","Ayşe","Demir","Kalite Kontrol",department.Id),
        new Employee("EMP004","Fatma","Şahin","Üretim Planlama",department.Id),
        new Employee("EMP005","Ali","Çelik","Kaynak Operatörü",department.Id),
        new Employee("EMP006","Hasan","Aydın","Operatör",department.Id),
        new Employee("EMP007","Zeynep","Kurt","Montaj Operatörü",department.Id),
        new Employee("EMP008","Mustafa","Koç","Forklift Operatörü",department.Id),
        new Employee("EMP009","Merve","Arslan","Kalite Mühendisi",department.Id),
        new Employee("EMP010","Emre","Yıldırım","Bakım Teknisyeni",department.Id),
        new Employee("EMP011","Burak","Aksoy","Operatör",department.Id),
        new Employee("EMP012","Elif","Öztürk","Planlama Uzmanı",department.Id),
        new Employee("EMP013","Can","Polat","Üretim Mühendisi",department.Id),
        new Employee("EMP014","Selin","Yılmaz","Operatör",department.Id),
        new Employee("EMP015","Onur","Keskin","Vardiya Amiri",department.Id)
    };

        context.Employees.AddRange(employees);

        await context.SaveChangesAsync();
    }

    private static async Task SeedSalesOrders(ERPInsightAIDbContext context)
    {
        if (await context.SalesOrders.AnyAsync())
            return;

        var salesOrders = new List<SalesOrder>
    {
        new SalesOrder("SO001","Ford Otosan","Motor Bloğu",500),
        new SalesOrder("SO002","Bosch","Fren Diski",300),
        new SalesOrder("SO003","Tofaş","Şanzıman",120),
        new SalesOrder("SO004","Arçelik","Motor Gövdesi",250),
        new SalesOrder("SO005","Vestel","Pompa",180),
        new SalesOrder("SO006","Ford Otosan","Şaft",600),
        new SalesOrder("SO007","Bosch","Dişli",420),
        new SalesOrder("SO008","Tofaş","Aks Mili",150),
        new SalesOrder("SO009","Arçelik","Metal Kapak",350),
        new SalesOrder("SO010","Vestel","Kompresör Gövdesi",220),
        new SalesOrder("SO011","Ford Otosan","Direksiyon Mili",400),
        new SalesOrder("SO012","Bosch","Valf",280),
        new SalesOrder("SO013","Tofaş","Motor Kapağı",175),
        new SalesOrder("SO014","Arçelik","Metal Plaka",500),
        new SalesOrder("SO015","Vestel","Mil",260)
    };

        var startDate = DateTime.Today;

        for (int i = 0; i < salesOrders.Count; i++)
        {
            salesOrders[i].PlannedStartDate = startDate.AddDays(i);
            salesOrders[i].PlannedEndDate = startDate.AddDays(i + 2);
        }

        context.SalesOrders.AddRange(salesOrders);

        await context.SaveChangesAsync();
    }

    private static async Task SeedProductionOrders(ERPInsightAIDbContext context)
    {
        if (await context.ProductionOrders.AnyAsync())
            return;

        var salesOrders = await context.SalesOrders.ToListAsync();

        var productionOrders = new List<ProductionOrder>();

        int orderNumber = 1;

        foreach (var salesOrder in salesOrders)
        {
            var productionOrder = new ProductionOrder(
                $"U{orderNumber:000}",
                salesOrder.Id,
                salesOrder.PlannedStartDate,
                salesOrder.PlannedEndDate
            );

            if (orderNumber <= 5)
            {
                productionOrder.Start();
                productionOrder.Complete();
            }
            else if (orderNumber <= 10)
            {
                productionOrder.Start();
            }

            productionOrders.Add(productionOrder);

            orderNumber++;
        }

        context.ProductionOrders.AddRange(productionOrders);

        await context.SaveChangesAsync();
    }

    private static async Task SeedOperations(ERPInsightAIDbContext context)
    {
        if (await context.Operations.AnyAsync())
            return;

        var productionOrders = await context.ProductionOrders.ToListAsync();
        var machines = await context.Machines.ToListAsync();
        var employees = await context.Employees.ToListAsync();

        var operationTemplates = new[]
        {
        ("OP001", "Malzeme Hazırlama"),
        ("OP002", "Kesim"),
        ("OP003", "CNC İşleme"),
        ("OP004", "Kalite Kontrol"),
        ("OP005", "Paketleme")
    };

        var operations = new List<Operation>();

        int machineIndex = 0;
        int employeeIndex = 0;

        foreach (var productionOrder in productionOrders)
        {
            var start = productionOrder.PlannedStartDate;

            for (int i = 0; i < operationTemplates.Length; i++)
            {
                var machine = machines[machineIndex % machines.Count];
                var employee = employees[employeeIndex % employees.Count];

                var operation = new Operation(
                    productionOrder.Id,
                    operationTemplates[i].Item1,
                    operationTemplates[i].Item2,
                    i + 1,
                    machine.Id,
                    employee.Id,
                    start.AddHours(i * 2),
                    start.AddHours((i + 1) * 2)
                );

                // İlk 5 üretim emrinin operasyonlarını tamamlanmış yap
                if (productionOrder.Status == ERPInsightAI.Domain.Enums.ProductionOrderStatus.Completed)
                {
                    operation.Start();
                    operation.Complete();
                }
                // Üretimde olanların ilk iki operasyonunu başlat
                else if (productionOrder.Status == ERPInsightAI.Domain.Enums.ProductionOrderStatus.InProduction && i < 2)
                {
                    operation.Start();
                }

                operations.Add(operation);

                machineIndex++;
                employeeIndex++;
            }
        }

        context.Operations.AddRange(operations);

        await context.SaveChangesAsync();
    }
}