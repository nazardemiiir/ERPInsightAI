using ERPInsightAI.Application.DTOs.Machines;
using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ERPInsightAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MachinesController : ControllerBase
{
    private readonly IMachineRepository _machineRepository;

    public MachinesController(IMachineRepository machineRepository)
    {
        _machineRepository = machineRepository;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var machines = await _machineRepository.GetAllAsync();

        return Ok(machines);
    }
    [HttpPost]
    public async Task<IActionResult> Create(CreateMachineDto dto)
    {
        var machine = new Machine(
            dto.MachineCode,
            dto.MachineName,
            dto.DepartmentId);

        await _machineRepository.AddAsync(machine);

        return Ok("Makine başarıyla oluşturuldu.");
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    Guid id,
    UpdateMachineDto dto)
    {
        var machine =
            await _machineRepository.GetByIdAsync(id);

        if (machine == null)
            return NotFound();

        machine.Update(
            dto.MachineCode,
            dto.MachineName);

        await _machineRepository.UpdateAsync(machine);

        return Ok("Makine güncellendi.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var machine =
            await _machineRepository.GetByIdAsync(id);

        if (machine == null)
            return NotFound();

        await _machineRepository.DeleteAsync(id);

        return Ok("Makine silindi.");
    }


}
