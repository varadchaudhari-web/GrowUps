import React from 'react';
import { useCMS, CMSCard } from '../../context/CMSContext';
import { ArrowRight, Compass, Puzzle, Handshake, ShieldCheck, Star, Users } from 'lucide-react';
import { OrbitScene } from '../common/Scenes3D';
import { resolveLucideIcon } from '../../utils/iconResolver';

interface NetworkPageProps {
  onCardClick: (card: CMSCard) => void;
  onOpenDashboard: (moduleId?: number) => void;
}

export const NetworkPage: React.FC<NetworkPageProps> = ({ onCardClick, onOpenDashboard }) => {
  const { getSection } = useCMS();
  const heroSec = getSection('network.hero') || getSection('home.network');
  const cardsSec = getSection('network.cards') || getSection('home.network');
  const ctaSec = getSection('network.cta');

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: '80px 0 60px', background: 'radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '640px' }}>
            <span className={`tag-badge ${heroSec?.tagColor || 'g'}`}>{heroSec?.tag || 'Network Suite'}</span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, color: '#ffffff', margin: '0 0 18px', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              {heroSec?.title || 'Mentors, Verified Agencies & Co-Founders.'}
            </h1>
            <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
              {heroSec?.lede || 'Book 1:1 advisory sessions, hire pre-vetted agencies with Razorpay escrow milestones, and partner with technical co-founders.'}
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button onClick={() => onOpenDashboard(17)} className="btn-primary">
                {heroSec?.ctaText || 'Browse Mentors'} <ArrowRight size={15} />
              </button>
              <button onClick={() => onOpenDashboard(18)} className="btn-secondary">
                Hire Agency Services
              </button>
            </div>
          </div>
          <OrbitScene />
        </div>
      </section>

      {/* 2. MENTOR & BUSINESS SERVICES CARDS */}
      <section style={{ padding: '90px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge-stage" style={{ marginBottom: '12px' }}>{cardsSec?.tag || 'Verified Human Intelligence'}</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              {cardsSec?.title || 'The People Behind High-Velocity Startups'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6 }}>
              {cardsSec?.lede || 'Connect with vetted operators, legal counsels, fullstack studios, and technical leaders who have scaled companies before.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {(cardsSec?.cards || []).map((c) => (
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

      {/* 3. MILESTONE ESCROW BADGE */}
      <section style={{ padding: '80px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={26} color="#22c55e" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 4px', fontFamily: 'var(--font-heading)' }}>
                  100% Milestone Escrow Protection
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                  Funds for dev agencies and legal counsel remain in audited escrow until you approve final deliverables.
                </p>
              </div>
            </div>
            <button onClick={() => onOpenDashboard(18)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
              View Escrow Guarantee
            </button>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 28px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
            {ctaSec?.title || 'Build Your Startup With World-Class Support'}
          </h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
            {ctaSec?.lede || 'Find co-founders, book mentor advisory sessions, and hire verified agencies.'}
          </p>
          <button onClick={() => onOpenDashboard(17)} className="btn-primary" style={{ padding: '14px 32px' }}>
            {ctaSec?.ctaText || 'Grow My Startup'} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
