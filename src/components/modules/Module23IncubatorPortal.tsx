import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building, Building2, Users, Award, TrendingUp, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const Module23IncubatorPortal: React.FC = () => {
  const { incubatorCohorts, startupData } = useApp();
  const cohort = incubatorCohorts[0];

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 23</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>B2B Accelerator & University Hubs</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Incubator & Accelerator Portal
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Manage startup cohorts, application pipelines, mentor allocations, and Demo Day traction portfolios.
          </p>
        </div>

        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 16px', fontSize: '0.85rem', color: '#60a5fa', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={16} color="#60a5fa" /> {cohort?.programName}
        </div>
      </div>

      {/* Cohort Stats Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Active Cohort Batch</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#60a5fa', margin: '4px 0' }}>
            {cohort?.cohortYear}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>12 Startups Enrolled</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Grant & Capital Pool</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#4ade80', margin: '4px 0' }}>
            {cohort?.grantPoolINR}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Direct founder grants & perks</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Next Demo Day</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c084fc', margin: '4px 0' }}>
            Nov 28, 2026
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>45+ Tier-1 VCs Attending</div>
        </div>
      </div>

      {/* Cohort Startups Table */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building size={18} color="#60a5fa" /> Enrolled Cohort Startups & Milestone Progression
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '12px', color: '#f8fafc' }}>Startup Name</th>
              <th style={{ padding: '12px', color: '#94a3b8' }}>Founder Lead</th>
              <th style={{ padding: '12px', color: '#60a5fa' }}>Stage</th>
              <th style={{ padding: '12px', color: '#22c55e' }}>Current MRR</th>
              <th style={{ padding: '12px', color: '#cbd5e1' }}>Assigned Mentor</th>
              <th style={{ padding: '12px', color: '#f8fafc', textAlign: 'right' }}>Milestone Progress</th>
            </tr>
          </thead>
          <tbody>
            {cohort?.startups.map((st, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: '#ffffff' }}>{st.name}</td>
                <td style={{ padding: '12px', color: '#cbd5e1' }}>{st.founder}</td>
                <td style={{ padding: '12px' }}>
                  <span className="badge-stage" style={{ fontSize: '0.65rem' }}>{st.stage}</span>
                </td>
                <td style={{ padding: '12px', fontWeight: 700, color: '#22c55e' }}>
                  ₹{st.mrr.toLocaleString('en-IN')}/mo
                </td>
                <td style={{ padding: '12px', color: '#a855f7', fontWeight: 600 }}>{st.mentorAssigned}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                    <div style={{ width: '80px', height: '6px', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${st.milestoneProgressPercent}%`, height: '100%', background: '#22c55e' }} />
                    </div>
                    <span style={{ fontWeight: 800, color: '#4ade80' }}>{st.milestoneProgressPercent}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
