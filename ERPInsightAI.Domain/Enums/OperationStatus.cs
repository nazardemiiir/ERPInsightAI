using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPInsightAI.Domain.Enums
{
    public enum OperationStatus
    {
        Waiting,
        Ready,
        InProgress,
        Completed,
        Paused,
        Cancelled
    }
}
