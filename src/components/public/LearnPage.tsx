import React from 'react';
import { useCMS, CMSCard } from '../../context/CMSContext';
import { ArrowRight, GraduationCap, MessageSquare, Building2, BookOpen, Award, Sparkles } from 'lucide-react';
import { resolveLucideIcon } from '../../utils/iconResolver';

interface LearnPageProps {
  onCardClick: (card: CMSCard) => void;
  onOpenDashboard: (moduleId?: number) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ onCardClick, onOpenDashboard }) => {
  const { getSection } = useCMS();
  const heroSec = getSection('learn.hero') || getSection('home.learn');
  const tracksSec = getSection('learn.tracks') || getSection('home.learn');
  const ctaSec = getSection('learn.cta');

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: '80px 0 60px', background: 'radial-gradient(circle at 70% 30%, rgba(37, 99, 235, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className={`tag-badge ${heroSec?.tagColor || 'b'}`}>{heroSec?.tag || 'Learn Suite'}</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, color: '#ffffff', margin: '0 0 18px', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
            {heroSec?.title || 'Practitioner Playbooks & Founder Masterclasses.'}
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px', maxWidth: '640px' }}>
            {heroSec?.lede || 'Learn how Tier-1 venture founders raise capital, close B2B enterprise deals, and architect zero-downtime products.'}
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => onOpenDashboard(21)} className="btn-primary">
              {heroSec?.ctaText || 'Open Learning Academy'} <ArrowRight size={15} />
            </button>
            <button onClick={() => onOpenDashboard(22)} className="btn-secondary">
              Join Founder Community
            </button>
          </div>
        </div>
      </section>

      {/* 2. 9 MASTERCLASS TRACKS */}
      <section style={{ padding: '90px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge-stage" style={{ marginBottom: '12px' }}>{tracksSec?.tag || 'Curriculum'}</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              {tracksSec?.title || 'Comprehensive Founder Curricula'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6 }}>
              {tracksSec?.lede || 'Bite-sized video lessons paired with downloadable legal contracts, financial spreadsheets, and actionable checklists.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
            {[
              { track: 'Fundraising & Term Sheets', lessons: '8 Lessons', desc: 'Valuation mechanics, SAFE contracts, term sheets, and investor pitching.' },
              { track: 'Product Management & PRDs', lessons: '6 Lessons', desc: 'PRD drafting, user discovery interviews, and zero-to-one MVP scoping.' },
              { track: 'Outbound B2B Sales Execution', lessons: '10 Lessons', desc: 'Cold email copywriting, pipeline stages, and enterprise contract closing.' },
              { track: 'Growth & AARRR Funnels', lessons: '7 Lessons', desc: 'AARRR funnels, SEO keyword clusters, and high-velocity experiments.' },
              { track: 'Startup Financial Modeling', lessons: '5 Lessons', desc: 'Runway modeling, unit economics, CAC/LTV payback, and cash burn control.' },
              { track: 'Legal Incorporation & Compliance', lessons: '6 Lessons', desc: 'Pvt Ltd incorporation, GST filings, IP assignment, and SHA negotiations.' }
            ].map((tr, i) => (
              <div key={i} className="glass-panel" style={{ padding: '22px', background: '#0f172a', border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.725rem', color: '#60a5fa', fontWeight: 700 }}>{tr.lessons}</span>
                  <Award size={14} color="#22c55e" />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                  {tr.track}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                  {tr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VERIFIED CERTIFICATES */}
      <section style={{ padding: '80px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <span className="tag-badge b">Verifiable Credentials</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: '10px 0 6px', fontFamily: 'var(--font-heading)' }}>
                Verifiable Startup Academy Certificates
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0, maxWidth: '600px' }}>
                Showcase proof of mastery in due diligence, financial modeling, and venture capital mechanics to co-founders and investors.
              </p>
            </div>
            <button onClick={() => onOpenDashboard(21)} className="btn-primary" style={{ fontSize: '0.85rem' }}>
              Explore Masterclasses <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 28px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
            {ctaSec?.title || 'Build Your Startup Wisdom With Top Practitioners'}
          </h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
            {ctaSec?.lede || 'Access field-tested playbooks, templates, and active founder community forums.'}
          </p>
          <button onClick={() => onOpenDashboard(21)} className="btn-primary" style={{ padding: '14px 32px' }}>
            {ctaSec?.ctaText || 'Grow My Startup'} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
