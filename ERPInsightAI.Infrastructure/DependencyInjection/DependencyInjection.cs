using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Application.Services;

using ERPInsightAI.Infrastructure.Persistence;
using ERPInsightAI.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ERPInsightAI.Infrastructure.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ERPInsightAIDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IProductionOrderRepository, ProductionOrderRepository>();

        services.AddScoped<IDashboardService, DashboardService>();

        services.AddScoped<IMachineRepository, MachineRepository>();

        services.AddScoped<IDepartmentRepository, DepartmentRepository>();

        services.AddScoped<IOperationRepository, OperationRepository>();

        services.AddScoped<IOperationService, OperationService>();

        services.AddScoped<IAIService, AIService>();

        services.AddScoped<IEmployeeRepository, EmployeeRepository>();

      

        return services;
    }
}