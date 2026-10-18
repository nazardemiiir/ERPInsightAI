using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Domain.Enums;

namespace ERPInsightAI.Domain.Entities;

public class Operation
{
    public Operation(
    Guid productionOrderId,
    string operationCode,
    string operationName,
    int sequence,
    Guid machineId,
    Guid employeeId,
    DateTime plannedStartTime,
    DateTime plannedEndTime)
    {
        if (plannedEndTime <= plannedStartTime)
            throw new ArgumentException("Planlanan bitiş tarihi başlangıç tarihinden sonra olmalıdır.");
        if (string.IsNullOrWhiteSpace(operationCode))
            throw new ArgumentException("Operasyon kodu boş olamaz.");

        if (string.IsNullOrWhiteSpace(operationName))
            throw new ArgumentException("Operasyon adı boş olamaz.");

        if (sequence <= 0)
            throw new ArgumentException("Operasyon sırası 1 veya daha büyük olmalıdır.");

        Id = Guid.NewGuid();
        ProductionOrderId = productionOrderId;
        OperationCode = operationCode;
        OperationName = operationName;
        Sequence = sequence;
        MachineId = machineId;
        EmployeeId = employeeId;
        PlannedStartTime = plannedStartTime;
        PlannedEndTime = plannedEndTime;
        Status = OperationStatus.Waiting;
    }
    public Guid Id { get; private set; }

    public Guid ProductionOrderId { get; private set; }

    public string OperationCode { get; private set; } = string.Empty;

    public string OperationName { get; private set; } = string.Empty;

    public int Sequence { get; private set; }

    public Guid MachineId { get; private set; }

    public Guid EmployeeId { get; private set; }

    public DateTime PlannedStartTime { get; private set; }

    public DateTime PlannedEndTime { get; private set; }

    public DateTime? ActualStartTime { get; private set; }

    public DateTime? ActualEndTime { get; private set; }

    public OperationStatus Status { get; private set; }

    public void Start()
    {
        if (Status != OperationStatus.Waiting)
            throw new InvalidOperationException("Operasyon başlatılamaz.");

        ActualStartTime = DateTime.Now;
        Status = OperationStatus.InProgress;
    }
    public void Complete()
    {
        if (Status != OperationStatus.InProgress)
            throw new InvalidOperationException("Operasyon tamamlanamaz.");

        ActualEndTime = DateTime.Now;
        Status = OperationStatus.Completed;
    }
}
