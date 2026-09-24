import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PERSONA_STORIES, ALL_25_MODULES } from '../../types/userStory';
import { X, Users, BookOpen, Layers, CheckCircle2, ArrowRight, Zap, Sparkles, FileText } from 'lucide-react';
import { UserRole } from '../../types';

const MODULE_REFERENCE: Record<number, { purpose: string; importance: string; prdSection: string }> = {
  1:  { purpose: 'Captures founder identity, startup details, team size, stage, traction, and funding status', importance: "Acts as the single source of truth that personalises all 24 other modules for the founder's specific context", prdSection: 'Section 2 › Module 1' },
  2:  { purpose: 'Conversational AI that answers any startup question — strategy, pricing, MVP scope, customer acquisition', importance: 'Replaces expensive consultants with instant, stage-aware startup guidance available 24/7', prdSection: 'Section 2 › Module 2' },
  3:  { purpose: 'Systematically evaluates a business idea across problem clarity, market signals, competition, and monetization', importance: 'Prevents founders from wasting months on non-viable ideas by surfacing evidence and uncertainties upfront', prdSection: 'Section 2 › Module 3' },
  4:  { purpose: 'Deep-dives into industry sizing, customer personas, competitor landscape, pricing, and SWOT analysis', importance: 'Eliminates costly external market research agencies — founders get investor-grade data in minutes', prdSection: 'Section 2 › Module 4' },
  5:  { purpose: 'Converts a raw idea into a structured 9-box Lean Canvas covering customers, value prop, revenue, and costs', importance: 'Turns abstract ideas into a concrete business blueprint that can be shared with co-founders and investors', prdSection: 'Section 2 › Module 5' },
  6:  { purpose: 'Auto-generates a full 12-section investor-grade business plan with export to PDF, DOCX, and shareable link', importance: 'Saves 40–80 hours of manual business plan writing and ensures nothing critical is missed', prdSection: 'Section 2 › Module 6' },
  7:  { purpose: 'Translates business ideas into product requirements, user stories, MVP scope, tech stack, and a development roadmap', importance: 'Bridges the gap between business vision and engineering execution — essential before any development begins', prdSection: 'Section 2 › Module 7' },
  8:  { purpose: 'Full Kanban project workspace with tasks, milestones, team members, deadlines, and AI weekly summaries', importance: 'Keeps the entire founding team aligned on priorities without needing separate tools like Notion or Jira', prdSection: 'Section 2 › Module 8' },
  9:  { purpose: 'Generates brand names, taglines, logo concepts, brand colors, voice, and social media templates using AI', importance: 'Gives early-stage startups a professional brand identity without hiring an expensive design agency', prdSection: 'Section 2 › Module 9' },
  10: { purpose: 'Creates marketing strategies, content calendars, email campaigns, SEO plans, lead generation, and growth experiments', importance: "Systematises customer acquisition so founders don't rely on guesswork or random social media posts", prdSection: 'Section 2 › Module 10' },
  11: { purpose: 'Full CRM pipeline — leads, contacts, deal stages, follow-ups, proposals, and sales analytics with AI insights', importance: 'Tracks every sales conversation so no deal is lost due to forgotten follow-ups or unmanaged pipelines', prdSection: 'Section 2 › Module 11' },
  12: { purpose: 'Tracks revenue, expenses, burn rate, runway, cash flow, MRR, ARR, CAC, LTV, and financial forecasts', importance: 'Gives founders real-time financial health visibility — critical for fundraising conversations and survival planning', prdSection: 'Section 2 › Module 12' },
  13: { purpose: 'Prepares startups for fundraising with a readiness checklist, virtual investor data room, and due-diligence organiser', importance: 'Dramatically reduces time-to-fundraise by ensuring all investor materials are complete and professionally organised', prdSection: 'Section 2 › Module 13' },
  14: { purpose: 'AI builds a 13-slide investor pitch deck with charts, brand styling, and PDF/PPT export in minutes', importance: 'Removes the #1 friction point in fundraising — producing a compelling deck — without design or writing skills', prdSection: 'Section 2 › Module 14' },
  15: { purpose: 'Searchable database of angel investors, VCs, accelerators, and grant programs filtered by stage, industry, and geography', importance: 'Helps founders find the right capital partners efficiently instead of cold-pitching mismatched investors', prdSection: 'Section 2 › Module 15' },
  16: { purpose: 'Central hub for discovering cloud credits (AWS, GCP, Azure), incubator programs, grants, SaaS benefits, and competitions', importance: 'Unlocks thousands of dollars in free startup resources that most founders never know exist', prdSection: 'Section 2 › Module 16' },
  17: { purpose: 'Marketplace of verified mentors across 10 domains with profile pages, session booking, video calls, and escrow-backed payments', importance: 'Gives every founder access to experienced guidance, paid only when value is actually delivered', prdSection: 'Section 2 › Module 17' },
  18: { purpose: 'Marketplace for startup services — development, legal, GST, design, marketing — with escrow payment protection', importance: 'Founders can hire trusted, verified service providers without upfront payment risk or quality uncertainty', prdSection: 'Section 2 › Module 18' },
  19: { purpose: 'Matches founders with co-founders, developers, sales professionals, marketers, advisors, and freelancers by skill + stage', importance: 'Solves the hardest early-stage problem — assembling the right founding team and initial talent base', prdSection: 'Section 2 › Module 19' },
  20: { purpose: 'Job board for startup roles, internships, remote jobs, equity-based listings, and freelance projects within the ecosystem', importance: 'Builds a self-sustaining startup talent flywheel — great startups attract great people through the platform itself', prdSection: 'Section 2 › Module 20' },
  21: { purpose: 'Structured learning academy with courses, workshops, playbooks, templates, case studies, and certifications across 9 tracks', importance: 'Continuously upskills founders in every domain — product, sales, finance, fundraising — they need to master', prdSection: 'Section 2 › Module 21' },
  22: { purpose: 'Community hub with founder feed, Q&A, industry groups, local startup groups, events, webinars, and demo days', importance: 'Transforms isolated founders into a collaborative network that shares knowledge, referrals, and moral support', prdSection: 'Section 2 › Module 22' },
  23: { purpose: 'Full incubator/accelerator management — applications, cohort tracking, mentor assignment, milestones, and demo day analytics', importance: 'Enables incubators to run and scale their programs entirely on GrowUps — a powerful B2B SaaS revenue opportunity', prdSection: 'Section 2 › Module 23' },
  24: { purpose: 'Founder analytics dashboard showing revenue, customers, burn, runway, marketing, and AI-generated periodic business reviews', importance: 'Gives founders a single command centre to monitor every vital sign of their startup in real time', prdSection: 'Section 2 › Module 24' },
  25: { purpose: 'Admin governance panel — user verification, marketplace moderation, subscription management, fraud monitoring, and audit logs', importance: 'Ensures platform trust, safety, and legal compliance across all transactions, content, and user activities', prdSection: 'Section 2 › Module 25' },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Strategy & Validation': '#3b82f6',
  'Product & Build':       '#f59e0b',
  'Growth & CRM':          '#22c55e',
  'Finance & Funding':     '#a855f7',
  'Talent & Network':      '#f43f5e',
  'Ecosystem & Academy':   '#06b6d4',
  'Governance':            '#6366f1',
};

type ViewMode = 'personas' | 'matrix' | 'reference' | 'sync';

export const UserStoryModal: React.FC = () => {
  const { showUserStoryModal, setShowUserStoryModal, switchRole, currentRole } = useAuth();
  const [selectedPersonaTab, setSelectedPersonaTab] = useState<UserRole>(currentRole);
  const [activeViewMode, setActiveViewMode] = useState<ViewMode>('personas');

  if (!showUserStoryModal) return null;

  const activePersona = PERSONA_STORIES.find(p => p.role === selectedPersonaTab) || PERSONA_STORIES[0];

  const tabs: { key: ViewMode; label: string; icon: React.ReactNode }[] = [
    { key: 'personas',  label: '7 Personas & Workflows',  icon: <Users size={14} /> },
    { key: 'matrix',    label: '25-Module Access Matrix', icon: <Layers size={14} /> },
    { key: 'reference', label: 'Module Reference Guide',  icon: <FileText size={14} /> },
    { key: 'sync',      label: 'Inter-Module Sync',       icon: <Zap size={14} /> },
  ];

  const tabBtn = (key: ViewMode) => ({
    padding: '7px 14px',
    borderRadius: '8px',
    border: activeViewMode === key ? '1px solid rgba(37,99,235,0.6)' : '1px solid #1e293b',
    background: activeViewMode === key ? 'rgba(37,99,235,0.22)' : 'rgba(15,23,42,0.6)',
    color: activeViewMode === key ? '#60a5fa' : '#64748b',
    fontWeight: 600 as const,
    fontSize: '0.78rem',
    cursor: 'pointer' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '6px',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap' as const,
  });

  return (
    <div className="modal-overlay" onClick={() => setShowUserStoryModal(false)}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '960px', maxHeight: '92vh', overflowY: 'auto',
          padding: '28px 24px', position: 'relative', background: '#090d16',
          border: '1px solid #1e293b', borderRadius: '18px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Close */}
        <button
          onClick={() => setShowUserStoryModal(false)}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.06)', border: '1px solid #1e293b',
            color: '#94a3b8', borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '20px', paddingRight: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '3px 12px', borderRadius: '100px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', marginBottom: '10px' }}>
            <Sparkles size={12} color="#4ade80" />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Platform Architecture & User Flow Guide
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.6rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            User Personas, 25 Modules & Synchronization Map
          </h2>
          <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '6px' }}>
            How each of the 7 user roles maps to GrowUps' 25 modules — with purpose, importance, and PRD references.
          </p>
        </div>

        {/* Tab Bar */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '14px' }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveViewMode(tab.key)} style={tabBtn(tab.key)}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: PERSONAS ── */}
        {activeViewMode === 'personas' && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '18px' }}>
              {PERSONA_STORIES.map(p => (
                <button
                  key={p.role}
                  onClick={() => setSelectedPersonaTab(p.role)}
                  style={{
                    padding: '5px 12px', borderRadius: '8px', cursor: 'pointer',
                    border: selectedPersonaTab === p.role ? '1px solid #3b82f6' : '1px solid #1e293b',
                    background: selectedPersonaTab === p.role ? 'rgba(37,99,235,0.22)' : '#0f172a',
                    color: selectedPersonaTab === p.role ? '#60a5fa' : '#94a3b8',
                    fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  <img src={p.avatar} alt="" style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                  {p.title}
                </button>
              ))}
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={activePersona.avatar} alt="" style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #2563eb', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{activePersona.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span className="badge-stage">{activePersona.badge}</span>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Default Stage: <strong style={{ color: '#22c55e' }}>{activePersona.defaultStage}</strong></span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { switchRole(activePersona.role); setShowUserStoryModal(false); }}
                  className="btn-primary"
                  style={{ fontSize: '0.78rem', padding: '7px 14px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Switch to Persona <ArrowRight size={13} />
                </button>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '18px' }}>{activePersona.summary}</p>

              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  Standard Journey & Workflow
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '8px' }}>
                  {activePersona.primaryWorkflow.map((step, idx) => (
                    <div key={idx} style={{ background: '#1e293b', padding: '9px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#f1f5f9' }}>
                      <span style={{ background: '#2563eb', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, flexShrink: 0 }}>
                        {idx + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  Accessible Modules ({activePersona.keyModules.length} of 25)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activePersona.keyModules.map(modId => {
                    const mod = ALL_25_MODULES.find(m => m.id === modId);
                    return (
                      <span key={modId} style={{ background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '3px 9px', fontSize: '0.72rem', color: '#e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={11} color="#22c55e" />
                        {mod?.title?.replace(/Module \d+: /, '') || `Module ${modId}`}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: ACCESS MATRIX ── */}
        {activeViewMode === 'matrix' && (
          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', minWidth: '480px' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(90deg,#0f172a,#1e1b4b)' }}>
                  <th style={{ padding: '11px 14px', color: '#f8fafc', textAlign: 'left', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #334155' }}>Module</th>
                  <th style={{ padding: '11px 14px', color: '#94a3b8', textAlign: 'left', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #334155' }}>Category</th>
                  <th style={{ padding: '11px 14px', color: '#60a5fa', textAlign: 'left', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #334155' }}>Roles With Access</th>
                  <th style={{ padding: '11px 14px', color: '#a855f7', textAlign: 'center', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #334155', whiteSpace: 'nowrap' }}>Super Admin</th>
                </tr>
              </thead>
              <tbody>
                {ALL_25_MODULES.map((m, idx) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #1e293b', background: idx % 2 === 0 ? 'rgba(15,23,42,0.5)' : 'transparent' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#f1f5f9', whiteSpace: 'nowrap' }}>
                      {m.title.replace(/Module \d+: /, '')}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ background: `${CATEGORY_COLORS[m.category] || '#475569'}22`, border: `1px solid ${CATEGORY_COLORS[m.category] || '#475569'}44`, color: CATEGORY_COLORS[m.category] || '#94a3b8', padding: '2px 8px', borderRadius: '5px', fontSize: '0.68rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {m.category}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8', lineHeight: 1.5 }}>
                      {m.rolesAllowed.map(r => r.replace('_', ' ')).join(', ')}
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      <span style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} /> Full
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── TAB 3: MODULE REFERENCE GUIDE ── */}
        {activeViewMode === 'reference' && (
          <div>
            <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <BookOpen size={16} color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '3px' }}>Module Reference Guide</div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.5 }}>
                  Each row maps a GrowUps module to its exact purpose, why it matters for founders, and the corresponding section in the{' '}
                  <strong style={{ color: '#94a3b8' }}>Project Requirement Document (PRD)</strong>.
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #1e293b' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(90deg,#0f172a,#1e1b4b)' }}>
                    <th style={{ padding: '11px 14px', color: '#f8fafc', textAlign: 'left', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #334155', whiteSpace: 'nowrap' }}>Module</th>
                    <th style={{ padding: '11px 14px', color: '#60a5fa', textAlign: 'left', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #334155' }}>What It Does (Purpose)</th>
                    <th style={{ padding: '11px 14px', color: '#4ade80', textAlign: 'left', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #334155' }}>Why It Matters</th>
                    <th style={{ padding: '11px 14px', color: '#c084fc', textAlign: 'left', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #334155', whiteSpace: 'nowrap' }}>PRD Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_25_MODULES.map((m, idx) => {
                    const ref = MODULE_REFERENCE[m.id];
                    const catColor = CATEGORY_COLORS[m.category] || '#475569';
                    return (
                      <tr key={m.id} style={{ borderBottom: '1px solid #1e293b', background: idx % 2 === 0 ? 'rgba(15,23,42,0.5)' : 'transparent' }}>
                        <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.78rem', marginBottom: '5px', whiteSpace: 'nowrap' }}>
                            {m.title.replace(/Module \d+: /, '')}
                          </div>
                          <span style={{ background: `${catColor}20`, border: `1px solid ${catColor}40`, color: catColor, padding: '1px 7px', borderRadius: '4px', fontSize: '0.63rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                            {m.category}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', color: '#94a3b8', lineHeight: 1.65, verticalAlign: 'top', fontSize: '0.73rem', maxWidth: '240px' }}>
                          {ref?.purpose || '—'}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#cbd5e1', lineHeight: 1.65, verticalAlign: 'top', fontSize: '0.73rem', maxWidth: '240px' }}>
                          {ref?.importance || '—'}
                        </td>
                        <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>
                          <span style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', color: '#c084fc', padding: '3px 9px', borderRadius: '5px', fontSize: '0.66rem', fontWeight: 600, display: 'inline-block', lineHeight: 1.6, whiteSpace: 'nowrap' }}>
                            {ref?.prdSection || `Section 2 › Module ${m.id}`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 4: SYNC MAP ── */}
        {activeViewMode === 'sync' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Real-Time Cross-Module Reactive Data Pipeline
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6, marginBottom: '18px' }}>
              Every action taken inside one module automatically updates downstream modules across the ecosystem.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { color: '#22c55e', title: '1. Startup Profile & Stage → Advisor & Strategy', desc: "Changing the startup stage (Idea → MVP → Revenue) alters the AI Advisor's recommendations, prioritization heuristics, and due-diligence benchmarks across all 25 modules." },
                { color: '#3b82f6', title: '2. Idea Validator → Business Model & Business Plan', desc: 'Validating an idea in M3 extracts the problem, customer persona, and monetization channels to auto-populate the 9-box Lean Canvas (M5) and 12-section Business Plan (M6).' },
                { color: '#a855f7', title: '3. MVP User Stories → Workspace Kanban Board', desc: 'Creating and prioritizing user stories in M7 (MVP Builder) synchronizes directly to Sprint Tasks in M8 (Workspace Kanban) with one-click execution.' },
                { color: '#f59e0b', title: '4. CRM Deals Won → Finance MRR & Runway', desc: 'Marking a lead as Won in M11 (CRM) automatically amortizes contract value into Monthly Recurring Revenue, recalculates gross margin, and extends runway months in M12 (Finance).' },
                { color: '#ec4899', title: '5. Razorpay Payments → Admin Financial Ledger & Telemetry', desc: 'All transactions — mentor bookings, service escrows, academy certifications — register live in M25 (Admin Governance) audit logs for full platform transparency.' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#1e293b', padding: '14px 16px', borderRadius: '10px', borderLeft: `4px solid ${item.color}` }}>
                  <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700, marginBottom: '5px' }}>{item.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
