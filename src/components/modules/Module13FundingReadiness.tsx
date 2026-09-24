import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, Upload, Sparkles, PieChart, ArrowRight } from 'lucide-react';

export const Module13FundingReadiness: React.FC = () => {
  const { dueDiligenceList, toggleDueDiligence, startupData, setActiveModuleId } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Corporate', 'Financial', 'IP & Tech', 'Commercial', 'Compliance'];

  const filteredItems = activeCategory === 'All'
    ? dueDiligenceList
    : dueDiligenceList.filter(d => d.category === activeCategory);

  const completedCount = dueDiligenceList.filter(d => d.isReady).length;
  const overallReadinessPercent = Math.round((completedCount / dueDiligenceList.length) * 100);

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 13</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Due Diligence & Investor Data Room</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Funding Readiness & Data Room
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Organize institutional investor materials, audit cap tables, and detect due-diligence gaps before pitching VCs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveModuleId(14)}
            className="btn-primary"
            style={{ fontSize: '0.8rem', padding: '8px 14px' }}
          >
            Open Pitch Deck Builder (Module 14) <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Readiness Score Progress Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '14px',
        padding: '20px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'conic-gradient(#22c55e 0% ' + overallReadinessPercent + '%, #1e293b ' + overallReadinessPercent + '% 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>
              {overallReadinessPercent}%
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              Overall Due-Diligence Readiness Score
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '2px' }}>
              {completedCount} of {dueDiligenceList.length} compliance documents & financial models verified in Data Room.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '0.78rem', background: '#090d16', border: '1px solid #334155', padding: '6px 14px', borderRadius: '8px', color: overallReadinessPercent >= 80 ? '#4ade80' : '#fbbf24', fontWeight: 700 }}>
            Status: {overallReadinessPercent >= 80 ? 'Seed Round Ready' : 'In Progress'}
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: activeCategory === cat ? '1px solid #3b82f6' : '1px solid #1e293b',
              background: activeCategory === cat ? 'rgba(37, 99, 235, 0.25)' : '#0f172a',
              color: activeCategory === cat ? '#60a5fa' : '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Due Diligence Checklist Grid */}
      <div className="glass-panel" style={{ padding: '22px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="#22c55e" /> Investor Data Room Document Checklist
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#090d16',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
                <button
                  onClick={() => toggleDueDiligence(item.id)}
                  style={{
                    background: item.isReady ? '#22c55e' : '#1e293b',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ffffff',
                    flexShrink: 0
                  }}
                >
                  {item.isReady && <CheckCircle2 size={16} />}
                </button>

                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: item.isReady ? '#f8fafc' : '#94a3b8', textDecoration: item.isReady ? 'none' : 'none' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ color: '#60a5fa' }}>{item.category}</span>
                    <span>• {item.documentName || 'No document uploaded'}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.isReady ? '#4ade80' : '#fbbf24' }}>
                  {item.aiReadinessScore}% Score
                </span>
                <button
                  onClick={() => toggleDueDiligence(item.id)}
                  className="btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {item.isReady ? 'Uploaded' : 'Upload File'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cap Table & Use of Funds Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={18} color="#a855f7" /> Clean Cap-Table Ownership
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Aarav Patel (CEO & Co-founder):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa' }}>50.0%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Rohan Deshmukh (CTO & Co-founder):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a855f7' }}>40.0%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>ESOP Pool (Unallocated for Hiring):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#22c55e' }}>10.0%</span>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#22c55e" /> Use of Funds (₹2.5 Cr Seed Round)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Engineering & AI LLM Research (55%):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>₹1,37,50,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Go-To-Market & US Sales (30%):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>₹75,00,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Security, Legal & SOC2 (15%):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>₹37,50,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
