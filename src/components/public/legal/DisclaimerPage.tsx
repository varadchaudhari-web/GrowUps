import React from 'react';
import { AlertTriangle, Scale, ShieldAlert, Cpu, Info, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

interface DisclaimerPageProps {
  onBackToHome: () => void;
  onOpenDashboard: () => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onBackToHome, onOpenDashboard }) => {
  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Header */}
      <section style={{ padding: '70px 0 50px', background: 'radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <button
            onClick={onBackToHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f87171',
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

          <span className="tag-badge r">Regulatory & Risk Notice</span>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '0 0 12px' }}>
            Advisory, Investment & Legal Disclaimers
          </h1>
          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            Important disclosures regarding AI-generated strategic insights, non-broker-dealer status, and startup venture risk.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Core Disclaimer Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Cpu size={18} color="#f87171" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>AI Advisory Scope</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              AI models provide generative business templates and should not substitute licensed legal, tax, or certified financial advice.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Scale size={18} color="#fbbf24" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Not a Broker-Dealer</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              GrowUps does not execute securities transactions, underwrite rounds, or act as a registered investment broker.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldAlert size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Venture Capital Risk</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Early-stage startups carry high financial risk. Historical benchmarks do not guarantee future commercial viability.
            </p>
          </div>
        </div>

        {/* Section 1: Non-Broker-Dealer Status */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            1. Investor Matching & Non-Broker-Dealer Disclosure
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            GrowUps operates as a software-as-a-service platform providing startup readiness tools, data rooms, and network directories. GrowUps is NOT a registered broker-dealer, investment adviser, or crowdfunding portal under SEBI, SEC, or FCA regulations.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>
            Listing your pitch deck on Module 14 or Module 15 does not constitute a public solicitation or offer of securities. All fundraising discussions, term sheet negotiations, and equity transactions occur directly between accredited investors and founders outside of our automated software layers.
          </p>
        </div>

        {/* Section 2: AI Generated Outputs */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            2. AI Guidance & Financial Projections
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            All financial projections, CAC estimations, TAM/SAM/SOM models, and Lean Canvas outputs generated in Module 2, Module 4, and Module 12 are algorithmic estimates based on historical startup benchmarks.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>
            They are intended solely for strategic modeling and scenario planning. Founders are advised to engage qualified chartered accountants and legal practitioners for formal auditing and statutory filings.
          </p>
        </div>

        {/* Section 3: Third-Party Mentors & Service Providers */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            3. Independent Professional Service Providers
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            Mentors (M17) and service providers (M18) on GrowUps are independent contractors and not employees or agents of GrowUps Inc. While we enforce KYC verification and escrow milestone protection, GrowUps does not warrant or guarantee individual legal opinions, patent approvals, or code quality produced by external freelancers.
          </p>
        </div>

        {/* Bottom Contact */}
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            For governance or compliance inquiries, please write to <strong>compliance@growups.ai</strong>
          </p>
          <button onClick={onOpenDashboard} className="btn-primary" style={{ padding: '12px 28px' }}>
            Continue to Founder Workspace <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
