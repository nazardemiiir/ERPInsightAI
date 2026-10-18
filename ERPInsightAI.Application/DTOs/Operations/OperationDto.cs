namespace ERPInsightAI.Application.DTOs.Operations;

public class OperationDto
{
    public Guid Id { get; set; }

    public string OperationCode { get; set; } = string.Empty;

    public string OperationName { get; set; } = string.Empty;

    public int Sequence { get; set; }

    public string Status { get; set; } = string.Empty;

    public DateTime PlannedStartTime { get; set; }

    public DateTime PlannedEndTime { get; set; }

    public DateTime? ActualStartTime { get; set; }

    public DateTime? ActualEndTime { get; set; }
}