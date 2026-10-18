using ERPInsightAI.Application.DTOs.Departments;
using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ERPInsightAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly IDepartmentRepository _departmentRepository;

    public DepartmentsController(IDepartmentRepository departmentRepository)
    {
        _departmentRepository = departmentRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await _departmentRepository.GetAllAsync();

        return Ok(departments);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateDepartmentDto dto)
    {
        var department = new Department(
            dto.DepartmentCode,
            dto.DepartmentName);

        await _departmentRepository.AddAsync(department);

        return Ok("Departman başarıyla oluşturuldu.");
    }
}