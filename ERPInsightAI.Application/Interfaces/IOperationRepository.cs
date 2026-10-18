using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ERPInsightAI.Domain.Entities;

namespace ERPInsightAI.Application.Interfaces;

public interface IOperationRepository
{
    Task<List<Operation>> GetAllAsync();

    Task<Operation?> GetByIdAsync(Guid id);

    Task AddAsync(Operation operation);

    Task UpdateAsync(Operation operation);

    Task DeleteAsync(Guid id);
}