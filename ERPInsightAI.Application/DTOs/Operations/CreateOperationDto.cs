using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace ERPInsightAI.Application.DTOs.Operations;

public class CreateOperationDto
{
    public Guid ProductionOrderId { get; set; }

    public string OperationCode { get; set; } = string.Empty;

    public string OperationName { get; set; } = string.Empty;

    public int Sequence { get; set; }

    public Guid MachineId { get; set; }

    public Guid EmployeeId { get; set; }

    public DateTime PlannedStartTime { get; set; }

    public DateTime PlannedEndTime { get; set; }
}