using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Domain.Enums;

namespace ERPInsightAI.Domain.Entities;

public class Machine
{
    public Machine(
        string machineCode,
        string machineName,
        Guid departmentId)
    {
        if (string.IsNullOrWhiteSpace(machineCode))
            throw new ArgumentException("Makine kodu boş olamaz.");

        if (string.IsNullOrWhiteSpace(machineName))
            throw new ArgumentException("Makine adı boş olamaz.");

        Id = Guid.NewGuid();
        MachineCode = machineCode;
        MachineName = machineName;
        DepartmentId = departmentId;
        Status = MachineStatus.Active;
    }

    public Guid Id { get; private set; }

    public string MachineCode { get; private set; } = string.Empty;

    public string MachineName { get; private set; } = string.Empty;

    public Guid DepartmentId { get; private set; }

    public MachineStatus Status { get; private set; }

    public void SendToMaintenance()
    {
        if (Status == MachineStatus.Maintenance)
            throw new InvalidOperationException("Makine zaten bakımda.");

        Status = MachineStatus.Maintenance;
    }

    public void Activate()
    {
        if (Status == MachineStatus.Active)
            throw new InvalidOperationException("Makine zaten aktif.");

        Status = MachineStatus.Active;
    }

    public void SetBreakdown()
    {
        Status = MachineStatus.Breakdown;
    }

    public void SetIdle()
    {
        Status = MachineStatus.Idle;
    }

    public void Deactivate()
    {
        Status = MachineStatus.Passive;

    }
    public void Update(
    string machineCode,
    string machineName)
    {
        if (string.IsNullOrWhiteSpace(machineCode))
            throw new ArgumentException("Makine kodu boş olamaz.");

        if (string.IsNullOrWhiteSpace(machineName))
            throw new ArgumentException("Makine adı boş olamaz.");

        MachineCode = machineCode;
        MachineName = machineName;
    }
}