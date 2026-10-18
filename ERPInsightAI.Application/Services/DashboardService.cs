using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Application.DTOs.Dashboard;
using ERPInsightAI.Application.Interfaces;
using ERPInsightAI.Domain.Enums;

namespace ERPInsightAI.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly IProductionOrderRepository _productionOrderRepository;
    private readonly IMachineRepository _machineRepository;

    public DashboardService(
    IProductionOrderRepository productionOrderRepository,
    IMachineRepository machineRepository)
    {
        _productionOrderRepository = productionOrderRepository;
        _machineRepository = machineRepository;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync()
    {
        var recentProductionOrders =
    await _productionOrderRepository.GetRecentProductionOrdersAsync(5);


        var totalOrders = await _productionOrderRepository.GetTotalCountAsync();
        var completedOrders =
    await _productionOrderRepository.GetCompletedCountAsync();

        var delayedOrders = await _productionOrderRepository.GetDelayedCountAsync();

        var averageProductionTime =
    await _productionOrderRepository.GetAverageProductionTimeInHoursAsync();

        var onTimeCompleted =
    await _productionOrderRepository.GetOnTimeCompletedCountAsync();
        double onTimeDeliveryRate = 0;

        if (completedOrders > 0)
        {
            onTimeDeliveryRate =
                (double)onTimeCompleted / completedOrders * 100;
        }

        double delayRate = 0;

        if (totalOrders > 0)
        {
            delayRate = (double)delayedOrders / totalOrders * 100;
        }
        var totalMachines = await _machineRepository.GetTotalMachineCountAsync();

        var activeMachines = await _machineRepository.GetActiveMachineCountAsync();

        double machineUtilizationRate = 0;

        if (totalMachines > 0)
        {
            machineUtilizationRate =
                (double)activeMachines / totalMachines * 100;
        }
        string riskLevel;

        if (delayRate > 15)
        {
            riskLevel = "High";
        }
        else if (delayRate >= 5)
        {
            riskLevel = "Medium";
        }
        else if (machineUtilizationRate >= 90)
        {
            riskLevel = "Medium";
        }
        else
        {
            riskLevel = "Low";
        }
        int performanceScore = 100;

        // Gecikme oranına göre puan düş
        performanceScore -= (int)delayRate;

        // Makine kullanım oranı çok yüksekse
        if (machineUtilizationRate >= 95)
        {
            performanceScore -= 10;
        }

        // Zamanında tamamlanma oranı iyiyse
        if (onTimeDeliveryRate >= 90)
        {
            performanceScore += 5;
        }

        // Risk yüksekse
        if (riskLevel == "High")
        {
            performanceScore -= 20;
        }

        performanceScore = Math.Max(0, Math.Min(100, performanceScore));
        string recommendation;

        if (riskLevel == "High")
        {
            recommendation = "Üretim sürecinde kritik risk tespit edildi. Gecikme nedenlerini ve makine durumlarını acilen inceleyin.";
        }
        else if (riskLevel == "Medium")
        {
            recommendation = "Makine kullanım oranı yüksek. Bakım planlamasını gözden geçirmeniz önerilir.";
        }
        else
        {
            recommendation = "Üretim planı sağlıklı ilerliyor. Mevcut performans korunabilir.";
        }
        string aiInsight =
$"""
Üretim performansı analiz edildi.

• Makine Kullanım Oranı: %{machineUtilizationRate:F0}
• Zamanında Tamamlanma: %{onTimeDeliveryRate:F0}
• Ortalama Üretim Süresi: {averageProductionTime:F2} saat

Genel Performans Puanı: {performanceScore}/100
""";
        var recentOrders = recentProductionOrders
    .Select(x => new RecentProductionOrderDto
    {
        Id = x.Id,
        ProductionOrderNumber = x.ProductionOrderNumber,
        Status = x.Status.ToString(),
        PlannedEndDate = x.PlannedEndDate,
        ActualEndDate = x.ActualEndDate
    })
    .ToList();
        return new DashboardSummaryDto
        {
            TotalProductionOrders = totalOrders,
            PlannedOrders = await _productionOrderRepository.GetPlannedCountAsync(),

            InProductionOrders = await _productionOrderRepository.GetInProductionCountAsync(),

            CompletedOrders = completedOrders,

            CancelledOrders = await _productionOrderRepository.GetCancelledCountAsync(),

            DelayedOrders = delayedOrders,
            DelayRate = Math.Round(delayRate, 2),

            ActiveMachines = activeMachines,

            MachineUtilizationRate = Math.Round(machineUtilizationRate, 2),

            AverageProductionTimeInHours = Math.Round(averageProductionTime, 2),

            OnTimeDeliveryRate = Math.Round(onTimeDeliveryRate, 2),


            IdleMachines = await _machineRepository.GetIdleMachineCountAsync(),

            MaintenanceMachines = await _machineRepository.GetMaintenanceMachineCountAsync(),

            BreakdownMachines = await _machineRepository.GetBreakdownMachineCountAsync(),

            ActiveEmployees = 0,

            RiskLevel = riskLevel,

            Recommendation = recommendation,

            PerformanceScore = performanceScore,

            AIInsight = aiInsight,

            RecentProductionOrders = recentOrders
        };
    }
}