import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Scale, Shield, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GrowUpsLogo } from '../common/GrowUpsLogo';

interface PublicFooterProps {
  setActivePublicPage: (page: string) => void;
  onOpenDashboard: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ setActivePublicPage, onOpenDashboard }) => {
  const { openSignUp } = useAuth();
  const navigateTo = (page: string) => {
    setActivePublicPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#070b14', color: 'rgba(255, 255, 255, 0.7)', padding: '60px 0 30px', borderTop: '1px solid #1e293b', fontSize: '14px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '14px' }}>
              <GrowUpsLogo size={32} showBadge={true} />
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
              The unified AI startup growth ecosystem connecting idea validation, business planning, PRD building, CRM, and capital readiness.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '0.78rem', fontWeight: 600 }}>
              <ShieldCheck size={16} /> 100% Milestone Escrow & KYC Protected
            </div>
          </div>

          {/* Platform Stages */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              Platform Stages
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <button onClick={() => navigateTo('build')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                  Build (Validation & PRD)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('grow')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                  Grow (Marketing & CRM)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('funding')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                  Funding (Decks & VCs)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('network')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                  Network (Mentors & Talent)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('learn')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                  Learn (Academy & Playbooks)
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Company */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              Ecosystem & Company
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <button onClick={() => navigateTo('about')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                  About Us (Our 5-Year Journey)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ai')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                  AI Virtual Team Architecture
                </button>
              </li>

              <li>
                <button onClick={onOpenDashboard} style={{ background: 'none', border: 'none', color: '#38bdf8', fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                  Launch Founder Workspace
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              Legal & Trust
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <button onClick={() => navigateTo('privacy')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('security')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Security & Architecture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('refunds')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Refund & Escrow Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('disclaimer')} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, fontSize: '0.85rem', textAlign: 'left' }}>
                  Advisory & Risk Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              Get Started
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>
              Ready to validate your startup idea or prepare your investor data room?
            </p>
            <button
              onClick={() => openSignUp()}
              className="btn-primary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem' }}
            >
              Grow My Startup <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Journey Strip */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-heading)' }}>
            © 2026 GrowUps Inc. All rights reserved. Registered under DPDP & Global Startup Governance.
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Idea</span>
            <span style={{ color: '#6366f1' }}>&rarr;</span>
            <span>Validate</span>
            <span style={{ color: '#6366f1' }}>&rarr;</span>
            <span>Plan</span>
            <span style={{ color: '#6366f1' }}>&rarr;</span>
            <span>Build</span>
            <span style={{ color: '#6366f1' }}>&rarr;</span>
            <span>Launch</span>
            <span style={{ color: '#6366f1' }}>&rarr;</span>
            <span>Acquire</span>
            <span style={{ color: '#6366f1' }}>&rarr;</span>
            <span>Raise</span>
            <span style={{ color: '#6366f1' }}>&rarr;</span>
            <span>Scale</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
