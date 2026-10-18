using ERPInsightAI.Application.DTOs.Employees;
using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ERPInsightAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeRepository _repository;

    public EmployeesController(
        IEmployeeRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _repository.GetAllAsync();

        var result = employees.Select(x => new
        {
            x.Id,
            x.EmployeeNumber,
            x.FirstName,
            x.LastName,
            FullName = x.FullName,
            x.Position,
            x.IsActive,
            x.DepartmentId,
            DepartmentName = x.Department.DepartmentName
        });

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateEmployeeDto dto)
    {
        var employee = new Employee(
            dto.EmployeeNumber,
            dto.FirstName,
            dto.LastName,
            dto.Position,
            dto.DepartmentId);

        await _repository.AddAsync(employee);

        return Ok("Çalışan oluşturuldu.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);

        return Ok("Çalışan silindi.");
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    Guid id,
    UpdateEmployeeDto dto)
    {
        var employee =
            await _repository.GetByIdAsync(id);

        if (employee == null)
            return NotFound();

        employee.Update(
            dto.EmployeeNumber,
            dto.FirstName,
            dto.LastName,
            dto.Position,
            dto.DepartmentId);

        await _repository.UpdateAsync(employee);

        return Ok("Çalışan güncellendi.");
    }
}
