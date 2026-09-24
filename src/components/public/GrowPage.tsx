import React from 'react';
import { useCMS, CMSCard } from '../../context/CMSContext';
import { ArrowRight, Megaphone, BarChart3, Wallet, TrendingUp, Users2, DollarSign } from 'lucide-react';
import { BarScene } from '../common/Scenes3D';
import { resolveLucideIcon } from '../../utils/iconResolver';

interface GrowPageProps {
  onCardClick: (card: CMSCard) => void;
  onOpenDashboard: (moduleId?: number) => void;
}

export const GrowPage: React.FC<GrowPageProps> = ({ onCardClick, onOpenDashboard }) => {
  const { getSection } = useCMS();
  const heroSec = getSection('grow.hero') || getSection('home.grow');
  const featuresSec = getSection('grow.features') || getSection('home.grow');
  const ctaSec = getSection('grow.cta');

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: '80px 0 60px', background: 'radial-gradient(circle at 70% 30%, rgba(37, 99, 235, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '640px' }}>
            <span className={`tag-badge ${heroSec?.tagColor || 'b'}`}>{heroSec?.tag || 'Grow Suite'}</span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, color: '#ffffff', margin: '0 0 18px', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              {heroSec?.title || 'Scale Customer Acquisition & Cash Runway.'}
            </h1>
            <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
              {heroSec?.lede || 'Unify multi-channel marketing experiments, lead pipeline conversion, and financial unit economics in one dashboard.'}
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button onClick={() => onOpenDashboard(10)} className="btn-primary">
                {heroSec?.ctaText || 'Launch Growth Hub'} <ArrowRight size={15} />
              </button>
              <button onClick={() => onOpenDashboard(11)} className="btn-secondary">
                View Sales CRM
              </button>
            </div>
          </div>
          <BarScene />
        </div>
      </section>

      {/* 2. MARKETING & GROWTH EXPERIMENTS */}
      <section style={{ padding: '90px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge-stage" style={{ marginBottom: '12px' }}>{featuresSec?.tag || 'AARRR Funnel Growth'}</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              {featuresSec?.title || 'Scientific Growth Experimentation'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6 }}>
              {featuresSec?.lede || 'Move beyond random marketing tricks. Formulate testable hypotheses, set target metrics, and scale winning channels.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {(featuresSec?.cards || []).map((c) => (
              <div key={c.title} onClick={() => onCardClick(c)} className="public-card">
                <div className="card-icon" style={{ background: c.tint }}>
                  {resolveLucideIcon(c.iconName, 20, '#0F172A')}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RUNWAY & FINANCIAL SIMULATOR HIGHLIGHT */}
      <section style={{ padding: '90px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span className="tag-badge b">Cashflow Cockpit</span>
              <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
                Automated Runway & Unit Economics
              </h2>
              <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
                Stop relying on broken Excel sheets. Model CAC payback, gross margin trajectories, and projected runway with live sync to your CRM contract values.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <TrendingUp size={16} color="#3b82f6" /> <span>Real-time Net Burn & Zero-Cash Date projections</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <DollarSign size={16} color="#22c55e" /> <span>Scenario toggles: Base vs Pessimistic vs Aggressive</span>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px', background: '#090d16', border: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Live MRR Telemetry Sample
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#22c55e', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                ₹8,40,000
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '18px' }}>
                Monthly Recurring Revenue • 14.8 Months Runway Available
              </div>
              <button onClick={() => onOpenDashboard(12)} className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}>
                Open Financial Modeler <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 28px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
            {ctaSec?.title || 'Accelerate Your Customer & Revenue Engine'}
          </h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
            {ctaSec?.lede || 'Manage experiments, CRM leads, and cash runway in one cohesive system.'}
          </p>
          <button onClick={() => onOpenDashboard(10)} className="btn-primary" style={{ padding: '14px 32px' }}>
            {ctaSec?.ctaText || 'Grow My Startup'} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
