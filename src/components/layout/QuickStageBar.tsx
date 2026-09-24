import React from 'react';
import { useApp } from '../../context/AppContext';
import { StartupStage } from '../../types';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const STAGES: { stage: StartupStage; label: string; desc: string }[] = [
  { stage: 'Idea', label: '1. Idea', desc: 'Concept & Problem Definition' },
  { stage: 'Validation', label: '2. Validation', desc: 'Customer Discovery & Market Sizing' },
  { stage: 'MVP', label: '3. MVP', desc: 'PRD & Agile Build' },
  { stage: 'Early Traction', label: '4. Early Traction', desc: 'First 100 Paying Users' },
  { stage: 'Revenue', label: '5. Revenue', desc: 'Repeatable Sales & Positive CAC' },
  { stage: 'Growth', label: '6. Growth', desc: 'Scale Channels & Team Hiring' },
  { stage: 'Scale', label: '7. Scale', desc: 'Series A+ & Ecosystem Dominance' }
];

export const QuickStageBar: React.FC = () => {
  const { startupData, setStartupStage } = useApp();

  const currentStageIndex = STAGES.findIndex(s => s.stage === startupData.stage);

  return (
    <div
      className="responsive-scroll-x"
      style={{
        background: '#090d16',
        borderBottom: '1px solid #1e293b',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
          <Sparkles size={13} color="#60a5fa" /> Stage:
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: '580px' }}>
        {STAGES.map((s, idx) => {
          const isActive = s.stage === startupData.stage;
          const isPassed = idx < currentStageIndex;

          return (
            <React.Fragment key={s.stage}>
              <button
                onClick={() => setStartupStage(s.stage)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: isActive ? '1px solid #22c55e' : isPassed ? '1px solid #2563eb' : '1px solid #1e293b',
                  background: isActive ? 'rgba(34, 197, 94, 0.18)' : isPassed ? 'rgba(37, 99, 235, 0.12)' : '#0f172a',
                  color: isActive ? '#4ade80' : isPassed ? '#60a5fa' : '#64748b',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
                title={s.desc}
              >
                {isPassed && <Check size={12} />}
                {isActive && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />}
                {s.label}
              </button>
              {idx < STAGES.length - 1 && (
                <ArrowRight size={12} color="#334155" style={{ flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
