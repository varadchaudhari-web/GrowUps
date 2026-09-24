import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, Plus, Sparkles, TrendingUp, Calendar, Search, Mail, Filter } from 'lucide-react';
import { GrowthExperiment } from '../../types';

export const Module10GrowthHub: React.FC = () => {
  const { growthExperiments, addGrowthExperiment, updateGrowthExperiment, startupData } = useApp();
  const [activeTab, setActiveTab] = useState<'experiments' | 'content' | 'seo' | 'email'>('experiments');
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [funnelStage, setFunnelStage] = useState<GrowthExperiment['funnelStage']>('Acquisition');
  const [hypothesis, setHypothesis] = useState('');
  const [metric, setMetric] = useState('');
  const [targetResult, setTargetResult] = useState('');
  const [budget, setBudget] = useState(5000);

  const handleAddExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !hypothesis) return;

    addGrowthExperiment({
      title,
      funnelStage,
      hypothesis,
      status: 'Idea',
      metric,
      targetResult,
      budget
    });

    setTitle('');
    setHypothesis('');
    setMetric('');
    setTargetResult('');
    setShowAddModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 10</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Customer Acquisition & Funnels</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Marketing & Growth Hub
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Run systematic growth experiments, content calendars, SEO campaigns, and outreach funnels.
          </p>
        </div>

        {activeTab === 'experiments' && (
          <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Plus size={14} /> New Growth Experiment
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('experiments')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'experiments' ? '#2563eb' : '#0f172a',
            color: activeTab === 'experiments' ? '#fff' : '#94a3b8',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <TrendingUp size={15} /> Growth Experiments ({growthExperiments.length})
        </button>
        <button
          onClick={() => setActiveTab('content')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'content' ? '#2563eb' : '#0f172a',
            color: activeTab === 'content' ? '#fff' : '#94a3b8',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Calendar size={15} /> Social Content Calendar
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'seo' ? '#2563eb' : '#0f172a',
            color: activeTab === 'seo' ? '#fff' : '#94a3b8',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Search size={15} /> SEO Keyword Planner
        </button>
        <button
          onClick={() => setActiveTab('email')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'email' ? '#2563eb' : '#0f172a',
            color: activeTab === 'email' ? '#fff' : '#94a3b8',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Mail size={15} /> Email Outreach Funnel
        </button>
      </div>

      {/* Add Experiment Form Modal */}
      {showAddModal && (
        <div style={{ background: '#090d16', border: '1px solid #3b82f6', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>Launch New Growth Experiment</h3>
          <form onSubmit={handleAddExperiment} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Experiment Name</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Free Cloud Waste CLI Tool" className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Funnel Stage</label>
              <select value={funnelStage} onChange={(e) => setFunnelStage(e.target.value as any)} className="input-field">
                <option value="Awareness">Awareness (Top of Funnel)</option>
                <option value="Acquisition">Acquisition (Lead Capture)</option>
                <option value="Activation">Activation (Trial Usage)</option>
                <option value="Retention">Retention (Product Stickiness)</option>
                <option value="Revenue">Revenue (Paid Conversion)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Metric to Track</label>
              <input type="text" value={metric} onChange={(e) => setMetric(e.target.value)} placeholder="e.g. Free Trial Signups" className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Target Result</label>
              <input type="text" value={targetResult} onChange={(e) => setTargetResult(e.target.value)} placeholder="e.g. 100 Signups in 14 days" className="input-field" required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hypothesis</label>
              <textarea value={hypothesis} onChange={(e) => setHypothesis(e.target.value)} placeholder="If we [Action], then [Expected Outcome] because [Reason]..." className="input-field" rows={2} required />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary" style={{ padding: '8px 16px' }}>Save Experiment</button>
              <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* 1. GROWTH EXPERIMENTS TAB */}
      {activeTab === 'experiments' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
          {growthExperiments.map((exp) => (
            <div key={exp.id} className="glass-panel" style={{ padding: '20px', background: '#090d16', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge-stage" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>{exp.funnelStage}</span>
                <select
                  value={exp.status}
                  onChange={(e) => updateGrowthExperiment(exp.id, { status: e.target.value as any })}
                  style={{
                    background: '#0f172a',
                    color: exp.status === 'Running' ? '#60a5fa' : exp.status === 'Scaled' ? '#4ade80' : '#cbd5e1',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '0.75rem'
                  }}
                >
                  <option value="Idea">Idea</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                  <option value="Scaled">Scaled (High Growth)</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                {exp.title}
              </h3>

              <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '14px' }}>
                {exp.hypothesis}
              </p>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Metric:</span>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{exp.metric}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Target:</span>
                  <span style={{ color: '#60a5fa' }}>{exp.targetResult}</span>
                </div>
                {exp.actualResult && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Actual:</span>
                    <span style={{ color: '#4ade80', fontWeight: 700 }}>{exp.actualResult}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. SOCIAL CONTENT CALENDAR */}
      {activeTab === 'content' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
            Weekly Social Publishing Calendar
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {['Monday: Case Study', 'Wednesday: Technical Benchmark', 'Friday: Founder Behind-The-Scenes', 'Sunday: Industry Poll'].map((item, idx) => (
              <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#60a5fa' }}>{item.split(':')[0]}</div>
                <div style={{ fontSize: '0.85rem', color: '#ffffff', marginTop: '4px', fontWeight: 600 }}>{item.split(':')[1]}</div>
                <div style={{ fontSize: '0.725rem', color: '#94a3b8', marginTop: '6px' }}>Status: Scheduled for LinkedIn & X</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SEO PLANNER */}
      {activeTab === 'seo' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
            High-Intent SEO Keywords for {startupData.name}
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '10px', color: '#f8fafc' }}>Target Keyword</th>
                <th style={{ padding: '10px', color: '#94a3b8' }}>Search Intent</th>
                <th style={{ padding: '10px', color: '#60a5fa' }}>Monthly Volume</th>
                <th style={{ padding: '10px', color: '#4ade80' }}>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {[
                { kw: 'how to reduce kubernetes cloud cost', intent: 'Informational / Top of Funnel', vol: '4,200/mo', diff: 'Low (22)' },
                { kw: 'autonomous aws right sizing tool', intent: 'Commercial / High Buyer Intent', vol: '1,800/mo', diff: 'Medium (38)' },
                { kw: 'best finops tools for startups', intent: 'Transactional / Solution Comparison', vol: '3,100/mo', diff: 'Medium (42)' }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#ffffff' }}>{row.kw}</td>
                  <td style={{ padding: '10px', color: '#cbd5e1' }}>{row.intent}</td>
                  <td style={{ padding: '10px', color: '#93c5fd' }}>{row.vol}</td>
                  <td style={{ padding: '10px', color: '#4ade80' }}>{row.diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. EMAIL FUNNEL */}
      {activeTab === 'email' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
            Cold Outreach Sequence (3-Step Drip)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa' }}>Step 1 (Day 1): The 30% Cloud Waste Audit Question</div>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '4px' }}>
                Subject: Quick question about [Company] Kubernetes memory allocation
              </p>
            </div>
            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa' }}>Step 2 (Day 4): Loom Video Demo of 1-Click PR</div>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '4px' }}>
                Subject: How we saved [Similar Company] ₹1.8L on AWS last month
              </p>
            </div>
            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa' }}>Step 3 (Day 8): Break-Up Email with Free Open Source Audit Link</div>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '4px' }}>
                Subject: Permission to close file on [Company] FinOps review?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
