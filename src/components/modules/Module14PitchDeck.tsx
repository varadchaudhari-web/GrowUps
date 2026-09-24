import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Presentation, ChevronLeft, ChevronRight, Sparkles, Download, Edit3, Save, Share2, Layers } from 'lucide-react';
import { exportToDocx, exportToPDF } from '../../utils/exportUtils';
import { PitchDeckSlide } from '../../types';

export const Module14PitchDeck: React.FC = () => {
  const { pitchDeckSlides, updatePitchDeckSlide, startupData, setActiveModuleId } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideBullets, setSlideBullets] = useState('');

  const activeSlide = pitchDeckSlides[currentSlideIndex] || pitchDeckSlides[0];

  const handleStartEdit = () => {
    setSlideTitle(activeSlide.title);
    setSlideSubtitle(activeSlide.subtitle);
    setSlideBullets(activeSlide.bullets.join('\n'));
    setIsEditing(true);
  };

  const handleSaveSlide = () => {
    updatePitchDeckSlide(activeSlide.id, {
      title: slideTitle,
      subtitle: slideSubtitle,
      bullets: slideBullets.split('\n').map(b => b.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  const handleExportPDF = () => {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif;">
        <h1 style="color: #2563eb;">${startupData.name} — Institutional Pitch Deck</h1>
        <p>13-Slide Presentation Series</p>
        <hr/>
        ${pitchDeckSlides.map((slide, i) => `
          <div style="margin-bottom: 30px; page-break-after: always; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="font-size: 12px; color: #64748b;">Slide ${i + 1} of ${pitchDeckSlides.length} — ${slide.type.toUpperCase()}</div>
            <h2 style="color: #0f172a; margin: 6px 0;">${slide.title}</h2>
            <h4 style="color: #2563eb; margin: 4px 0 16px 0;">${slide.subtitle}</h4>
            <ul style="line-height: 1.8;">
              ${slide.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
            ${slide.metrics ? `
              <div style="display: flex; gap: 20px; margin-top: 16px;">
                ${slide.metrics.map(m => `
                  <div style="background: #f1f5f9; padding: 10px; border-radius: 6px;">
                    <div style="font-size: 11px; color: #64748b;">${m.label}</div>
                    <div style="font-size: 16px; font-weight: bold; color: #0f172a;">${m.value}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
    exportToPDF(`${startupData.name}_Pitch_Deck`, `Pitch Deck — ${startupData.name}`, htmlContent);
  };

  const handleExportDocx = () => {
    const textContent = `PITCH DECK OUTLINE: ${startupData.name}\n\n` +
      pitchDeckSlides.map((s, idx) => `SLIDE ${idx + 1}: ${s.title.toUpperCase()}\n${s.subtitle}\n\n${s.bullets.map(b => '- ' + b).join('\n')}\nNotes: ${s.notes}\n`).join('\n---\n\n');
    exportToDocx(`${startupData.name}_Pitch_Deck_Outline`, textContent);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 14</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Institutional Pitch Slide Deck</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            AI Pitch Deck Builder
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            13-slide institutional investor deck with visual previews, slide editor, and presentation export.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={handleExportPDF} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Download size={14} /> Export PDF Deck
          </button>
          <button onClick={handleExportDocx} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Download size={14} /> DOCX
          </button>
          <button onClick={() => setActiveModuleId(15)} className="btn-ai" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            Find Matching VCs (Module 15)
          </button>
        </div>
      </div>

      {/* Main Pitch Deck Viewer & Editor */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' }}>
        {/* Slide Selector Thumbnails */}
        <div className="glass-panel" style={{ padding: '14px', maxHeight: '680px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px', paddingLeft: '4px' }}>
            Slides ({pitchDeckSlides.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {pitchDeckSlides.map((slide, idx) => {
              const isCurrent = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setIsEditing(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: isCurrent ? '1px solid #3b82f6' : '1px solid #1e293b',
                    background: isCurrent ? 'rgba(37, 99, 235, 0.2)' : '#090d16',
                    color: isCurrent ? '#60a5fa' : '#cbd5e1',
                    fontSize: '0.78rem',
                    fontWeight: isCurrent ? 700 : 400,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>#{idx + 1}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {slide.title.replace(/The Problem: |The Solution: |Market Opportunity: /g, '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Slide Canvas Visual Preview */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-stage" style={{ fontSize: '0.7rem' }}>Slide {currentSlideIndex + 1} of {pitchDeckSlides.length}</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>{activeSlide.type}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {isEditing ? (
                <button onClick={handleSaveSlide} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  <Save size={14} /> Save Slide
                </button>
              ) : (
                <button onClick={handleStartEdit} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  <Edit3 size={14} /> Edit Slide Content
                </button>
              )}
            </div>
          </div>

          {/* Slide Body Canvas */}
          <div style={{
            flex: 1,
            background: 'radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.15) 0%, #090d16 80%)',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '36px',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)',
            position: 'relative'
          }}>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  value={slideTitle}
                  onChange={(e) => setSlideTitle(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '1.2rem', fontWeight: 800 }}
                />
                <input
                  type="text"
                  value={slideSubtitle}
                  onChange={(e) => setSlideSubtitle(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.9rem', color: '#60a5fa' }}
                />
                <textarea
                  value={slideBullets}
                  onChange={(e) => setSlideBullets(e.target.value)}
                  className="input-field"
                  rows={5}
                  style={{ fontSize: '0.85rem', lineHeight: 1.6 }}
                />
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', marginBottom: '8px', lineHeight: 1.2 }}>
                  {activeSlide.title}
                </h2>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#60a5fa', marginBottom: '20px' }}>
                  {activeSlide.subtitle}
                </h3>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px', marginBottom: '20px' }}>
                  {activeSlide.bullets.map((bullet, idx) => (
                    <li key={idx} style={{ fontSize: '0.925rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {activeSlide.metrics && (
                  <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
                    {activeSlide.metrics.map((m, idx) => (
                      <div key={idx} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px 18px' }}>
                        <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{m.label}</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4ade80', marginTop: '2px' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <div style={{ position: 'absolute', bottom: '14px', right: '20px', fontSize: '0.7rem', color: '#475569' }}>
              GrowUps • Confidential
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <button
              onClick={() => {
                if (currentSlideIndex > 0) {
                  setCurrentSlideIndex(currentSlideIndex - 1);
                  setIsEditing(false);
                }
              }}
              disabled={currentSlideIndex === 0}
              className="btn-secondary"
              style={{ padding: '8px 16px', opacity: currentSlideIndex === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} /> Previous Slide
            </button>

            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Presenter Note: <em>{activeSlide.notes}</em>
            </span>

            <button
              onClick={() => {
                if (currentSlideIndex < pitchDeckSlides.length - 1) {
                  setCurrentSlideIndex(currentSlideIndex + 1);
                  setIsEditing(false);
                }
              }}
              disabled={currentSlideIndex === pitchDeckSlides.length - 1}
              className="btn-secondary"
              style={{ padding: '8px 16px', opacity: currentSlideIndex === pitchDeckSlides.length - 1 ? 0.4 : 1 }}
            >
              Next Slide <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
