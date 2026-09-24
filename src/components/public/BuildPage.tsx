import React from 'react';
import { useCMS, CMSCard } from '../../context/CMSContext';
import { ArrowRight, FlaskConical, FileText, Wrench, Sparkles, CheckCircle2, Cpu, Server, Code } from 'lucide-react';
import { LayerScene } from '../common/Scenes3D';
import { resolveLucideIcon } from '../../utils/iconResolver';

interface BuildPageProps {
  onCardClick: (card: CMSCard) => void;
  onOpenDashboard: (moduleId?: number) => void;
}

export const BuildPage: React.FC<BuildPageProps> = ({ onCardClick, onOpenDashboard }) => {
  const { getSection } = useCMS();
  const heroSec = getSection('build.hero') || getSection('home.build');
  const frameworkSec = getSection('build.framework');
  const buildCardsSec = getSection('home.build');
  const ctaSec = getSection('build.cta');

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', paddingTop: '80px', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: '80px 0 60px', background: 'radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.08) 0%, #0f172a 70%)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '640px' }}>
            <span className={`tag-badge ${heroSec?.tagColor || 'g'}`}>{heroSec?.tag || 'Build Suite'}</span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, color: '#ffffff', margin: '0 0 18px', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              {heroSec?.title || 'Validate First. Plan Next. Build Fast.'}
            </h1>
            <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
              {heroSec?.lede || 'Translate raw hypotheses into evidence-backed business models, PRD requirements, and architecture blueprints.'}
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button onClick={() => onOpenDashboard(3)} className="btn-primary">
                {heroSec?.ctaText || 'Launch Idea Validator'} <ArrowRight size={15} />
              </button>
              <button onClick={() => onOpenDashboard(7)} className="btn-secondary">
                Generate MVP PRD
              </button>
            </div>
          </div>
          <LayerScene />
        </div>
      </section>

      {/* 2. 8-DIMENSION IDEA VALIDATOR BREAKDOWN */}
      <section style={{ padding: '90px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <span className="badge-stage" style={{ marginBottom: '12px' }}>{frameworkSec?.tag || 'Evidence Heuristics'}</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
              {frameworkSec?.title || 'The 8-Dimension Validation Framework'}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6 }}>
              {frameworkSec?.lede || 'Rather than an arbitrary success score, GrowUps breaks down concrete evidence, uncertainties, and real customer experiments.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {(frameworkSec?.cards || [
              { id: '1', iconName: 'CheckCircle2', tint: '#DCFCE7', title: '1. Problem Clarity', desc: 'Distinguish real economic pain from nice-to-have vitamin features.' },
              { id: '2', iconName: 'Users', tint: '#DBEAFE', title: '2. Customer Segments', desc: 'Identify precision ICPs with direct purchasing power and urgency.' },
              { id: '3', iconName: 'Search', tint: '#EDE1FC', title: '3. Existing Substitutes', desc: 'Audit current manual workarounds and incumbent software gaps.' },
              { id: '4', iconName: 'BarChart3', tint: '#DCFCE7', title: '4. Market Signals', desc: 'Quantify TAM/SAM/SOM tailwinds and macroeconomic industry growth.' },
              { id: '5', iconName: 'Shield', tint: '#DBEAFE', title: '5. Moat & Defensibility', desc: 'Network effects, data flywheel, proprietary workflow, or IP advantages.' },
              { id: '6', iconName: 'Wallet', tint: '#EDE1FC', title: '6. Monetization Viability', desc: 'Subscription, usage, marketplace take-rate, or enterprise contracts.' },
              { id: '7', iconName: 'Wrench', tint: '#DCFCE7', title: '7. Operational Complexity', desc: 'Regulatory, technical feasibility, supply chain, and talent requirements.' },
              { id: '8', iconName: 'FlaskConical', tint: '#DBEAFE', title: '8. Validation Experiments', desc: '3 actionable rapid tests to execute before writing a single line of code.' }
            ]).map((dim) => (
              <div key={dim.title} className="glass-panel" style={{ padding: '22px', background: '#0f172a', border: '1px solid #1e293b' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                  {dim.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                  {dim.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BUSINESS PLANNING & PRD SUITE CARDS */}
      <section style={{ padding: '90px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge g">Business Planning</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '14px' }}>
            From Lean Canvas to Institutional Business Plan
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6, marginBottom: '36px', maxWidth: '640px' }}>
            Seamlessly convert your validated idea into a 9-box Lean Canvas and a 12-section institutional Business Plan with 1-click PDF/DOCX export.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {buildCardsSec?.cards?.map((c) => (
              <div key={c.title} onClick={() => onCardClick(c)} className="public-card" style={{ background: '#090d16' }}>
                <div className="card-icon" style={{ background: c.tint }}>
                  {resolveLucideIcon(c.iconName, 20, '#0F172A')}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MVP PRD & ARCHITECTURE BLUEPRINT CTA */}
      <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 28px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
            {ctaSec?.title || 'Ready to Scope and Build Your v1.0 Product?'}
          </h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
            {ctaSec?.lede || 'Generate your complete PRD, prioritize user stories, and synchronize tasks directly to your sprint workspace.'}
          </p>
          <button onClick={() => onOpenDashboard(7)} className="btn-primary" style={{ padding: '14px 32px' }}>
            {ctaSec?.ctaText || 'Open MVP & Product Builder'} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
