import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Users, Shield, Target, RefreshCw, Layers, ArrowRight, Zap, AlertTriangle, Sparkles } from 'lucide-react';

export const Module04MarketResearch: React.FC = () => {
  const { marketResearch, refreshMarketResearch, startupData, setActiveModuleId } = useApp();
  const [industryInput, setIndustryInput] = useState(startupData.industry);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRefreshing(true);
    setTimeout(() => {
      refreshMarketResearch(industryInput);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 4</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Industry Signals & Competitor Intel</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            AI Market Research & Sizing
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            TAM/SAM/SOM market sizing, customer persona archetypes, competitor radars, and SWOT matrix.
          </p>
        </div>

        <form onSubmit={handleRefresh} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={industryInput}
            onChange={(e) => setIndustryInput(e.target.value)}
            placeholder="Search Industry..."
            className="input-field"
            style={{ width: '240px', padding: '8px 12px', fontSize: '0.825rem' }}
          />
          <button type="submit" className="btn-ai" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            {isRefreshing ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />} Refresh Intel
          </button>
        </form>
      </div>

      {/* TAM / SAM / SOM Sizing Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
            Total Addressable Market (TAM)
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#60a5fa', margin: '6px 0' }}>
            {marketResearch.tam}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
            Global market volume ({marketResearch.cagr} CAGR)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
            Serviceable Addressable Market (SAM)
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#c084fc', margin: '6px 0' }}>
            {marketResearch.sam}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
            Mid-market tech startups & cloud enterprises
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
            Serviceable Obtainable Market (SOM)
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#4ade80', margin: '6px 0' }}>
            {marketResearch.som}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
            Initial 3-Year target beachhead market
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Industry Trends */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <TrendingUp size={18} color="#60a5fa" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Top Industry Trends & Tailwinds</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {marketResearch.trends.map((trend, idx) => (
              <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px', fontSize: '0.825rem', color: '#e2e8f0', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Zap size={14} color="#22c55e" style={{ flexShrink: 0 }} />
                <span>{trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Personas */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Users size={18} color="#a855f7" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Customer Persona Profiles (ICP)</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {marketResearch.customerPersonas.map((persona, idx) => (
              <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{persona.name}</span>
                  <span style={{ fontSize: '0.725rem', background: '#1e293b', color: '#60a5fa', padding: '2px 8px', borderRadius: '4px' }}>{persona.role}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>
                  <strong>Pain Points:</strong> {persona.painPoints.join(' • ')}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>
                  <strong>Trigger:</strong> {persona.buyingTrigger}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Radar Matrix */}
      <div className="glass-panel" style={{ padding: '22px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Target size={18} color="#fbbf24" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Competitive Radar Matrix</h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '10px', color: '#f8fafc' }}>Competitor Solution</th>
                <th style={{ padding: '10px', color: '#4ade80' }}>Strengths</th>
                <th style={{ padding: '10px', color: '#f87171' }}>Weaknesses / Gaps</th>
                <th style={{ padding: '10px', color: '#60a5fa' }}>Pricing Model</th>
                <th style={{ padding: '10px', color: '#cbd5e1' }}>Market Share</th>
              </tr>
            </thead>
            <tbody>
              {marketResearch.competitors.map((comp, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#ffffff' }}>{comp.name}</td>
                  <td style={{ padding: '10px', color: '#cbd5e1' }}>{comp.strengths}</td>
                  <td style={{ padding: '10px', color: '#fca5a5' }}>{comp.weaknesses}</td>
                  <td style={{ padding: '10px', color: '#93c5fd' }}>{comp.pricingModel}</td>
                  <td style={{ padding: '10px', color: '#cbd5e1' }}>{comp.marketShare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SWOT Analysis Matrix */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Layers size={18} color="#22c55e" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>SWOT Analysis Framework</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '10px', padding: '14px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} color="#4ade80" /> Strengths
            </h3>
            <ul style={{ paddingLeft: '16px', fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {marketResearch.swot.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '14px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={14} color="#f87171" /> Weaknesses
            </h3>
            <ul style={{ paddingLeft: '16px', fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {marketResearch.swot.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>

          <div style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '10px', padding: '14px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="#60a5fa" /> Opportunities
            </h3>
            <ul style={{ paddingLeft: '16px', fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {marketResearch.swot.opportunities.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '14px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={14} color="#fbbf24" /> Threats
            </h3>
            <ul style={{ paddingLeft: '16px', fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {marketResearch.swot.threats.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
