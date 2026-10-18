using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace ERPInsightAI.Application.DTOs.Dashboard;

public class RecentProductionOrderDto
{
    public Guid Id { get; set; }

    public string ProductionOrderNumber { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public DateTime PlannedEndDate { get; set; }

    public DateTime? ActualEndDate { get; set; }
}
