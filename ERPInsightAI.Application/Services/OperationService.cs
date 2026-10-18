using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Entities;

namespace ERPInsightAI.Application.Services;

public class OperationService : IOperationService
{
    private readonly IOperationRepository _operationRepository;

    public OperationService(IOperationRepository operationRepository)
    {
        _operationRepository = operationRepository;
    }

    public async Task<List<Operation>> GetAllAsync()
    {
        return await _operationRepository.GetAllAsync();
    }

    public async Task<Operation?> GetByIdAsync(Guid id)
    {
        return await _operationRepository.GetByIdAsync(id);
    }

    public async Task AddAsync(Operation operation)
    {
        await _operationRepository.AddAsync(operation);
    }

    public async Task UpdateAsync(Operation operation)
    {
        await _operationRepository.UpdateAsync(operation);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _operationRepository.DeleteAsync(id);
    }
    public async Task StartAsync(Guid id)
    {
        var operation = await _operationRepository.GetByIdAsync(id);

        if (operation == null)
            throw new Exception("Operasyon bulunamadı.");

        operation.Start();

        await _operationRepository.UpdateAsync(operation);
    }

    public async Task CompleteAsync(Guid id)
    {
        var operation = await _operationRepository.GetByIdAsync(id);

        if (operation == null)
            throw new Exception("Operasyon bulunamadı.");

        operation.Complete();

        await _operationRepository.UpdateAsync(operation);
    }
}