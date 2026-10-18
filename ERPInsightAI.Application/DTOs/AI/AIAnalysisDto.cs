namespace ERPInsightAI.Application.DTOs.AI;

public class AIAnalysisDto
{
    // Performans Puanı
    public int PerformanceScore { get; set; }

    // Risk Puanı
    public int RiskScore { get; set; }

    // Gecikme Olasılığı
    public int DelayProbability { get; set; }

    // Risk Seviyesi
    public string RiskLevel { get; set; } = string.Empty;

    // AI Önerileri
    public List<string> Recommendations { get; set; } = new();

    // AI Analiz Maddeleri
    public List<string> Insights { get; set; } = new();

    // Genel AI Yorumu
    public string OverallComment { get; set; } = string.Empty;

    // Sistem Durumu
    public string SystemStatus { get; set; } = string.Empty;

    // Analiz Tarihi
    public DateTime AnalysisDate { get; set; }
}