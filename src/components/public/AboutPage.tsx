import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, Compass, ShieldCheck, Handshake, Globe, Sparkles } from 'lucide-react';
import { resolveLucideIcon } from '../../utils/iconResolver';

interface AboutPageProps {
  onOpenDashboard: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenDashboard }) => {
  const { getSection } = useCMS();

  const heroSec = getSection('about.hero');
  const probSec = getSection('about.problem');
  const timelineSec = getSection('about.timeline');
  const impactSec = getSection('about.impact');

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px' }}>
      {/* 1. HERO SECTION: MISSION & VISION */}
      <section style={{ padding: '80px 0 60px', background: 'radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge g">Our Purpose</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, color: '#ffffff', margin: '0 0 18px', fontFamily: 'var(--font-heading)', lineHeight: 1.1, maxWidth: '820px' }}>
            {heroSec?.title || 'Democratizing Startup Building Across the World.'}
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, maxWidth: '680px', marginBottom: '28px' }}>
            {heroSec?.lede || 'GrowUps was founded on a simple conviction: brilliant ideas shouldn’t fail because founders lack access to fragmented planning, funding, legal, and growth infrastructure.'}
          </p>
          <button onClick={onOpenDashboard} className="btn-primary">
            Explore the Platform <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* 2. THE CORE PROBLEM & PHILOSOPHY */}
      <section style={{ padding: '90px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge b">The Philosophy</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
            {probSec?.title || 'Ending the 10-Tool Fragmentation Dilemma.'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, marginBottom: '36px', maxWidth: '640px' }}>
            {probSec?.lede || 'Entrepreneurs historically had to maintain separate subscriptions for business planning, CRM, pitch decks, cap-table tracking, and mentor discovery. GrowUps fuses these into one synchronized lifecycle engine.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {probSec?.cards?.map((c) => (
              <div key={c.title} className="glass-panel" style={{ padding: '24px', background: '#0f172a', border: '1px solid #1e293b' }}>
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

      {/* 3. 5-YEAR HISTORY TIMELINE (2022 - 2026 STRICTLY CAPPED AT 5 YEARS) */}
      <section style={{ padding: '90px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge-stage" style={{ marginBottom: '12px' }}>5-Year History (2022 – 2026)</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              {timelineSec?.title || 'Our 5-Year Evolution & Milestones'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6 }}>
              {timelineSec?.lede || 'A chronological view of how GrowUps grew from an AI ideation copilot into the global startup growth ecosystem.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(timelineSec?.timelineEvents || [
              { year: '2022', title: 'Genesis & Core AI Validator', desc: 'Launched the first 8-dimension heuristic idea validation engine for early-stage university founders in Bengaluru.', metric: '500+ Ideas Validated' },
              { year: '2023', title: 'Business Model & PRD Generator', desc: 'Expanded into interactive 9-box Lean Canvas and automated PRD specification generators for SaaS builders.', metric: '2,400+ Active Founders' },
              { year: '2024', title: 'CRM, Finance & Investor Data Room', desc: 'Integrated full sales CRM pipeline, unit economics simulator, and 20-point due-diligence data rooms.', metric: '₹4.2 Cr Tracked MRR' },
              { year: '2025', title: 'Mentor & Business Services Marketplaces', desc: 'Launched verified mentor advisory with Razorpay checkout and milestone escrow for agency development.', metric: '180+ Verified Mentors' },
              { year: '2026', title: 'The Unified 25-Module Ecosystem', desc: 'Connected all 25 modules into a seamless reactive platform supporting multi-role access from idea to scale.', metric: '14,000+ Global Ventures' }
            ]).map((ev, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '22px', background: '#090d16', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1, minWidth: '280px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#22c55e', fontFamily: 'var(--font-heading)', width: '60px' }}>
                    {ev.year}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '0 0 4px' }}>
                      {ev.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4, margin: 0 }}>
                      {ev.desc}
                    </p>
                  </div>
                </div>
                {ev.metric && (
                  <span style={{ fontSize: '0.78rem', background: '#1e293b', color: '#60a5fa', padding: '6px 14px', borderRadius: '8px', fontWeight: 700 }}>
                    {ev.metric}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GLOBAL SCALE & FINAL CTA */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 28px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
            {impactSec?.title || 'Empowering Builders Across 40+ Countries'}
          </h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
            {impactSec?.lede || 'From solo engineers in tier-2 hubs to venture-backed startups scaling Series A, GrowUps is the operational cockpit for the next generation of builders.'}
          </p>
          <button onClick={onOpenDashboard} className="btn-primary" style={{ padding: '14px 32px' }}>
            Grow My Startup <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
