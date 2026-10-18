using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ERPInsightAI.Domain.Entities;


namespace ERPInsightAI.Infrastructure.Persistence;

public class ERPInsightAIDbContext : DbContext
{
    public ERPInsightAIDbContext(DbContextOptions<ERPInsightAIDbContext> options)
        : base(options)
    {
    }

    public DbSet<SalesOrder> SalesOrders => Set<SalesOrder>();

    public DbSet<ProductionOrder> ProductionOrders => Set<ProductionOrder>();

    public DbSet<Operation> Operations => Set<Operation>();

    public DbSet<Machine> Machines => Set<Machine>();

    public DbSet<Department> Departments => Set<Department>();

    public DbSet<Employee> Employees => Set<Employee>();

    public DbSet<DelayRecord> DelayRecords => Set<DelayRecord>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany(d => d.Employees)
            .HasForeignKey(e => e.DepartmentId);
    }
}