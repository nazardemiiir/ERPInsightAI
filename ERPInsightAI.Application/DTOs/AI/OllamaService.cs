using System.Text;
using System.Text.Json;
using ERPInsightAI.Application.Interfaces;

namespace ERPInsightAI.Infrastructure.AI;

public class OllamaService : IOllamaService
{
    private readonly HttpClient _httpClient;

    public OllamaService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> AskAsync(string prompt)
    {
        var request = new
        {
            model = "gemma3:4b",
            prompt = prompt,
            stream = false,

            options = new
            {
                temperature = 0.2,
                num_predict = 80
            }
        };

        var json = JsonSerializer.Serialize(request);

        var response = await _httpClient.PostAsync(
            "http://localhost:11434/api/generate",
            new StringContent(
                json,
                Encoding.UTF8,
                "application/json"));

        response.EnsureSuccessStatusCode();

        var result =
            await response.Content.ReadAsStringAsync();

        using var document =
            JsonDocument.Parse(result);

        return document.RootElement
            .GetProperty("response")
            .GetString()
            ?? string.Empty;
    }
}