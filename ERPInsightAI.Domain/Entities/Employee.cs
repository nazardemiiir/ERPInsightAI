using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPInsightAI.Domain.Entities;

public class Employee
{
    public Employee(
        string employeeNumber,
        string firstName,
        string lastName,
        string position,
        Guid departmentId)
    {
        if (string.IsNullOrWhiteSpace(employeeNumber))
            throw new ArgumentException("Personel numarası boş olamaz.");

        if (string.IsNullOrWhiteSpace(firstName))
            throw new ArgumentException("Ad boş olamaz.");

        if (string.IsNullOrWhiteSpace(lastName))
            throw new ArgumentException("Soyad boş olamaz.");

        Id = Guid.NewGuid();
        EmployeeNumber = employeeNumber;
        FirstName = firstName;
        LastName = lastName;
        Position = position;
        DepartmentId = departmentId;
        IsActive = true;
    }

    public Guid Id { get; private set; }

    public string EmployeeNumber { get; private set; } = string.Empty;

    public string FirstName { get; private set; } = string.Empty;

    public string LastName { get; private set; } = string.Empty;

    public Guid DepartmentId { get; private set; }
    public Department Department { get; private set; } = null!;
    public string Position { get; private set; } = string.Empty;

    public bool IsActive { get; private set; }

    public string FullName => $"{FirstName} {LastName}";

    public void Deactivate()
    {
        IsActive = false;
    }

    public void Activate()
    {
        IsActive = true;
    }
    public void Update(
    string employeeNumber,
    string firstName,
    string lastName,
    string position,
    Guid departmentId)
    {
        EmployeeNumber = employeeNumber;
        FirstName = firstName;
        LastName = lastName;
        Position = position;
        DepartmentId = departmentId;
    }

}