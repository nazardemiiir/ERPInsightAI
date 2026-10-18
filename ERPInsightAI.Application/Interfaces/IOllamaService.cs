namespace ERPInsightAI.Application.Interfaces;

public interface IOllamaService
{
    Task<string> AskAsync(string prompt);
}