using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using ERPInsightAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using ERPInsightAI.Domain.Enums;


namespace ERPInsightAI.Infrastructure.Repositories;

public class ProductionOrderRepository : IProductionOrderRepository
{
    private readonly ERPInsightAIDbContext _context;

    public ProductionOrderRepository(ERPInsightAIDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductionOrder>> GetAllAsync()
    {
        return await _context.ProductionOrders.ToListAsync();
    }

    public async Task<ProductionOrder?> GetByIdAsync(Guid id)
    {
        return await _context.ProductionOrders
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(ProductionOrder productionOrder)
    {
        await _context.ProductionOrders.AddAsync(productionOrder);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(ProductionOrder productionOrder)
    {
        _context.ProductionOrders.Update(productionOrder);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);

        if (entity == null)
            return;

        _context.ProductionOrders.Remove(entity);
        await _context.SaveChangesAsync();
    }
    public async Task<int> GetTotalCountAsync()
    {
        return await _context.ProductionOrders.CountAsync();
    }
    public async Task<int> GetCompletedCountAsync()
    {
        return await _context.ProductionOrders
            .CountAsync(x => x.Status == ProductionOrderStatus.Completed);
    }

    public async Task<int> GetPlannedCountAsync()
    {
        return await _context.ProductionOrders
            .CountAsync(x => x.Status == ProductionOrderStatus.Planned);
    }

    public async Task<int> GetInProductionCountAsync()
    {
        return await _context.ProductionOrders
            .CountAsync(x => x.Status == ProductionOrderStatus.InProduction);
    }

    public async Task<int> GetCancelledCountAsync()
    {
        return await _context.ProductionOrders
            .CountAsync(x => x.Status == ProductionOrderStatus.Cancelled);
    }

    public async Task<int> GetDelayedCountAsync()
    {
        return await _context.ProductionOrders
            .CountAsync(x =>
                x.PlannedEndDate < DateTime.Now &&
                x.Status != ProductionOrderStatus.Completed &&
                x.Status != ProductionOrderStatus.Cancelled);
    }
    public async Task<double> GetAverageProductionTimeInHoursAsync()
    {
        var completedOrders = await _context.ProductionOrders
            .Where(x => x.ActualStartDate.HasValue &&
                        x.ActualEndDate.HasValue)
            .ToListAsync();

        if (!completedOrders.Any())
            return 0;

        return completedOrders
            .Average(x => (x.ActualEndDate!.Value - x.ActualStartDate!.Value).TotalHours);
    }
    public async Task<int> GetOnTimeCompletedCountAsync()
    {
        return await _context.ProductionOrders
            .CountAsync(x =>
                x.Status == ProductionOrderStatus.Completed &&
                x.ActualEndDate.HasValue &&
                x.ActualEndDate <= x.PlannedEndDate);
    }
    public async Task<List<ProductionOrder>> GetRecentProductionOrdersAsync(int count)
    {
        return await _context.ProductionOrders
            .OrderByDescending(x => x.PlannedEndDate)
            .Take(count)
            .ToListAsync();
    }
    public async Task<List<ProductionOrder>> GetOrdersForAIAsync()
    {
        return await _context.ProductionOrders
            .OrderByDescending(x => x.PlannedEndDate)
            .Take(10)
            .ToListAsync();
    }
}