using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using ERPInsightAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPInsightAI.Infrastructure.Repositories;

public class OperationRepository : IOperationRepository
{
    private readonly ERPInsightAIDbContext _context;

    public OperationRepository(ERPInsightAIDbContext context)
    {
        _context = context;
    }

    public async Task<List<Operation>> GetAllAsync()
    {
        return await _context.Operations
            .ToListAsync();
    }

    public async Task<Operation?> GetByIdAsync(Guid id)
    {
        return await _context.Operations
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(Operation operation)
    {
        await _context.Operations.AddAsync(operation);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Operation operation)
    {
        _context.Operations.Update(operation);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);

        if (entity == null)
            return;

        _context.Operations.Remove(entity);

        await _context.SaveChangesAsync();
    }
}