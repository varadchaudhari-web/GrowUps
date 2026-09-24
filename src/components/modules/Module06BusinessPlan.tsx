import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Sparkles, Download, Share2, CheckCircle2, Edit3, Save, ArrowRight } from 'lucide-react';
import { exportToDocx, exportToPDF, copyShareableLink } from '../../utils/exportUtils';

export const Module06BusinessPlan: React.FC = () => {
  const { businessPlanSections, updateBusinessPlanSection, autoGenerateBusinessPlan, startupData, setActiveModuleId } = useApp();
  const [selectedSectionId, setSelectedSectionId] = useState<string>(businessPlanSections[0]?.id || 'bp_1');
  const [editingContent, setEditingContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeSection = businessPlanSections.find(s => s.id === selectedSectionId) || businessPlanSections[0];

  const handleSelectSection = (id: string) => {
    setSelectedSectionId(id);
    const sec = businessPlanSections.find(s => s.id === id);
    if (sec) {
      setEditingContent(sec.content);
      setIsEditing(false);
    }
  };

  const handleSaveSection = () => {
    updateBusinessPlanSection(selectedSectionId, editingContent);
    setIsEditing(false);
  };

  const handleExportPDF = () => {
    const htmlContent = `
      <h1>${startupData.name} — Institutional Business Plan</h1>
      <p style="color: #666; font-size: 14px;">Stage: ${startupData.stage} | Generated on ${new Date().toLocaleDateString()}</p>
      <hr/>
      ${businessPlanSections.map(sec => `
        <div style="margin-bottom: 24px;">
          <h3 style="color: #2563eb; border-bottom: 1px solid #eee; padding-bottom: 4px;">${sec.title}</h3>
          <p style="line-height: 1.6; font-size: 13px; color: #333;">${sec.content}</p>
        </div>
      `).join('')}
    `;
    exportToPDF(`${startupData.name}_Business_Plan`, `Business Plan — ${startupData.name}`, htmlContent);
  };

  const handleExportDocx = () => {
    const textContent = `${startupData.name.toUpperCase()} — INSTITUTIONAL BUSINESS PLAN\n\n` +
      businessPlanSections.map(s => `${s.title.toUpperCase()}\n${s.content}\n`).join('\n\n');
    exportToDocx(`${startupData.name}_Business_Plan`, textContent);
  };

  const handleShare = () => {
    copyShareableLink('business-plan', startupData.id);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 6</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Institutional Documentation</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            AI Business Plan Generator
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            12-section investor-grade business plan with live editing, AI refinement, and instant multi-format export.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={autoGenerateBusinessPlan} className="btn-ai" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Sparkles size={14} /> AI Regenerate All
          </button>
          <button onClick={handleExportPDF} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Download size={14} /> PDF
          </button>
          <button onClick={handleExportDocx} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <FileText size={14} /> DOCX
          </button>
          <button onClick={handleShare} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Share2 size={14} /> {copiedLink ? 'Copied!' : 'Share Link'}
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Sections Sidebar */}
        <div className="glass-panel" style={{ padding: '16px', maxHeight: '720px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '6px' }}>
            12 Plan Sections ({businessPlanSections.filter(s => s.isCompleted).length}/12)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {businessPlanSections.map((section) => {
              const isSelected = section.id === selectedSectionId;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSelectSection(section.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid #3b82f6' : '1px solid transparent',
                    background: isSelected ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                    color: isSelected ? '#60a5fa' : '#cbd5e1',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{section.title}</span>
                  {section.isCompleted && <CheckCircle2 size={13} color="#22c55e" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Section Content & Editor */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
            <div>
              <span className="badge-stage" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>Section Detail</span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                {activeSection?.title}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {isEditing ? (
                <button onClick={handleSaveSection} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  <Save size={14} /> Save Changes
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingContent(activeSection?.content || '');
                    setIsEditing(true);
                  }}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <Edit3 size={14} /> Edit Section
                </button>
              )}
            </div>
          </div>

          <div style={{ flex: 1, minHeight: '340px' }}>
            {isEditing ? (
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="input-field"
                style={{ width: '100%', height: '360px', lineHeight: 1.6, fontSize: '0.9rem' }}
              />
            ) : (
              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '20px', minHeight: '340px', lineHeight: 1.7, fontSize: '0.925rem', color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
                {activeSection?.content}
              </div>
            )}
          </div>

          {/* Quick Module Flow CTA */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setActiveModuleId(7)}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
            >
              Proceed to MVP & Product Builder (Module 7) <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
