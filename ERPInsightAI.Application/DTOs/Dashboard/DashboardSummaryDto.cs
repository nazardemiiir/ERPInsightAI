using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace ERPInsightAI.Application.DTOs.Dashboard;

public class DashboardSummaryDto
{
    public int TotalProductionOrders { get; set; }

    public int PlannedOrders { get; set; }

    public int InProductionOrders { get; set; }

    public int CompletedOrders { get; set; }

    public int CancelledOrders { get; set; }

    public int DelayedOrders { get; set; }
    public double DelayRate { get; set; }

    public int ActiveMachines { get; set; }
    public int IdleMachines { get; set; }

    public int MaintenanceMachines { get; set; }

    public int BreakdownMachines { get; set; }
    public double MachineUtilizationRate { get; set; }
    public double AverageProductionTimeInHours { get; set; }
    public double OnTimeDeliveryRate { get; set; }

    public int ActiveEmployees { get; set; }
    public string RiskLevel { get; set; } = string.Empty;
    public string Recommendation { get; set; } = string.Empty;
    public int PerformanceScore { get; set; }

    public string AIInsight { get; set; } = string.Empty;

    public List<RecentProductionOrderDto> RecentProductionOrders { get; set; } = new();

}