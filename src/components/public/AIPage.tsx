import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, Bot, Sparkles, ShieldCheck, Cpu, Code, BarChart3, Users2, DollarSign, Presentation } from 'lucide-react';

interface AIPageProps {
  onOpenDashboard: (moduleId?: number) => void;
}

export const AIPage: React.FC<AIPageProps> = ({ onOpenDashboard }) => {
  const { getSection } = useCMS();
  const heroSec = getSection('ai.hero') || getSection('home.ai');
  const agentsSec = getSection('ai.agents') || getSection('home.ai');
  const ctaSec = getSection('ai.cta');

  const agents = [
    { name: 'Founder Copilot', role: 'Strategic Coordinator', desc: 'Synthesizes founder goals, prioritizes weekly tasks, and monitors cross-module health.', icon: Bot, color: '#2563eb' },
    { name: 'Idea Validator Agent', role: 'Heuristic Evaluator', desc: 'Audits problem clarity, existing alternatives, market signals, and customer willingness-to-pay.', icon: Sparkles, color: '#22c55e' },
    { name: 'Market Research Agent', role: 'Data & Competitor Intelligence', desc: 'Computes TAM/SAM/SOM sizing and constructs competitor radar matrices from live data.', icon: BarChart3, color: '#7c3aed' },
    { name: 'Product & PRD Agent', role: 'Engineering Spec Writer', desc: 'Translates requirements into user stories, MoSCoW prioritization, and architectural cost blueprints.', icon: Cpu, color: '#38bdf8' },
    { name: 'Growth & Marketing Agent', role: 'Experiment Engine', desc: 'Designs AARRR acquisition experiments, SEO keyword clusters, and social launch content.', icon: Users2, color: '#fbbf24' },
    { name: 'Sales CRM Agent', role: 'Outbound Drafter', desc: 'Generates hyper-personalized B2B follow-up emails and tracks deal stage probabilities.', icon: Code, color: '#f87171' },
    { name: 'Finance Agent', role: 'Scenario Modeler', desc: 'Simulates runway months, unit economics (MRR/ARR/CAC/LTV), and cash burn thresholds.', icon: DollarSign, color: '#4ade80' },
    { name: 'Funding Agent', role: 'Investor Packager', desc: 'Organizes 20-point due-diligence data rooms and constructs 13-slide institutional pitch decks.', icon: Presentation, color: '#c084fc' }
  ];

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: '80px 0 60px', background: 'radial-gradient(circle at 70% 30%, rgba(124, 58, 237, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className={`tag-badge ${heroSec?.tagColor || 'p'}`}>{heroSec?.tag || 'AI Agent Ecosystem'}</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, color: '#ffffff', margin: '0 0 18px', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
            {heroSec?.title || 'Your Virtual Startup Team Working Alongside You.'}
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px', maxWidth: '640px' }}>
            {heroSec?.lede || '8 specialist AI agents coordinated by Founder Copilot. You retain complete human approval before anything runs.'}
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => onOpenDashboard(2)} className="btn-ai">
              <Bot size={16} /> Consult AI Advisor (Module 2)
            </button>
            <button onClick={() => onOpenDashboard(24)} className="btn-secondary">
              View AI Business Review
            </button>
          </div>
        </div>
      </section>

      {/* 2. 8 SPECIALIST AGENTS GRID */}
      <section style={{ padding: '90px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge-stage" style={{ marginBottom: '12px' }}>{agentsSec?.tag || 'Virtual Specialists'}</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              {agentsSec?.title || 'Autonomous Domain Specialists'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6 }}>
              {agentsSec?.lede || 'Each agent is trained on verified startup domain heuristics, keeping assumptions strictly separated from ground-truth data.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {agents.map((ag) => {
              const IconComp = ag.icon;
              return (
                <div key={ag.name} className="glass-panel" style={{ padding: '24px', background: '#0f172a', border: '1px solid #1e293b' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${ag.color}20`, border: `1px solid ${ag.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: ag.color }}>
                    <IconComp size={20} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: ag.color, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {ag.role}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                    {ag.name}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    {ag.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HUMAN APPROVAL / SAFETY BOUNDARY */}
      <section style={{ padding: '90px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#22c55e' }}>
              <ShieldCheck size={28} />
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              Human In The Loop. Always.
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
              No marketing campaign is deployed, no investor email is sent, and no money leaves escrow without your explicit founder confirmation. GrowUps AI suggests — you decide.
            </p>
            <button onClick={() => onOpenDashboard(2)} className="btn-ai" style={{ padding: '12px 28px' }}>
              <Bot size={16} /> Test Run AI Advisor (Module 2)
            </button>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 28px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
            {ctaSec?.title || 'Experience Autonomous Startup Intelligence'}
          </h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
            {ctaSec?.lede || 'Put specialist AI agents to work on your venture.'}
          </p>
          <button onClick={() => onOpenDashboard(2)} className="btn-primary" style={{ padding: '14px 32px' }}>
            {ctaSec?.ctaText || 'Grow My Startup'} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
