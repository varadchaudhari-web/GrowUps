import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Sparkles, AlertTriangle, CheckCircle2, ArrowUpRight, ShieldCheck, Target, Activity } from 'lucide-react';

export const Module24StartupAnalytics: React.FC = () => {
  const { startupData, aiWeeklySummary, financialMetrics, crmLeads, tasks, userStories } = useApp();

  const totalWonDeals = crmLeads.filter(l => l.stage === 'Won').length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 24</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Unified Founder Cockpit & AI Audits</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Startup Analytics & AI Business Review
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Real-time telemetry across revenue, sprints, conversion funnels, and autonomous AI weekly reviews.
          </p>
        </div>

        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 14px', fontSize: '0.78rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity size={13} color="#4ade80" /> Real-Time State Synchronized
        </div>
      </div>

      {/* Founder Cockpit KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Monthly Revenue (MRR)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#22c55e', margin: '4px 0' }}>
            ₹{startupData.traction.mrr.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={14} /> +{startupData.traction.growthRatePercent}% MoM
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Active Users / Clients</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#60a5fa', margin: '4px 0' }}>
            {startupData.traction.users}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>14 Paying Enterprise Seats</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Sprint Task Velocity</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c084fc', margin: '4px 0' }}>
            {completedTasks} / {tasks.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Tasks Completed This Sprint</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Cash Runway</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24', margin: '4px 0' }}>
            {startupData.traction.runwayMonths} Mo
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>Net Burn: ₹{startupData.traction.burnRate.toLocaleString('en-IN')}/mo</div>
        </div>
      </div>

      {/* AI Business Review Section */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} color="#a855f7" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              Autonomous AI Weekly Business Review ({aiWeeklySummary.period})
            </h2>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#60a5fa', background: '#090d16', border: '1px solid #1e293b', padding: '4px 10px', borderRadius: '6px' }}>
            Generated Today
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Highlights */}
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4ade80', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> 1. What Changed (Highlights):
            </h3>
            <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiWeeklySummary.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>

          {/* Risks */}
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} /> 2. Key Risks & Bottlenecks:
            </h3>
            <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiWeeklySummary.risks.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          {/* Suggested Priorities */}
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#60a5fa', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target size={16} /> 3. Suggested Action Priorities:
            </h3>
            <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {aiWeeklySummary.actionPriorities.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
