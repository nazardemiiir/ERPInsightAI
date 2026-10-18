using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Domain.Entities;

namespace ERPInsightAI.Application.Interfaces;

public interface IProductionOrderRepository
{
    Task<List<ProductionOrder>> GetAllAsync();

    Task<ProductionOrder?> GetByIdAsync(Guid id);

    Task AddAsync(ProductionOrder productionOrder);

    Task UpdateAsync(ProductionOrder productionOrder);
    Task DeleteAsync(Guid id);
    Task<double> GetAverageProductionTimeInHoursAsync();
    Task<int> GetTotalCountAsync();

    Task<int> GetCompletedCountAsync();

    Task<int> GetPlannedCountAsync();

    Task<int> GetInProductionCountAsync();

    Task<int> GetCancelledCountAsync();

    Task<int> GetDelayedCountAsync();
    Task<int> GetOnTimeCompletedCountAsync();

    
    Task<List<ProductionOrder>> GetRecentProductionOrdersAsync(int count);
    Task<List<ProductionOrder>> GetOrdersForAIAsync();
}