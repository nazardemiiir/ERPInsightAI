using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPInsightAI.Domain.Entities;

public class Department
{
    public Department(string departmentCode, string departmentName)
    {
        if (string.IsNullOrWhiteSpace(departmentCode))
            throw new ArgumentException("Departman kodu boş olamaz.");

        if (string.IsNullOrWhiteSpace(departmentName))
            throw new ArgumentException("Departman adı boş olamaz.");

        Id = Guid.NewGuid();
        DepartmentCode = departmentCode;
        DepartmentName = departmentName;
    }

    public Guid Id { get; private set; }

    public string DepartmentCode { get; private set; } = string.Empty;

    public string DepartmentName { get; private set; } = string.Empty;
    public ICollection<Employee> Employees { get; private set; } = new List<Employee>();
}
