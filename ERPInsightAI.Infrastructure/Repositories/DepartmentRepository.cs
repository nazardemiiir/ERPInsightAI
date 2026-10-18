using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using ERPInsightAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPInsightAI.Infrastructure.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly ERPInsightAIDbContext _context;

    public DepartmentRepository(ERPInsightAIDbContext context)
    {
        _context = context;
    }

    public async Task<List<Department>> GetAllAsync()
    {
        return await _context.Departments.ToListAsync();
    }

    public async Task<Department?> GetByIdAsync(Guid id)
    {
        return await _context.Departments
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(Department department)
    {
        await _context.Departments.AddAsync(department);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Department department)
    {
        _context.Departments.Update(department);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);

        if (entity == null)
            return;

        _context.Departments.Remove(entity);
        await _context.SaveChangesAsync();
    }
}