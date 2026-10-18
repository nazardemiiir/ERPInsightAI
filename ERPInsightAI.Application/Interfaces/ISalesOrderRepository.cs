using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Domain.Entities;

namespace ERPInsightAI.Application.Interfaces;

public interface ISalesOrderRepository
{
    Task<SalesOrder?> GetByIdAsync(Guid id);

    Task<List<SalesOrder>> GetAllAsync();

    Task AddAsync(SalesOrder salesOrder);

    Task UpdateAsync(SalesOrder salesOrder);

    Task DeleteAsync(Guid id);
    Task<int> GetOnTimeCompletedCountAsync();
}
