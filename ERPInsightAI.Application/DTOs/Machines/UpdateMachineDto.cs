using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ERPInsightAI.Application.DTOs.Machines;

public class UpdateMachineDto
{
    public string MachineCode { get; set; } = string.Empty;

    public string MachineName { get; set; } = string.Empty;
}