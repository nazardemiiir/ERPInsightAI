using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ERPInsightAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OperationsController : ControllerBase
{
    private readonly IOperationService _operationService;

    public OperationsController(IOperationService operationService)
    {
        _operationService = operationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var operations = await _operationService.GetAllAsync();
        return Ok(operations);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var operation = await _operationService.GetByIdAsync(id);

        if (operation == null)
            return NotFound();

        return Ok(operation);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Operation operation)
    {
        await _operationService.AddAsync(operation);

        return Ok(operation);
    }

    [HttpPut]
    public async Task<IActionResult> Update(Operation operation)
    {
        await _operationService.UpdateAsync(operation);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _operationService.DeleteAsync(id);

        return NoContent();
    }
    [HttpPost("{id}/start")]
    public async Task<IActionResult> Start(Guid id)
    {
        await _operationService.StartAsync(id);

        return Ok(new
        {
            Message = "Operasyon başlatıldı."
        });
    }

    [HttpPost("{id}/complete")]
    public async Task<IActionResult> Complete(Guid id)
    {
        await _operationService.CompleteAsync(id);

        return Ok(new
        {
            Message = "Operasyon tamamlandı."
        });
    }
}