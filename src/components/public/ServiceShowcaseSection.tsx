import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  tagColor: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  targetPage: string;
  targetModule: number;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'ai_copilot',
    title: 'AI Startup Copilot & PRD Architect',
    badge: 'Build & Architecture',
    tagColor: '#22c55e',
    description: 'Transform complex user requirements into structured engineering specifications, MoSCoW-prioritized user stories, and interactive architecture blueprints.',
    highlights: ['Automated PRD document generation', 'Sprint Kanban synchronization with Module 8', 'Technical stack and cloud cost blueprint'],
    imageSrc: '/images/services/ai_copilot.jpg',
    targetPage: 'build',
    targetModule: 7
  },
  {
    id: 'finance_model',
    title: 'Automated Financial Modeling & Runway Simulator',
    badge: 'Revenue & Economics',
    tagColor: '#3b82f6',
    description: 'Simulate conservative, base, and aggressive hiring scenarios. Calculate live CAC payback, LTV, net burn rate, and runway extensions synchronized directly with closed CRM deals.',
    highlights: ['Real-time Monthly Recurring Revenue (MRR) tracking', 'Dynamic 18-month cash runway simulator', 'Unit economics and CAC payback optimization'],
    imageSrc: '/images/services/finance_model.jpg',
    targetPage: 'grow',
    targetModule: 12
  },
  {
    id: 'investor_dataroom',
    title: 'Investor Matchmaking & Virtual Due Diligence Room',
    badge: 'Funding & Capital',
    tagColor: '#a855f7',
    description: 'Assemble an institutional 20-point investor data room covering cap table distribution, incorporation contracts, and pitch deck preview slides ready for angel syndicates and VCs.',
    highlights: ['20-point due-diligence audit checklist', '13-slide institutional pitch deck builder', 'Discovery directory of 500+ verified investors'],
    imageSrc: '/images/services/investor_dataroom.jpg',
    targetPage: 'funding',
    targetModule: 13
  },
  {
    id: 'mentorship_escrow',
    title: 'Verified Mentorship & Milestone Escrow Workspace',
    badge: 'Ecosystem & Trust',
    tagColor: '#eab308',
    description: 'Book 1:1 video advisory sessions with vetted serial founders. Hire certified legal, GST, and development agencies with 100% milestone escrow protection via Razorpay.',
    highlights: ['Encrypted 1:1 WebRTC video advisory rooms', 'Razorpay PCI-DSS milestone escrow protection', 'Verified practitioner credentials with zero risk'],
    imageSrc: '/images/services/mentorship_escrow.jpg',
    targetPage: 'network',
    targetModule: 17
  }
];

interface ServiceShowcaseSectionProps {
  onOpenDashboard: (moduleId?: number) => void;
  setActivePublicPage: (page: string) => void;
}

export const ServiceShowcaseSection: React.FC<ServiceShowcaseSectionProps> = ({
  onOpenDashboard,
  setActivePublicPage
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll / auto-cycle every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const active = SERVICES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  return (
    <section
      style={{
        padding: '90px 0',
        background: 'linear-gradient(180deg, #090d16 0%, #0c1220 50%, #090d16 100%)',
        borderTop: '1px solid #1e293b',
        borderBottom: '1px solid #1e293b',
        position: 'relative'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', marginBottom: '12px' }}>
              <Sparkles size={14} color="#22c55e" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Platform Showcase & Explanations
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: 0, lineHeight: 1.15 }}>
              How GrowUps Powers Your Entire Startup Journey
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', marginTop: '10px', maxWidth: '640px', lineHeight: 1.6 }}>
              Explore our core platform modules in action. Automatic carousel updates every few seconds — hover to pause.
            </p>
          </div>

          {/* Controls & Slide Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrev}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              aria-label="Previous service"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              aria-label="Next service"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Pill Tabs for Quick Navigation */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '28px' }}>
          {SERVICES.map((s, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: isSelected ? `1px solid ${s.tagColor}` : '1px solid #1e293b',
                  background: isSelected ? 'rgba(255, 255, 255, 0.08)' : '#090d16',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.tagColor }} />
                <span>{s.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Card */}
        <div
          className="glass-panel"
          style={{
            background: 'radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.08) 0%, #0f172a 70%)',
            border: '1px solid #1e293b',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Left Text & Highlights */}
          <div style={{ padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: active.tagColor,
                letterSpacing: '0.05em',
                marginBottom: '10px',
                display: 'inline-block'
              }}
            >
              {active.badge}
            </span>

            <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '0 0 16px', lineHeight: 1.2 }}>
              {active.title}
            </h3>

            <p style={{ fontSize: '0.925rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '24px' }}>
              {active.description}
            </p>

            {/* Key Service Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {active.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={16} color={active.tagColor} style={{ flexShrink: 0 }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setActivePublicPage(active.targetPage);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                Learn More About {active.badge.split('&')[0]} <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onOpenDashboard(active.targetModule)}
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              >
                Launch in Workspace
              </button>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div
            style={{
              background: '#090d16',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              borderLeft: '1px solid #1e293b',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src={active.imageSrc}
              alt={active.title}
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'cover',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(34, 197, 94, 0.15)',
                transition: 'transform 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Auto-Scroll Indicator Bars */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          {SERVICES.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: i === currentIndex ? '36px' : '10px',
                height: '5px',
                borderRadius: '9999px',
                background: i === currentIndex ? '#22c55e' : '#1e293b',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              title={`Jump to service ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
