using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPInsightAI.Application.DTOs.ProductionOrders;

public class CreateProductionOrderDto
{
    public string ProductionOrderNumber { get; set; } = string.Empty;

    public Guid? SalesOrderId { get; set; }

    public DateTime PlannedStartDate { get; set; }

    public DateTime PlannedEndDate { get; set; }
}