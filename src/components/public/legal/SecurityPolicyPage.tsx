import React from 'react';
import { ShieldCheck, Lock, Server, Key, EyeOff, CheckCircle2, ArrowLeft, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

interface SecurityPolicyPageProps {
  onBackToHome: () => void;
  onOpenDashboard: () => void;
}

export const SecurityPolicyPage: React.FC<SecurityPolicyPageProps> = ({ onBackToHome, onOpenDashboard }) => {
  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Header */}
      <section style={{ padding: '70px 0 50px', background: 'radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <button
            onClick={onBackToHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#a855f7',
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

          <span className="tag-badge p">Enterprise Grade</span>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '0 0 12px' }}>
            Security, Privacy & Infrastructure Architecture
          </h1>
          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            Defense-in-depth security engineered for sensitive startup pitch decks, investor data rooms, and financial ledgers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Security Matrix Ribbon */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Lock size={18} color="#a855f7" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>AES-256 & TLS 1.3</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              All founder documents and cap table data encrypted at rest (AES-256) and in transit (TLS 1.3).
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldCheck size={18} color="#22c55e" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Zero-Knowledge AI Rooms</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              AI Advisor inferences are sandboxed and never leak prompt context across startup tenant workspaces.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Server size={18} color="#3b82f6" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>PCI-DSS Level 1</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Razorpay tokenized checkout with zero local storage of credit card or banking credentials.
            </p>
          </div>
        </div>

        {/* Section 1: Data Encryption Architecture */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            1. Data Encryption & Storage Sovereignty
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '16px' }}>
            GrowUps implements layered cryptographic safeguards across every tier of the platform:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Encrypted Data Rooms:</strong> Pitch decks and cap table documents in Module 13 & 14 are stored in isolated virtual compartments with unique symmetric access keys.</li>
            <li><strong>Granular Role-Based Access (RBAC):</strong> Multi-persona segregation prevents unauthorized cross-visibility between founders, mentors, and corporate incubators.</li>
            <li><strong>Database Snapshots:</strong> Encrypted automated hourly snapshots with multi-region backup redundancy.</li>
          </ul>
        </div>

        {/* Section 2: AI Privacy & Sandbox Boundary */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            2. AI Privacy & Model Sandboxing
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            When using the 9 AI Specialist Agents (Architect, Growth Hacker, Financial Modeler, Legal Specialist, etc.):
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80', marginBottom: '4px' }}>Stateless API Inferences</div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Prompts are ephemeral and processed in runtime memory without retention in third-party training corpuses.</p>
            </div>
            <div style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '4px' }}>Strict Tenant Isolation</div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Competitor startups within the same industry sector cannot access each other's custom AI prompts or strategic playbooks.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Vulnerability Disclosure & Bug Bounty */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            3. Responsible Vulnerability Disclosure
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            GrowUps welcomes responsible reports from independent security researchers. We adhere to a 48-hour SLA for triaging critical security vulnerabilities.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>
            To submit a security advisory or vulnerability disclosure, please encrypt your report using our public PGP key and email <strong>security@growups.ai</strong>.
          </p>
        </div>

        {/* Bottom Contact */}
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            Explore our audited security controls in the Founder Workspace.
          </p>
          <button onClick={onOpenDashboard} className="btn-primary" style={{ padding: '12px 28px' }}>
            Launch Secure Workspace <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
