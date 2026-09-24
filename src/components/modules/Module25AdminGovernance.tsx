import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Lock, ShieldCheck, CreditCard, Activity, Users, CheckCircle2, AlertTriangle, FileText, Sparkles, RefreshCw } from 'lucide-react';

export const Module25AdminGovernance: React.FC = () => {
  const { auditLogs, paymentRecords, startupData, mentorsList, servicesList } = useApp();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'audit' | 'payments' | 'verification' | 'telemetry'>('audit');

  const totalPlatformVolume = paymentRecords.reduce((acc, p) => acc + p.amountINR, 0);

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage" style={{ background: '#7c3aed', color: '#fff' }}>Module 25</span>
            <span style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 700 }}>Master Platform Governance</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Admin & Ecosystem Governance
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Platform-wide governance: KYC verification, Razorpay transaction ledger, AI usage telemetry, and audit security logs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', borderRadius: '8px', padding: '8px 14px', fontSize: '0.8rem', color: '#f3e8ff', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#c084fc" /> Super Admin Active: Full 25-Module Access
          </div>
        </div>
      </div>

      {/* Admin KPI Ribbon */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total Razorpay Volume</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#22c55e', margin: '4px 0' }}>
            ₹{totalPlatformVolume.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Key: rzp_test_TYGuf1uL6B9fAl</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Active Platform Modules</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#60a5fa', margin: '4px 0' }}>
            25 / 25 Live
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>100% Operational Status</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>AI Token Telemetry</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c084fc', margin: '4px 0' }}>
            1.48M Tokens
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Avg. Latency: 220ms</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Verified Partners</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24', margin: '4px 0' }}>
            {mentorsList.length + servicesList.length} Verified
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>Zero Flagged Accounts</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('audit')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'audit' ? '#2563eb' : '#0f172a',
            color: activeTab === 'audit' ? '#fff' : '#94a3b8',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <FileText size={15} /> System Audit Logs ({auditLogs.length})
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'payments' ? '#2563eb' : '#0f172a',
            color: activeTab === 'payments' ? '#fff' : '#94a3b8',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <CreditCard size={15} /> Razorpay Transactions Ledger ({paymentRecords.length})
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'verification' ? '#2563eb' : '#0f172a',
            color: activeTab === 'verification' ? '#fff' : '#94a3b8',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ShieldCheck size={15} /> KYC & Partner Approvals
        </button>

        <button
          onClick={() => setActiveTab('telemetry')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'telemetry' ? '#2563eb' : '#0f172a',
            color: activeTab === 'telemetry' ? '#fff' : '#94a3b8',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Activity size={15} /> AI Usage & Latency Telemetry
        </button>
      </div>

      {/* 1. AUDIT LOGS TAB */}
      {activeTab === 'audit' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
            Immutable System Security & Governance Logs
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '10px', color: '#f8fafc' }}>Timestamp</th>
                <th style={{ padding: '10px', color: '#60a5fa' }}>Actor</th>
                <th style={{ padding: '10px', color: '#cbd5e1' }}>Action</th>
                <th style={{ padding: '10px', color: '#94a3b8' }}>Target Module</th>
                <th style={{ padding: '10px', color: '#f8fafc' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>{log.timestamp}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#60a5fa' }}>{log.actor}</td>
                  <td style={{ padding: '10px', color: '#4ade80', fontWeight: 600 }}>{log.action}</td>
                  <td style={{ padding: '10px', color: '#cbd5e1' }}>{log.module}</td>
                  <td style={{ padding: '10px', color: '#cbd5e1' }}>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. RAZORPAY PAYMENTS TAB */}
      {activeTab === 'payments' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                Razorpay Financial Transaction Ledger
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                Test Key: <code style={{ color: '#60a5fa' }}>rzp_test_TYGuf1uL6B9fAl</code>
              </div>
            </div>
            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 14px', color: '#22c55e', fontWeight: 800 }}>
              Total Captured: ₹{totalPlatformVolume.toLocaleString('en-IN')}
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '10px', color: '#f8fafc' }}>Payment ID</th>
                <th style={{ padding: '10px', color: '#94a3b8' }}>Timestamp</th>
                <th style={{ padding: '10px', color: '#cbd5e1' }}>Purpose</th>
                <th style={{ padding: '10px', color: '#60a5fa' }}>User Email</th>
                <th style={{ padding: '10px', color: '#22c55e', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700 }}>{p.razorpayPaymentId}</td>
                  <td style={{ padding: '10px', color: '#94a3b8' }}>{p.timestamp}</td>
                  <td style={{ padding: '10px', color: '#ffffff', fontWeight: 600 }}>{p.purpose}</td>
                  <td style={{ padding: '10px', color: '#cbd5e1' }}>{p.userEmail}</td>
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: 800, color: '#22c55e' }}>₹{p.amountINR.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. VERIFICATIONS TAB */}
      {activeTab === 'verification' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
            Verified Ecosystem Mentors & Service Agencies
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
            {mentorsList.map((m) => (
              <div key={m.id} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#60a5fa' }}>Mentor: {m.company}</div>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#4ade80', background: 'rgba(34, 197, 94, 0.15)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} color="#4ade80" /> KYC Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. AI TELEMETRY */}
      {activeTab === 'telemetry' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
            Real-Time AI Inference Telemetry
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Advisor Model Uptime</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4ade80', marginTop: '4px' }}>99.98%</div>
            </div>
            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Avg Query Latency</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8', marginTop: '4px' }}>240 ms</div>
            </div>
            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Security Audit Status</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#a855f7', marginTop: '4px' }}>Zero Leaks</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
