using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Application.DTOs.AI;

namespace ERPInsightAI.Application.Interfaces;

public interface IAIService
{
    Task<AIAnalysisDto> AnalyzeAsync();
}