using ERPInsightAI.Domain.Entities;

namespace ERPInsightAI.Application.Interfaces;

public interface IDepartmentRepository
{
    Task<Department?> GetByIdAsync(Guid id);

    Task<List<Department>> GetAllAsync();

    Task AddAsync(Department department);

    Task UpdateAsync(Department department);

    Task DeleteAsync(Guid id);
}