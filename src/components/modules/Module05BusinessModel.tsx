import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutGrid, Sparkles, Plus, Trash2, Download, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { exportToDocx, exportToPDF } from '../../utils/exportUtils';

export const Module05BusinessModel: React.FC = () => {
  const { leanCanvas, updateCanvasBlock, autoGenerateCanvasFromProfile, startupData, setActiveModuleId } = useApp();
  const [editingBlockKey, setEditingBlockKey] = useState<string | null>(null);
  const [newItemText, setNewItemText] = useState('');
  const [syncedSuccess, setSyncedSuccess] = useState(false);

  const handleAddItem = (key: string) => {
    if (!newItemText.trim()) return;
    const block = leanCanvas.find(b => b.key === key);
    if (block) {
      updateCanvasBlock(key, [...block.items, newItemText.trim()]);
      setNewItemText('');
    }
  };

  const handleRemoveItem = (key: string, idx: number) => {
    const block = leanCanvas.find(b => b.key === key);
    if (block) {
      updateCanvasBlock(key, block.items.filter((_, i) => i !== idx));
    }
  };

  const handleAutoGenerate = () => {
    autoGenerateCanvasFromProfile();
    setSyncedSuccess(true);
    setTimeout(() => setSyncedSuccess(false), 3000);
  };

  const handleExportPDF = () => {
    const htmlContent = `
      <h2>Business Model Canvas — ${startupData.name}</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;">
        ${leanCanvas.map(block => `
          <div style="border: 1px solid #ccc; padding: 10px; border-radius: 6px;">
            <h4 style="margin: 0 0 8px 0; color: #2563eb;">${block.title}</h4>
            <ul style="padding-left: 16px; margin: 0; font-size: 12px;">
              ${block.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
    exportToPDF('Business_Model_Canvas', `Business Model Canvas — ${startupData.name}`, htmlContent);
  };

  const handleExportDocx = () => {
    const textContent = `BUSINESS MODEL CANVAS: ${startupData.name}\n\n` +
      leanCanvas.map(b => `${b.title.toUpperCase()}:\n${b.items.map(i => '- ' + i).join('\n')}`).join('\n\n');
    exportToDocx('Business_Model_Canvas', textContent);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 5</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>9-Box Lean Framework</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Business Model Builder
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Convert your startup idea into an editable, synchronized 9-box Business Model Canvas.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {syncedSuccess && (
            <span style={{ color: '#4ade80', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> Synced with Profile!
            </span>
          )}
          <button onClick={handleAutoGenerate} className="btn-ai" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Sparkles size={14} /> AI Auto-Populate
          </button>
          <button onClick={handleExportPDF} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Download size={14} /> PDF
          </button>
          <button onClick={handleExportDocx} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <FileText size={14} /> DOCX
          </button>
        </div>
      </div>

      {/* 9-Box Interactive Canvas Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {leanCanvas.map((block) => {
          const isEditingThis = editingBlockKey === block.key;
          return (
            <div
              key={block.key}
              className="glass-panel"
              style={{
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '220px',
                background: '#090d16',
                border: '1px solid #1e293b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#60a5fa' }}>{block.title}</h3>
                <button
                  onClick={() => setEditingBlockKey(isEditingThis ? null : block.key)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.725rem', cursor: 'pointer' }}
                >
                  {isEditingThis ? 'Done' : '+ Add Item'}
                </button>
              </div>

              {/* Items List */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {block.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      fontSize: '0.78rem',
                      color: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}
                  >
                    <span>• {item}</span>
                    <button
                      onClick={() => handleRemoveItem(block.key, idx)}
                      style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', flexShrink: 0 }}
                      title="Remove"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Input when Editing */}
              {isEditingThis && (
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Enter new point..."
                    className="input-field"
                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddItem(block.key);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddItem(block.key)}
                    className="btn-primary"
                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Downstream Sync CTA */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(34, 197, 94, 0.12) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
            Next Step: Generate Institutional Business Plan
          </div>
          <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px' }}>
            Your 9-box Lean Canvas is ready to be expanded into a 12-section Business Plan in Module 6.
          </div>
        </div>

        <button
          onClick={() => setActiveModuleId(6)}
          className="btn-primary"
          style={{ fontSize: '0.8rem', padding: '8px 16px' }}
        >
          Open AI Business Plan (Module 6) <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
