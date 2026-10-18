using ERPInsightAI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ERPInsightAI.Application.DTOs.ProductionOrders;
using ERPInsightAI.Domain.Entities;

namespace ERPInsightAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductionOrdersController : ControllerBase
{
    private readonly IProductionOrderRepository _repository;

    public ProductionOrdersController(IProductionOrderRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var productionOrders = await _repository.GetAllAsync();

        var result = productionOrders.Select(x => new ProductionOrderDto
        {
            Id = x.Id,
            ProductionOrderNumber = x.ProductionOrderNumber,
            Status = x.Status.ToString(),
            PlannedStartDate = x.PlannedStartDate,
            PlannedEndDate = x.PlannedEndDate,
            ActualStartDate = x.ActualStartDate,
            ActualEndDate = x.ActualEndDate
        });

        return Ok(result);
    }
    [HttpPost]
    public async Task<IActionResult> Create(CreateProductionOrderDto dto)
    {
        var productionOrder = new ProductionOrder(
            dto.ProductionOrderNumber,
            dto.SalesOrderId,
            dto.PlannedStartDate,
            dto.PlannedEndDate);

        await _repository.AddAsync(productionOrder);

        return Ok("Üretim emri başarıyla oluşturuldu.");
    }
    [HttpPost("{id}/start")]
    public async Task<IActionResult> Start(Guid id)
    {
        var productionOrder = await _repository.GetByIdAsync(id);

        if (productionOrder == null)
            return NotFound("Üretim emri bulunamadı.");

        productionOrder.Start();

        await _repository.UpdateAsync(productionOrder);

        return Ok("Üretim emri başlatıldı.");
    }
   
    [HttpPost("{id}/complete")]
    public async Task<IActionResult> Complete(Guid id)
    {
        var productionOrder = await _repository.GetByIdAsync(id);

        if (productionOrder == null)
            return NotFound("Üretim emri bulunamadı.");

        productionOrder.Complete();

        await _repository.UpdateAsync(productionOrder);

        return Ok("Üretim emri tamamlandı.");
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var productionOrder = await _repository.GetByIdAsync(id);

        if (productionOrder == null)
            return NotFound();

        await _repository.DeleteAsync(id);

        return Ok("Üretim emri silindi.");
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var productionOrder =
            await _repository.GetByIdAsync(id);

        if (productionOrder == null)
            return NotFound();

        var dto = new ProductionOrderDto
        {
            Id = productionOrder.Id,
            ProductionOrderNumber = productionOrder.ProductionOrderNumber,
            Status = productionOrder.Status.ToString(),
            PlannedStartDate = productionOrder.PlannedStartDate,
            PlannedEndDate = productionOrder.PlannedEndDate,
            ActualStartDate = productionOrder.ActualStartDate,
            ActualEndDate = productionOrder.ActualEndDate
        };

        return Ok(dto);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    Guid id,
    UpdateProductionOrderDto dto)
    {
        var productionOrder =
            await _repository.GetByIdAsync(id);

        if (productionOrder == null)
            return NotFound();

        productionOrder.Update(
            dto.ProductionOrderNumber,
            dto.PlannedStartDate,
            dto.PlannedEndDate);

        await _repository.UpdateAsync(productionOrder);

        return Ok("Üretim emri güncellendi.");
    }
}