using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Domain.Enums;

namespace ERPInsightAI.Domain.Entities;

public class ProductionOrder
{
    public ProductionOrder(
    string productionOrderNumber,
    Guid? salesOrderId,
    DateTime plannedStartDate,
    DateTime plannedEndDate)
    {
        
        if (string.IsNullOrWhiteSpace(productionOrderNumber))
            throw new ArgumentException("Üretim emri numarası boş olamaz.");

        if (plannedEndDate <= plannedStartDate)
            throw new ArgumentException("Planlanan bitiş tarihi başlangıç tarihinden sonra olmalıdır.");

        Id = Guid.NewGuid();
        ProductionOrderNumber = productionOrderNumber;
        SalesOrderId = salesOrderId;
        PlannedStartDate = plannedStartDate;
        PlannedEndDate = plannedEndDate;
        Status = ProductionOrderStatus.Created;
    }
    public ProductionOrderStatus Status { get; private set; }
    public List<Operation> Operations { get; private set; } = new();
    public Guid Id { get; private set; }

    public string ProductionOrderNumber { get; private set; } = string.Empty;

    public Guid? SalesOrderId { get; private set; }

    public DateTime PlannedStartDate { get; private set; }

    public DateTime PlannedEndDate { get; private set; }

    public DateTime? ActualStartDate { get; private set; }

    public DateTime? ActualEndDate { get; private set; }
    public void AddOperation(Operation operation)
    {
        if (Status == ProductionOrderStatus.Completed)
            throw new InvalidOperationException("Tamamlanmış üretim emrine operasyon eklenemez.");
        if (operation == null)
            throw new ArgumentNullException(nameof(operation));

        if (Operations.Any(o => o.Sequence == operation.Sequence))
            throw new InvalidOperationException("Aynı sıra numarasına sahip operasyon zaten mevcut.");

        Operations.Add(operation);
    }
    public void Start()
    {
        if (Status != ProductionOrderStatus.Planned &&
            Status != ProductionOrderStatus.Created)
            throw new InvalidOperationException("Üretim emri başlatılamaz.");

        ActualStartDate = DateTime.Now;
        Status = ProductionOrderStatus.InProduction;
    }
    public void Complete()
    {
        if (Status != ProductionOrderStatus.InProduction)
            throw new InvalidOperationException("Üretim emri tamamlanamaz.");

        ActualEndDate = DateTime.Now;
        Status = ProductionOrderStatus.Completed;
    }
    public void Update(
    string productionOrderNumber,
    DateTime plannedStartDate,
    DateTime plannedEndDate)
    {
        if (string.IsNullOrWhiteSpace(productionOrderNumber))
            throw new ArgumentException("Üretim emri numarası boş olamaz.");

        if (plannedEndDate <= plannedStartDate)
            throw new ArgumentException("Planlanan bitiş tarihi başlangıçtan büyük olmalıdır.");

        ProductionOrderNumber = productionOrderNumber;
        PlannedStartDate = plannedStartDate;
        PlannedEndDate = plannedEndDate;
    }
}