using ERPInsightAI.Application.DTOs.AI;
using ERPInsightAI.Application.Interfaces;

namespace ERPInsightAI.Application.Services;

public class AIService : IAIService
{
    private readonly IProductionOrderRepository _productionRepository;
    private readonly IMachineRepository _machineRepository;
    private readonly IOllamaService _ollamaService;

    public AIService(
        IProductionOrderRepository productionRepository,
        IMachineRepository machineRepository,
        IOllamaService ollamaService)
    {
        _productionRepository = productionRepository;
        _machineRepository = machineRepository;
        _ollamaService = ollamaService;
    }

    public async Task<AIAnalysisDto> AnalyzeAsync()
    {
        // =====================================================
        // 1. ERP VERİLERİNİ AL
        // =====================================================

        var totalOrders =
            await _productionRepository.GetTotalCountAsync();

        var delayedOrders =
            await _productionRepository.GetDelayedCountAsync();

        var completedOrders =
            await _productionRepository.GetCompletedCountAsync();

        var activeMachines =
            await _machineRepository.GetActiveMachineCountAsync();
        var ordersForAI =
             await _productionRepository.GetOrdersForAIAsync();



        // =====================================================
        // 2. PERFORMANS HESABI
        // =====================================================

        var performanceScore =
            totalOrders == 0
                ? 100
                : (int)((completedOrders * 100.0) / totalOrders);


        // =====================================================
        // 3. RİSK HESABI
        // =====================================================

        var riskScore = delayedOrders * 15;

        if (riskScore > 100)
            riskScore = 100;


        // =====================================================
        // 4. GECİKME OLASILIĞI
        // =====================================================

        var delayProbability = delayedOrders * 10;

        if (delayProbability > 100)
            delayProbability = 100;


        // =====================================================
        // 5. RİSK SEVİYESİ
        // =====================================================

        var riskLevel =
            riskScore >= 70
                ? "High"
                : riskScore >= 40
                    ? "Medium"
                    : "Low";


        // =====================================================
        // 6. SİSTEM DURUMU
        // =====================================================

        var systemStatus =
            riskScore >= 70
                ? "Kritik"
                : riskScore >= 40
                    ? "Dikkat"
                    : "Normal";


        // =====================================================
        // 7. AI İÇİN PROMPT OLUŞTUR
        // =====================================================

        var prompt =
    "Sen bir üretim yönetimi AI asistanısın.\n\n" +

    "ERP verileri:\n\n" +

    "Toplam üretim emri: " + totalOrders + "\n" +
    "Tamamlanan: " + completedOrders + "\n" +
    "Geciken: " + delayedOrders + "\n" +
    "Aktif makine: " + activeMachines + "\n" +
    "Performans: " + performanceScore + "/100\n" +
    "Risk: " + riskScore + "/100\n" +
    "Risk seviyesi: " + riskLevel + "\n" +
    "Gecikme olasılığı: %" + delayProbability + "\n" +
    "Sistem durumu: " + systemStatus + "\n\n" +

    "Bu verileri Türkçe olarak kısa şekilde değerlendir.\n\n" +

    "Performansı, gecikme riskini ve üretim yöneticisinin " +
    "dikkat etmesi gereken noktaları belirt.\n\n" +

    "En fazla 3-4 cümle yaz.\n" +
    "Verilmeyen bilgi uydurma.";


        // =====================================================
        // 8. GEMMA 3'TEN AI ANALİZİ AL
        // =====================================================

        string aiComment;

        try
        {
            aiComment = await _ollamaService.AskAsync(prompt);
        }
        catch (Exception ex)
        {
            aiComment = $"AI HATASI: {ex.Message}";
        }


        // =====================================================
        // 9. DTO OLUŞTUR
        // =====================================================

        var dto = new AIAnalysisDto
        {
            PerformanceScore = performanceScore,

            RiskScore = riskScore,

            DelayProbability = delayProbability,

            RiskLevel = riskLevel,

            SystemStatus = systemStatus,

            AnalysisDate = DateTime.Now,

            OverallComment = aiComment,

            Recommendations = new(),

            Insights = new()
        };


        // =====================================================
        // 10. ERP ANALİZ MADDELERİ
        // =====================================================

        dto.Insights.Add(
            $"Toplam üretim emri analiz edildi: {totalOrders}");

        dto.Insights.Add(
            $"Tamamlanan üretim emri: {completedOrders}");

        dto.Insights.Add(
            $"Geciken üretim emri: {delayedOrders}");

        dto.Insights.Add(
            $"Aktif makine sayısı: {activeMachines}");

        dto.Insights.Add(
            $"Performans puanı: {performanceScore}/100");

        dto.Insights.Add(
            $"Risk puanı: {riskScore}/100");

        dto.Insights.Add(
            $"Tahmini gecikme olasılığı: %{delayProbability}");


        // =====================================================
        // 11. ÖNERİLER
        // =====================================================

        // =====================================================
// AI ÖNERİLERİ
// =====================================================

        // Gecikmiş üretim emirleri
        if (delayedOrders > 0)
        {
            dto.Recommendations.Add(
                $"Geciken {delayedOrders} üretim emri önceliklendirilmelidir.");
        }

        // Aktif makine kapasitesi
        if (activeMachines < 2)
        {
            dto.Recommendations.Add(
                "Aktif makine kapasitesi düşük. Üretim planı gözden geçirilmelidir.");
        }
        else if (activeMachines >= 10)
        {
            dto.Recommendations.Add(
                "Makine kapasitesi yeterli seviyededir. Mevcut kapasitenin dengeli kullanılması önerilir.");
        }

        // Risk
        if (riskScore >= 70)
        {
            dto.Recommendations.Add(
                "Risk seviyesi kritik. Üretim planı yeniden optimize edilmelidir.");
        }
        else if (riskScore >= 40)
        {
            dto.Recommendations.Add(
                "Risk seviyesi orta düzeydedir. Geciken üretim emirleri yakından takip edilmelidir.");
        }

        // Performans
        if (performanceScore < 50)
        {
            dto.Recommendations.Add(
                "Üretim performansı düşük seviyededir. Gecikme nedenleri detaylı olarak incelenmelidir.");
        }
        else if (performanceScore >= 90)
        {
            dto.Recommendations.Add(
                "Üretim performansı hedef seviyenin üzerindedir. Mevcut süreç korunmalıdır.");
        }

        // Gecikme olasılığı
        if (delayProbability >= 50)
        {
            dto.Recommendations.Add(
                "Tahmini gecikme olasılığı yüksek. Üretim planında önleyici aksiyon alınmalıdır.");
        }
        else if (delayProbability >= 25)
        {
            dto.Recommendations.Add(
                "Gecikme olasılığı dikkat edilmesi gereken seviyededir.");
        }

        // Hiç öneri yoksa
        if (dto.Recommendations.Count == 0)
        {
            dto.Recommendations.Add(
                "Üretim sistemi normal çalışmaktadır. Kritik bir aksiyon gerekmemektedir.");
        }


        // =====================================================
        // 12. SONUCU DÖNDÜR
        // =====================================================

        return dto;
    }
}