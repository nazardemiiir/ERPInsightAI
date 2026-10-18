using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using ERPInsightAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPInsightAI.Infrastructure.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly ERPInsightAIDbContext _context;

    public EmployeeRepository(ERPInsightAIDbContext context)
    {
        _context = context;
    }

    public async Task<List<Employee>> GetAllAsync()
    {
        return await _context.Employees.Include(x => x.Department)
    .ToListAsync();
    }

    public async Task<Employee?> GetByIdAsync(Guid id)
    {
        return await _context.Employees
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(Employee employee)
    {
        await _context.Employees.AddAsync(employee);

        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Employee employee)
    {
        _context.Employees.Update(employee);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var employee = await GetByIdAsync(id);

        if (employee == null)
            return;

        _context.Employees.Remove(employee);

        await _context.SaveChangesAsync();
    }
}
