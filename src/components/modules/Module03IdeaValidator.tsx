import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, AlertCircle, FileText, Download, Share2, ArrowRight, RefreshCw, BarChart2, ShieldAlert, FlaskConical } from 'lucide-react';
import { exportToDocx, exportToPDF, copyShareableLink } from '../../utils/exportUtils';

export const Module03IdeaValidator: React.FC = () => {
  const { validationReport, runIdeaValidation, startupData, setActiveModuleId } = useApp();

  const [ideaTitle, setIdeaTitle] = useState(validationReport.ideaTitle);
  const [targetCustomer, setTargetCustomer] = useState(validationReport.targetCustomer);
  const [problem, setProblem] = useState(validationReport.problem);
  const [solution, setSolution] = useState(validationReport.solution);
  const [revenueModel, setRevenueModel] = useState(validationReport.revenueModel);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setTimeout(() => {
      runIdeaValidation(ideaTitle, targetCustomer, problem, solution, revenueModel);
      setIsEvaluating(false);
    }, 800);
  };

  const handleExportPDF = () => {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Startup Idea Validation Report: ${validationReport.ideaTitle}</h2>
        <p><strong>Target Customer:</strong> ${validationReport.targetCustomer}</p>
        <p><strong>Problem:</strong> ${validationReport.problem}</p>
        <p><strong>Solution:</strong> ${validationReport.solution}</p>
        <p><strong>Market Outlook:</strong> ${validationReport.marketSizeSummary}</p>
        <hr/>
        <h3>8-Dimension Feasibility Assessment</h3>
        <ul>
          <li><strong>Problem Clarity (${validationReport.dimensions.problemClarity.score}/100):</strong> ${validationReport.dimensions.problemClarity.details}</li>
          <li><strong>Customer Segments (${validationReport.dimensions.customerSegments.score}/100):</strong> ${validationReport.dimensions.customerSegments.details}</li>
          <li><strong>Alternatives & Substitutes (${validationReport.dimensions.alternatives.score}/100):</strong> ${validationReport.dimensions.alternatives.details}</li>
          <li><strong>Market Signals (${validationReport.dimensions.marketSignals.score}/100):</strong> ${validationReport.dimensions.marketSignals.details}</li>
          <li><strong>Competitive Advantage (${validationReport.dimensions.competitiveAdvantage.score}/100):</strong> ${validationReport.dimensions.competitiveAdvantage.details}</li>
          <li><strong>Monetization Viability (${validationReport.dimensions.monetizationViability.score}/100):</strong> ${validationReport.dimensions.monetizationViability.details}</li>
          <li><strong>Operational Complexity (${validationReport.dimensions.operationalComplexity.score}/100):</strong> ${validationReport.dimensions.operationalComplexity.details}</li>
        </ul>
        <h3>Recommended Validation Experiments</h3>
        <ol>
          ${validationReport.dimensions.validationExperiments.experiments.map(exp => `<li>${exp}</li>`).join('')}
        </ol>
      </div>
    `;
    exportToPDF('Startup_Validation_Report', `Idea Validation Report — ${validationReport.ideaTitle}`, htmlContent);
  };

  const handleExportDocx = () => {
    const textContent = `STARTUP VALIDATION REPORT: ${validationReport.ideaTitle}\n\nProblem: ${validationReport.problem}\nSolution: ${validationReport.solution}\nTarget Customer: ${validationReport.targetCustomer}\nMarket TAM: ${validationReport.marketSizeSummary}\n\nASSUMPTIONS:\n${validationReport.assumptions.map(a => '- ' + a).join('\n')}\n\nEXPERIMENTS:\n${validationReport.dimensions.validationExperiments.experiments.map((e, i) => `${i + 1}. ${e}`).join('\n')}`;
    exportToDocx('Startup_Validation_Report', textContent);
  };

  const handleShareLink = () => {
    copyShareableLink('validation', validationReport.id);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 3</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Evidence-Based Idea Assessment</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            AI Idea Validator
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Evaluate startup ideas across 8 dimensions before spending heavy capital. Generates evidence, assumptions, risks & validation experiments.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={handleExportPDF} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Download size={14} /> Export PDF
          </button>
          <button onClick={handleExportDocx} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <FileText size={14} /> DOCX
          </button>
          <button onClick={handleShareLink} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Share2 size={14} /> {copiedLink ? 'Link Copied!' : 'Share'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Input Parameters Form */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#a855f7" /> Founder Input Parameters
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Idea Title / Project Name</label>
              <input
                type="text"
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Target Customer / ICP</label>
              <input
                type="text"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                placeholder="e.g. Mid-market engineering leads & DevOps directors"
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Problem Statement</label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What specific acute pain are they facing?"
                className="input-field"
                rows={3}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Proposed Solution</label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How does your product uniquely solve this problem?"
                className="input-field"
                rows={3}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Monetization / Revenue Model</label>
              <input
                type="text"
                value={revenueModel}
                onChange={(e) => setRevenueModel(e.target.value)}
                placeholder="e.g. B2B Tiered SaaS (₹3,999 to ₹49,999/mo) + 10% gain share"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isEvaluating}
              className="btn-ai"
              style={{ marginTop: '8px', padding: '12px' }}
            >
              {isEvaluating ? <><RefreshCw size={16} className="animate-spin" /> Evaluating 8 Dimensions...</> : <><Sparkles size={16} /> Run 8-Dimensional AI Validation</>}
            </button>
          </form>
        </div>

        {/* Validation Report Output */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 size={18} color="#22c55e" /> Startup Validation Report
            </h2>
            <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', padding: '4px 10px', borderRadius: '8px', color: '#4ade80', fontSize: '0.85rem', fontWeight: 800 }}>
              Confidence Score: {validationReport.overallScore}/100
            </div>
          </div>

          {/* 8 Dimension Assessment Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
            {Object.entries(validationReport.dimensions).map(([key, dim]: [string, any]) => {
              if (key === 'validationExperiments') return null;
              return (
                <div key={key} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: dim.score >= 80 ? '#4ade80' : dim.score >= 60 ? '#fbbf24' : '#f87171' }}>
                      {dim.score}%
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 600 }}>{dim.verdict}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px', lineHeight: 1.3 }}>{dim.details}</div>
                </div>
              );
            })}
          </div>

          {/* Recommended Validation Experiments */}
          <div style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FlaskConical size={14} color="#60a5fa" /> Top 3 Actionable Validation Experiments:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {validationReport.dimensions.validationExperiments.experiments.map((exp, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: '#f8fafc' }}>
                  <span style={{ background: '#2563eb', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <span>{exp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps CTA */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveModuleId(5)}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.8rem', padding: '10px' }}
            >
              Build Business Model (Module 5) <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setActiveModuleId(7)}
              className="btn-secondary"
              style={{ flex: 1, fontSize: '0.8rem', padding: '10px' }}
            >
              Draft MVP Scope (Module 7)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
