using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPInsightAI.Application.DTOs.Employees;

public class CreateEmployeeDto
{
    public string EmployeeNumber { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;

    public Guid DepartmentId { get; set; }
}