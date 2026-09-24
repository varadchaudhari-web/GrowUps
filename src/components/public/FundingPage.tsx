import React from 'react';
import { useCMS, CMSCard } from '../../context/CMSContext';
import { ArrowRight, CheckCircle2, Presentation, Search, ShieldCheck, DollarSign, Gift, PieChart } from 'lucide-react';
import { CoinScene } from '../common/Scenes3D';
import { resolveLucideIcon } from '../../utils/iconResolver';

interface FundingPageProps {
  onCardClick: (card: CMSCard) => void;
  onOpenDashboard: (moduleId?: number) => void;
}

export const FundingPage: React.FC<FundingPageProps> = ({ onCardClick, onOpenDashboard }) => {
  const { getSection } = useCMS();
  const heroSec = getSection('funding.hero') || getSection('home.funding');
  const readinessSec = getSection('funding.readiness') || getSection('home.funding');
  const ctaSec = getSection('funding.cta');

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: '80px 0 60px', background: 'radial-gradient(circle at 70% 30%, rgba(124, 58, 237, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '640px' }}>
            <span className={`tag-badge ${heroSec?.tagColor || 'p'}`}>{heroSec?.tag || 'Funding Suite'}</span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, color: '#ffffff', margin: '0 0 18px', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              {heroSec?.title || 'Institutional Funding Readiness & Investor Match.'}
            </h1>
            <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
              {heroSec?.lede || 'Assemble your investor data room, build an institutional 13-slide pitch deck, and discover 500+ VCs and $300k+ in cloud grants.'}
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button onClick={() => onOpenDashboard(13)} className="btn-primary">
                {heroSec?.ctaText || 'Audit Due Diligence'} <ArrowRight size={15} />
              </button>
              <button onClick={() => onOpenDashboard(14)} className="btn-secondary">
                Build 13-Slide Pitch Deck
              </button>
            </div>
          </div>
          <CoinScene />
        </div>
      </section>

      {/* 2. DUE DILIGENCE DATA ROOM & CAP TABLE */}
      <section style={{ padding: '90px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge-stage" style={{ marginBottom: '12px' }}>{readinessSec?.tag || 'Due Diligence Shield'}</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              {readinessSec?.title || 'The 20-Point Investor Data Room'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6 }}>
              {readinessSec?.lede || 'Institutional investors perform strict due diligence. GrowUps organizes your corporate records, cap table, and audited financials before your first partner meeting.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {(readinessSec?.cards || []).map((c) => (
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

      {/* 3. CLOUD CREDITS & DISCOVERY BANNER */}
      <section style={{ padding: '90px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)', border: '1px solid rgba(168, 85, 247, 0.4)', borderRadius: '16px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
            <div style={{ maxWidth: '600px' }}>
              <span className="tag-badge p">Partner Cloud Grants</span>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '12px 0 10px' }}>
                $300,000+ in Pre-Approved Cloud Credits
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                GrowUps founders receive direct access to AWS Activate ($100k), Google Cloud for Startups ($200k), Stripe processing waiver credits, and Microsoft Azure grants.
              </p>
            </div>
            <button onClick={() => onOpenDashboard(16)} className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
              Claim Cloud Credits <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 28px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
            {ctaSec?.title || 'Step into Your Investor Meetings with 100% Confidence'}
          </h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
            {ctaSec?.lede || 'Build your pitch deck, organize your data room, and match with verified investors.'}
          </p>
          <button onClick={() => onOpenDashboard(13)} className="btn-primary" style={{ padding: '14px 32px' }}>
            {ctaSec?.ctaText || 'Grow My Startup'} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
