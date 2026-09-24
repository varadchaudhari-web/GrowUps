import React from 'react';
import { Shield, Lock, Eye, CheckCircle2, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onOpenDashboard: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome, onOpenDashboard }) => {
  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Header */}
      <section style={{ padding: '70px 0 50px', background: 'radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
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

          <span className="tag-badge g">Legal & Compliance</span>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '0 0 12px' }}>
            Privacy & Data Protection Policy
          </h1>
          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            Effective Date: September 2026 | Compliant with Digital Personal Data Protection (DPDP) Act & Global Privacy Standards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Key Guarantees Ribbon */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Lock size={18} color="#22c55e" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>100% Founder IP</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Your business models, PRDs, financial spreadsheets, and codebases remain 100% your proprietary property.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Eye size={18} color="#3b82f6" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>No AI Model Training</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Your confidential pitch decks and business plans are never used to train public foundation LLMs.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Shield size={18} color="#a855f7" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Encrypted Payments</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              All banking and card transactions are tokenized via Razorpay PCI-DSS Level 1 compliant infrastructure.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            1. Information We Collect
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '16px' }}>
            GrowUps collects information necessary to deliver personalized AI guidance, investor matching, and workspace execution:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Account Information:</strong> Name, professional email, role, avatar, and contact details.</li>
            <li><strong>Startup Profile Data:</strong> Industry, stage, business model, team hierarchy, and traction metrics.</li>
            <li><strong>Workspace & Strategy Artifacts:</strong> User stories, Lean Canvas entries, PRD requirements, and CRM leads.</li>
            <li><strong>Transactional Data:</strong> Razorpay payment identifiers, escrow milestone confirmations, and subscription receipts.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            2. How Your Data Is Processed
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            We process your information strictly to provide context to the AI Advisor, synchronize tasks across the 25 platform modules, and facilitate verified mentor and service transactions.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            We do not sell, rent, or monetize your startup data to third-party advertisers or data brokers.
          </p>
        </div>

        {/* Section 3 */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            3. Data Retention & Deletion Rights
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '16px' }}>
            Under applicable data protection laws, founders have complete control over their uploaded and generated data:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', marginBottom: '4px' }}>Right to Export</div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Download all generated PRDs, pitch decks, and financial models in standard PDF/DOCX formats.</p>
            </div>
            <div style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '4px' }}>Right to Erasure</div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Permanently purge your account, data room documents, and activity history with one click.</p>
            </div>
          </div>
        </div>

        {/* Bottom Contact */}
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            Questions regarding our privacy framework? Contact our Data Governance Team at <strong>privacy@growups.ai</strong>
          </p>
          <button onClick={onOpenDashboard} className="btn-primary" style={{ padding: '12px 28px' }}>
            Open Protected Workspace <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
