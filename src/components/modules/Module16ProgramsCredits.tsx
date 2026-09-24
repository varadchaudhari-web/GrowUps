import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, CheckCircle2, Clock, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { StartupProgram } from '../../types';

export const Module16ProgramsCredits: React.FC = () => {
  const { startupPrograms, updateProgramStatus, startupData } = useApp();

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 16</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Cloud Credits & Ecosystem Grants</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Startup Programs & Cloud Credits ($300k+ Value)
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Direct access to AWS Activate, Google Cloud, Microsoft Founders Hub, and accelerator grants.
          </p>
        </div>

        <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.35)', borderRadius: '8px', padding: '8px 16px', color: '#4ade80', fontSize: '0.85rem', fontWeight: 800 }}>
          Total Available Benefits: $470,000 USD
        </div>
      </div>

      {/* Programs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {startupPrograms.map((prog) => (
          <div
            key={prog.id}
            className="glass-panel"
            style={{
              padding: '22px',
              background: '#090d16',
              border: '1px solid #1e293b',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.725rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase' }}>{prog.provider}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{prog.programName}</h3>
                </div>
                <span className="badge-stage" style={{ fontSize: '0.68rem' }}>{prog.category}</span>
              </div>

              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#22c55e', margin: '8px 0 12px 0' }}>
                {prog.value}
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>Eligibility Requirements:</div>
                <ul style={{ paddingLeft: '16px', fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {prog.eligibility.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Application Status:</span>
                <select
                  value={prog.status}
                  onChange={(e) => updateProgramStatus(prog.id, e.target.value as any)}
                  style={{
                    background: '#0f172a',
                    color: prog.status === 'Approved' || prog.status === 'Claimed' ? '#4ade80' : '#fbbf24',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    marginTop: '2px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Not Applied">Not Applied</option>
                  <option value="In Review">In Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Claimed">Claimed</option>
                </select>
              </div>

              <a
                href={prog.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ padding: '8px 14px', fontSize: '0.75rem', textDecoration: 'none' }}
              >
                Apply Directly <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
