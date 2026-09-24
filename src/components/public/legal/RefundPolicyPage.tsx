import React from 'react';
import { RefreshCw, ShieldAlert, CheckCircle2, DollarSign, Clock, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

interface RefundPolicyPageProps {
  onBackToHome: () => void;
  onOpenDashboard: () => void;
}

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({ onBackToHome, onOpenDashboard }) => {
  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Header */}
      <section style={{ padding: '70px 0 50px', background: 'radial-gradient(circle at 70% 30%, rgba(234, 179, 8, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <button
            onClick={onBackToHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#facc15',
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

          <span className="tag-badge a">Billing & Financial Protection</span>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '0 0 12px' }}>
            Refund & Cancellation Policy
          </h1>
          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            Clear, transparent guidelines for platform subscriptions, 1:1 mentorship bookings, and service milestone escrows.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Guarantees Ribbon */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Clock size={18} color="#facc15" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>7-Day Money Back</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Unconditional 7-day refund guarantee on new Pro & Scale annual founder tier subscriptions.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <RefreshCw size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Mentorship Rescheduling</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Cancel or reschedule 1:1 mentor advisory sessions with 100% refund up to 24 hours before the call.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px', background: '#0f172a', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <DollarSign size={18} color="#22c55e" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>Milestone Escrow Safety</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Service funds are never released until you verify and approve the delivered milestones.
            </p>
          </div>
        </div>

        {/* Section 1: Subscriptions */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            1. Software Subscriptions & AI Credits
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '16px' }}>
            We want you to build with complete confidence. Here are our subscription terms:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Annual Plans:</strong> If you are not completely satisfied with GrowUps Pro or Scale plans within the first 7 days, request a 100% refund via billing@growups.ai.</li>
            <li><strong>Monthly Plans:</strong> Monthly subscriptions can be cancelled at any time from your Billing Settings and remain active until the end of your billing cycle.</li>
            <li><strong>AI Token Bundles:</strong> Unused AI generation tokens are non-refundable once activated but never expire as long as your workspace account is active.</li>
          </ul>
        </div>

        {/* Section 2: Mentorship Sessions */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            2. Mentor Marketplace (M17) Cancellation Policy
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80', marginBottom: '4px' }}>24+ Hours Advance Notice</div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Full 100% refund credited back to your original Razorpay payment method within 3–5 business days.</p>
            </div>
            <div style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '4px' }}>Under 24 Hours / No Show</div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Mentor time is reserved; 50% cancellation fee applies unless rescheduled by mutual mentor-founder agreement.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Escrow & Business Services */}
        <div className="glass-panel" style={{ padding: '32px', background: '#0f172a', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
            3. Business Services (M18) & Milestone Escrow Disputes
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' }}>
            For legal incorporation, patent drafting, accounting, or UI/UX contracts initiated through GrowUps Business Services:
          </p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>
            If a provider fails to meet agreed milestone criteria, you may flag the contract for Admin Dispute Resolution. The escrow funds remain frozen until our platform arbitrators review deliverables and issue a mutual resolution or full refund.
          </p>
        </div>

        {/* Bottom Contact */}
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            Need billing assistance? Contact our Financial Desk at <strong>billing@growups.ai</strong>
          </p>
          <button onClick={onOpenDashboard} className="btn-primary" style={{ padding: '12px 28px' }}>
            Manage Workspace Billing <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
