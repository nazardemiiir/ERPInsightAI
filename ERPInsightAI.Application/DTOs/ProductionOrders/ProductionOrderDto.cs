using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPInsightAI.Application.DTOs.ProductionOrders;

public class ProductionOrderDto
{
    public Guid Id { get; set; }

    public string ProductionOrderNumber { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public DateTime PlannedStartDate { get; set; }

    public DateTime PlannedEndDate { get; set; }

    public DateTime? ActualStartDate { get; set; }

    public DateTime? ActualEndDate { get; set; }
}