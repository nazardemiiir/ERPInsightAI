using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Domain.Entities;

namespace ERPInsightAI.Application.Interfaces;

public interface IMachineRepository
{
    Task<Machine?> GetByIdAsync(Guid id);

    Task<List<Machine>> GetAllAsync();

    Task AddAsync(Machine machine);

    Task UpdateAsync(Machine machine);

    Task DeleteAsync(Guid id);

    // Dashboard Analizleri

    Task<int> GetActiveMachineCountAsync();

    Task<int> GetIdleMachineCountAsync();

    Task<int> GetMaintenanceMachineCountAsync();

    Task<int> GetBreakdownMachineCountAsync();
    Task<int> GetTotalMachineCountAsync();
}
