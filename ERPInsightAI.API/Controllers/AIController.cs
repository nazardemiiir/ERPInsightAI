using ERPInsightAI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERPInsightAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly IAIService _aiService;
    private readonly IOllamaService _ollamaService;

    public AIController(
        IAIService aiService,
        IOllamaService ollamaService)
    {
        _aiService = aiService;
        _ollamaService = ollamaService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAnalysis()
    {
        var result = await _aiService.AnalyzeAsync();

        return Ok(result);
    }

    [HttpGet("test")]
    public async Task<IActionResult> Test()
    {
        var answer = await _ollamaService.AskAsync(
            "Merhaba. Kendini kısa bir şekilde tanıt.");

        return Ok(answer);
    }
}