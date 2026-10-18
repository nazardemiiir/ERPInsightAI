using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Enums;

namespace ERPInsightAI.Application.Services;

public class ProductionAnalysisService
{
    private readonly IProductionOrderRepository _repository;

    public ProductionAnalysisService(IProductionOrderRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> GetTotalProductionOrdersAsync()
    {
        var orders = await _repository.GetAllAsync();

        return orders.Count;
    }

    public async Task<int> GetCompletedOrdersAsync()
    {
        var orders = await _repository.GetAllAsync();

        return orders.Count(x =>
            x.Status == ProductionOrderStatus.Completed);
    }

    public async Task<int> GetPlannedOrdersAsync()
    {
        var orders = await _repository.GetAllAsync();

        return orders.Count(x =>
            x.Status == ProductionOrderStatus.Planned);
    }

    public async Task<int> GetInProductionOrdersAsync()
    {
        var orders = await _repository.GetAllAsync();

        return orders.Count(x =>
            x.Status == ProductionOrderStatus.InProduction);
    }

    public async Task<int> GetCancelledOrdersAsync()
    {
        var orders = await _repository.GetAllAsync();

        return orders.Count(x =>
            x.Status == ProductionOrderStatus.Cancelled);
    }
}