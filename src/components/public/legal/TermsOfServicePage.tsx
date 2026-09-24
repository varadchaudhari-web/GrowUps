import React from 'react';
import { FileText, Shield, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Scale, Users, Ban, DollarSign, HelpCircle } from 'lucide-react';

interface TermsOfServicePageProps {
  onBackToHome: () => void;
  onOpenDashboard: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onBackToHome, onOpenDashboard }) => {
  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Header */}
      <section style={{ padding: '70px 0 50px', background: 'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <button
            onClick={onBackToHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#60a5fa',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              marginBottom: '16px',
              padding: 0
            }}
          >
            <ArrowLeft size={15} /> Back to Home
          </button>

          <span className="tag-badge b">Legal & Governance</span>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '0 0 12px' }}>
            Terms of Service & Platform Agreement
          </h1>
          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            Last Updated: September 2026 | Binding Agreement for Founders, Mentors, Investors, and Service Providers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Key Guarantees Ribbon */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Scale size={18} color="#3b82f6" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Fair Business Terms</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Transparent terms without predatory equity clauses or non-competes on founder intellectual property.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Users size={18} color="#22c55e" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Multi-Persona Access</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Structured access controls tailored for founders, mentors, corporate accelerators, and accredited investors.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <DollarSign size={18} color="#a855f7" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Escrow Milestone Protection</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Payments for service providers and mentors are held in verified escrow until deliverable approval.
            </p>
          </div>
        </div>

        {/* Clause 1: Acceptance */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            1. Acceptance of Platform Terms
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            By creating an account, accessing our 25-module ecosystem, or engaging with our AI Startup Advisor, you agree to comply with these Terms of Service. If you are accepting these terms on behalf of a company or startup entity, you represent that you possess the requisite authority to bind that legal entity.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            GrowUps reserves the right to update these terms to reflect feature additions, regulatory adjustments (including DPDP Act compliance), and payment gateway revisions.
          </p>
        </div>

        {/* Clause 2: Founder Intellectual Property */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            2. Intellectual Property Rights & Ownership
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '16px' }}>
            We adhere to a strict founder-first principle regarding intellectual property:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Your Content:</strong> All pitch decks, financial models, PRDs, user stories, cap tables, and code snippets generated or uploaded by you remain 100% your exclusive property.</li>
            <li><strong>No Equity Claim:</strong> Use of GrowUps software or AI generation tools does not confer any equity ownership, advisory shares, or royal rights to GrowUps Inc.</li>
            <li><strong>Platform IP:</strong> The GrowUps UI, 3D interactive visualizations, proprietary module architectures, and algorithmic scoring engines are protected under international copyright and trade secret laws.</li>
          </ul>
        </div>

        {/* Clause 3: Acceptable Use */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            3. Acceptable Use Policy & Prohibitions
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '16px' }}>
            To maintain high ecosystem integrity for investors, founders, and mentors, you agree NOT to:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', gap: '10px' }}>
              <Ban size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '4px' }}>Fraudulent Representations</div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Fabricating startup revenue, falsifying KYC identities, or presenting unauthorized cap table data to investors.</p>
              </div>
            </div>
            <div style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', gap: '10px' }}>
              <Ban size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '4px' }}>Automated Scraping</div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Using unauthorized bots or web crawlers to harvest mentor contact details, investor portfolios, or job board listings.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clause 4: Payments and Fees */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            4. Payments, Escrow & Marketplace Transactions
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            All financial transactions conducted via the Mentor Marketplace (M17), Professional Business Services (M18), or Platform Subscriptions are processed through Razorpay PCI-DSS certified gateways.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            Funds committed for professional services are held securely in milestone escrow and disbursed only upon explicit founder sign-off on deliverable completion or following arbitration under our Escrow Resolution Guidelines.
          </p>
        </div>

        {/* Clause 5: Limitation of Liability */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            5. Limitation of Liability
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            GrowUps provides AI-assisted analytical tools, document templates, and directory connections for informational and operational acceleration. We do not guarantee startup funding success, investment returns, or commercial outcomes.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>
            To the maximum extent permitted by applicable law, GrowUps shall not be liable for any indirect, incidental, or consequential business damages arising from platform usage.
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            Have questions regarding these terms? Email legal counsel at <strong>legal@growups.ai</strong>
          </p>
          <button onClick={onOpenDashboard} className="btn-primary" style={{ padding: '12px 28px' }}>
            Accept & Launch Workspace <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
