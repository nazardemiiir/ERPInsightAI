namespace ERPInsightAI.Application.DTOs.ProductionOrders;

public class UpdateProductionOrderDto
{
    public string ProductionOrderNumber { get; set; } = string.Empty;

    public DateTime PlannedStartDate { get; set; }

    public DateTime PlannedEndDate { get; set; }
}