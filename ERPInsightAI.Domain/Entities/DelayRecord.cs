using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Domain.Enums;

namespace ERPInsightAI.Domain.Entities;

public class DelayRecord
{
    public DelayRecord(
        Guid operationId,
        DelayReason delayReason,
        int delayMinutes,
        DateTime delayStartTime,
        DateTime delayEndTime,
        string description)
    {
        if (delayMinutes <= 0)
            throw new ArgumentException("Gecikme süresi sıfırdan büyük olmalıdır.");

        if (delayEndTime <= delayStartTime)
            throw new ArgumentException("Gecikme bitiş zamanı başlangıçtan sonra olmalıdır.");

        Id = Guid.NewGuid();
        OperationId = operationId;
        DelayReason = delayReason;
        DelayMinutes = delayMinutes;
        DelayStartTime = delayStartTime;
        DelayEndTime = delayEndTime;
        Description = description;
    }

    public Guid Id { get; private set; }

    public Guid OperationId { get; private set; }

    public DelayReason DelayReason { get; private set; }

    public int DelayMinutes { get; private set; }

    public DateTime DelayStartTime { get; private set; }

    public DateTime DelayEndTime { get; private set; }

    public string Description { get; private set; } = string.Empty;
}