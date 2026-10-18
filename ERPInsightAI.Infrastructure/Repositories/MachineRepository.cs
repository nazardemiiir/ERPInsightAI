using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;
using ERPInsightAI.Domain.Enums;
using ERPInsightAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPInsightAI.Infrastructure.Repositories;

public class MachineRepository : IMachineRepository
{
    private readonly ERPInsightAIDbContext _context;

    public MachineRepository(ERPInsightAIDbContext context)
    {
        _context = context;
    }
    public async Task<List<Machine>> GetAllAsync()
    {
        return await _context.Machines.ToListAsync();
    }

    public async Task<Machine?> GetByIdAsync(Guid id)
    {
        return await _context.Machines
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(Machine machine)
    {
        await _context.Machines.AddAsync(machine);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Machine machine)
    {
        _context.Machines.Update(machine);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);

        if (entity == null)
            return;

        _context.Machines.Remove(entity);
        await _context.SaveChangesAsync();
    }
    public async Task<int> GetActiveMachineCountAsync()
    {
        return await _context.Machines
            .CountAsync(x => x.Status == MachineStatus.Active);
    }

    public async Task<int> GetIdleMachineCountAsync()
    {
        return await _context.Machines
            .CountAsync(x => x.Status == MachineStatus.Idle);
    }

    public async Task<int> GetMaintenanceMachineCountAsync()
    {
        return await _context.Machines
            .CountAsync(x => x.Status == MachineStatus.Maintenance);
    }

    public async Task<int> GetBreakdownMachineCountAsync()
    {
        return await _context.Machines
            .CountAsync(x => x.Status == MachineStatus.Breakdown);
    }
    public async Task<int> GetTotalMachineCountAsync()
    {
        return await _context.Machines.CountAsync();
    }
}