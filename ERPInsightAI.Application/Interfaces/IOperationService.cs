using ERPInsightAI.Domain.Entities;

namespace ERPInsightAI.Application.Interfaces;

public interface IOperationService
{
    Task<List<Operation>> GetAllAsync();

    Task<Operation?> GetByIdAsync(Guid id);

    Task AddAsync(Operation operation);

    Task UpdateAsync(Operation operation);

    Task DeleteAsync(Guid id);
    Task StartAsync(Guid id);

    Task CompleteAsync(Guid id);
}