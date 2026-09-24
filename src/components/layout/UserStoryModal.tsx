import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PERSONA_STORIES, ALL_25_MODULES } from '../../types/userStory';
import { X, Users, BookOpen, Layers, CheckCircle2, Shield, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';

export const UserStoryModal: React.FC = () => {
  const { showUserStoryModal, setShowUserStoryModal, switchRole, currentRole } = useAuth();
  const [selectedPersonaTab, setSelectedPersonaTab] = useState<UserRole>(currentRole);
  const [activeViewMode, setActiveViewMode] = useState<'personas' | 'matrix' | 'sync'>('personas');

  if (!showUserStoryModal) return null;

  const activePersona = PERSONA_STORIES.find(p => p.role === selectedPersonaTab) || PERSONA_STORIES[0];

  return (
    <div className="modal-overlay" onClick={() => setShowUserStoryModal(false)}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '30px',
          position: 'relative',
          background: '#090d16',
          border: '1px solid #1e293b'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setShowUserStoryModal(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#94a3b8',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', marginBottom: '8px' }}>
            <Sparkles size={14} color="#4ade80" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase' }}>
              Platform Architecture & User Flow Guide
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
            User Personas, 25 Modules & Synchronization Map
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Explore how each of the 7 User Roles maps to the 25 modules, including workflows and Admin master governance.
          </p>
        </div>

        {/* Top View Selector */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '14px' }}>
          <button
            onClick={() => setActiveViewMode('personas')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeViewMode === 'personas' ? '#2563eb' : '#0f172a',
              color: activeViewMode === 'personas' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={16} /> 7 User Personas & Workflows
          </button>
          <button
            onClick={() => setActiveViewMode('matrix')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeViewMode === 'matrix' ? '#2563eb' : '#0f172a',
              color: activeViewMode === 'matrix' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Layers size={16} /> 25-Module Access Matrix
          </button>
          <button
            onClick={() => setActiveViewMode('sync')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeViewMode === 'sync' ? '#2563eb' : '#0f172a',
              color: activeViewMode === 'sync' ? '#ffffff' : '#94a3b8',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Zap size={16} /> Inter-Module Data Synchronization
          </button>
        </div>

        {/* 1. PERSONAS TAB */}
        {activeViewMode === 'personas' && (
          <div>
            {/* Persona Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {PERSONA_STORIES.map(p => (
                <button
                  key={p.role}
                  onClick={() => setSelectedPersonaTab(p.role)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: selectedPersonaTab === p.role ? '1px solid #3b82f6' : '1px solid #1e293b',
                    background: selectedPersonaTab === p.role ? 'rgba(37, 99, 235, 0.25)' : '#0f172a',
                    color: selectedPersonaTab === p.role ? '#60a5fa' : '#94a3b8',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <img src={p.avatar} alt="" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                  {p.title}
                </button>
              ))}
            </div>

            {/* Selected Persona Detail Box */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img src={activePersona.avatar} alt="" style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #2563eb' }} />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{activePersona.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                      <span className="badge-stage">{activePersona.badge}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Default Stage: <strong style={{ color: '#22c55e' }}>{activePersona.defaultStage}</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    switchRole(activePersona.role);
                    setShowUserStoryModal(false);
                  }}
                  className="btn-primary"
                >
                  Switch to this Persona <ArrowRight size={14} />
                </button>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '20px' }}>
                {activePersona.summary}
              </p>

              {/* Workflows */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Standard Journey & Workflow:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {activePersona.primaryWorkflow.map((step, idx) => (
                    <div key={idx} style={{ background: '#1e293b', padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#f1f5f9' }}>
                      <span style={{ background: '#2563eb', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>
                        {idx + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessible Modules */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Accessible Modules ({activePersona.keyModules.length} of 25):
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activePersona.keyModules.map(modId => {
                    const mod = ALL_25_MODULES.find(m => m.id === modId);
                    return (
                      <span
                        key={modId}
                        style={{
                          background: '#090d16',
                          border: '1px solid #334155',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          color: '#e2e8f0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckCircle2 size={12} color="#22c55e" /> {mod?.title || `Module ${modId}`}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ACCESS MATRIX TAB */}
        {activeViewMode === 'matrix' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
                  <th style={{ padding: '10px', color: '#f8fafc' }}>Module (# & Title)</th>
                  <th style={{ padding: '10px', color: '#94a3b8' }}>Category</th>
                  <th style={{ padding: '10px', color: '#60a5fa' }}>Allowed Roles</th>
                  <th style={{ padding: '10px', color: '#a855f7' }}>Super Admin</th>
                </tr>
              </thead>
              <tbody>
                {ALL_25_MODULES.map((m, idx) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #1e293b', background: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'transparent' }}>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#f1f5f9' }}>
                      {m.title}
                    </td>
                    <td style={{ padding: '10px', color: '#94a3b8' }}>
                      <span style={{ background: '#1e293b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>
                        {m.category}
                      </span>
                    </td>
                    <td style={{ padding: '10px', color: '#cbd5e1' }}>
                      {m.rolesAllowed.map(r => r.replace('_', ' ')).join(', ')}
                    </td>
                    <td style={{ padding: '10px', color: '#4ade80', fontWeight: 700 }}>
                      <CheckCircle2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                      Full Access
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. SYNCHRONIZATION TAB */}
        {activeViewMode === 'sync' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
              Real-Time Cross-Module Reactive Data Pipeline
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
              Every action taken inside one module automatically updates downstream modules across the ecosystem:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #22c55e' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>1. Startup Profile & Stage ➔ Advisor & Strategy</h4>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                  Changing the startup stage (e.g., Idea ➔ MVP ➔ Revenue) alters the AI Advisor's recommendations, prioritization heuristics, and due diligence benchmarks.
                </p>
              </div>

              <div style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>2. Idea Validator ➔ Business Model & Business Plan</h4>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                  Validating an idea in Module 3 extracts the problem, customer persona, and monetization channels to automatically populate the 9-box Lean Canvas (Module 5) and 12-section Business Plan (Module 6).
                </p>
              </div>

              <div style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #a855f7' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>3. MVP User Stories ➔ Workspace Kanban Board</h4>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                  Creating and prioritizing user stories in Module 7 (MVP Builder) synchronizes directly to Sprint Tasks in Module 8 (Workspace Kanban) with 1-click execution.
                </p>
              </div>

              <div style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #eab308' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>4. CRM Deals (Won) ➔ Startup Finance MRR & Runway</h4>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                  Marking a lead as 'Won' in Module 11 (CRM) automatically amortizes the contract value into the Monthly Recurring Revenue (MRR), recalculates gross margin, and extends runway months in Module 12 (Finance).
                </p>
              </div>

              <div style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #ec4899' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>5. Razorpay Payments ➔ Admin Financial Ledger & Telemetry</h4>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                  All Razorpay transactions (Mentor bookings, service agency escrows, academy certifications) register live in Module 25 (Admin Master Governance) audit logs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
