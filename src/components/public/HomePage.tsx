import React, { useEffect, useRef } from 'react';
import { useCMS, CMSCard } from '../../context/CMSContext';
import { ArrowRight, Sparkles, CheckCircle2, FlaskConical, FileText, Wrench, Megaphone, BarChart3, Wallet, Presentation, Search, Compass, Puzzle, Handshake, GraduationCap, MessageSquare, Building2 } from 'lucide-react';
import { LayerScene, BarScene, CoinScene, OrbitScene } from '../common/Scenes3D';
import { resolveLucideIcon } from '../../utils/iconResolver';
import { ServiceShowcaseSection } from './ServiceShowcaseSection';

const STAGES = ['Idea', 'Validate', 'Plan', 'Build', 'Launch', 'Acquire', 'Raise', 'Scale'];

interface HomePageProps {
  onCardClick: (card: CMSCard) => void;
  onOpenDashboard: () => void;
  setActivePublicPage: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCardClick, onOpenDashboard, setActivePublicPage }) => {
  const { getSection } = useCMS();

  const heroSec = getSection('home.hero');
  const buildSec = getSection('home.build');
  const growSec = getSection('home.grow');
  const fundingSec = getSection('home.funding');
  const networkSec = getSection('home.network');
  const learnSec = getSection('home.learn');
  const aiSec = getSection('home.ai');
  const ecoSec = getSection('home.ecosystem');

  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);

  // Journey: scroll-linked SVG path fill + stage highlight, independent of hero
  useEffect(() => {
    const wrap = journeyRef.current;
    const fillPath = fillPathRef.current;
    if (!wrap || !fillPath) return;

    const LEN = 1040;
    fillPath.style.strokeDasharray = String(LEN);
    fillPath.style.strokeDashoffset = String(LEN);

    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      let progress = (vh * 0.8 - r.top) / (r.height + vh * 0.4);
      progress = Math.max(0, Math.min(1, progress));
      fillPath.style.strokeDashoffset = String(LEN * (1 - progress));
      const activeCount = Math.round(progress * (STAGES.length - 1));

      wrap.querySelectorAll<HTMLElement>('.stagedot').forEach(d => {
        const idx = Number(d.dataset.i);
        if (idx <= activeCount) {
          d.style.fill = '#22c55e';
          d.style.stroke = '#22c55e';
        } else {
          d.style.fill = '#0f172a';
          d.style.stroke = '#334156';
        }
      });

      wrap.querySelectorAll<HTMLElement>('.stagelabel').forEach(l => {
        const idx = Number(l.dataset.i);
        l.style.fill = idx <= activeCount ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero: ambient cursor-reactive constellation canvas & 3D tilt
  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!hero || !canvas || !ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.offsetWidth;
      H = hero.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };

    type Node = { label: string; baseX: number; baseY: number; x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];
    const layout = () => {
      nodes = STAGES.map((label, i) => {
        const t = i / (STAGES.length - 1);
        const baseX = 0.08 * W + t * 0.84 * W;
        const baseY = H * 0.38 + Math.sin(t * Math.PI * 1.25) * H * 0.07;
        return { label, baseX, baseY, x: baseX, y: baseY, vx: 0, vy: 0 };
      });
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: W / 2, y: H / 2, active: false };
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
      const px = mouse.x / W - 0.5;
      const py = mouse.y / H - 0.5;
      if (heroInnerRef.current) {
        heroInnerRef.current.style.transform = `perspective(900px) rotateY(${px * 3}deg) rotateX(${-py * 3}deg)`;
      }
    };
    const onLeave = () => {
      mouse.active = false;
      if (heroInnerRef.current) {
        heroInnerRef.current.style.transform = 'none';
      }
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);

    const colors = ['#22C55E', '#2563EB', '#7C3AED'];
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      nodes.forEach((n, i) => (i === 0 ? ctx.moveTo(n.x, n.y) : ctx.lineTo(n.x, n.y)));
      ctx.strokeStyle = 'rgba(148,163,184,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      nodes.forEach((n, i) => {
        let tx = n.baseX, ty = n.baseY;
        if (mouse.active) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 150) {
            const f = ((150 - dist) / 150) * 20;
            tx += (dx / dist) * f;
            ty += (dy / dist) * f;
          }
        }
        n.vx += (tx - n.x) * 0.02;
        n.vy += (ty - n.y) * 0.02;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;

        const c = colors[i % 3];
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.shadowColor = c;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "600 12.5px 'Space Grotesk', sans-serif";
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - 16);
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div style={{ background: '#090d16', color: '#f8fafc' }}>
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '100px 0 60px',
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box'
        }}
      >
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', maxWidth: '100vw' }} />
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2, width: '100%', boxSizing: 'border-box' }}>
          <div ref={heroInnerRef} style={{ transition: 'transform 0.15s ease-out' }}>
            {/* Top Stage Tag & Main Heading */}
            <div style={{
              color: '#a7f3d0',
              fontSize: 'clamp(11px, 2.6vw, 13.5px)',
              marginBottom: '14px',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(34, 197, 94, 0.1)',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              maxWidth: '100%',
              flexWrap: 'wrap',
              lineHeight: 1.4,
              boxSizing: 'border-box'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
              <span>{heroSec?.tag || 'Idea → Validate → Plan → Build → Launch → Acquire → Raise → Scale'}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(26px, 5.5vw, 62px)',
              lineHeight: 1.1,
              maxWidth: '820px',
              margin: '0 0 16px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}>
              Every stage of building a startup,{' '}
              <span style={{ background: 'linear-gradient(90deg, #22c55e, #2563eb 55%, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                one connected system.
              </span>
            </h1>

            {/* Bottom Row: Left lightweight indicator + Right Corner CTA Card (No overlap with 3D nodes) */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '24px',
              marginTop: '56px'
            }}>
              {/* Left Live Indicator */}
              <div style={{
                maxWidth: '340px',
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e', flexShrink: 0 }} />
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  <strong style={{ color: '#ffffff', display: 'block' }}>25 Modules Synchronized</strong>
                  Single journey from Idea to Scale.
                </div>
              </div>

              {/* Bottom Right Corner Glassmorphic Card (Text + CTA) */}
              <div style={{
                maxWidth: '520px',
                marginLeft: 'auto',
                background: 'rgba(15, 23, 42, 0.82)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '24px 28px',
                boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.7), 0 0 24px rgba(34, 197, 94, 0.08)'
              }}>
                <p style={{
                  fontSize: '16.5px',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0'
                }}>
                  {heroSec?.lede || 'GrowUps replaces the ten scattered tools founders juggle — validation, planning, mentors, funding prep, and growth — with a single AI-powered path from idea to scale.'}
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setActivePublicPage('build'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="btn-primary"
                    style={{ padding: '12px 22px', fontSize: '0.925rem' }}
                  >
                    Start with an idea <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => { setActivePublicPage('ai'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="btn-ghost"
                    style={{ padding: '12px 20px', fontSize: '0.925rem' }}
                  >
                    Meet the AI team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div style={{ position: 'absolute', bottom: '26px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, color: 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)' }}>
          <span>Scroll the journey</span>
          <div style={{ width: '1px', height: '34px', background: 'linear-gradient(rgba(255,255,255,0.7), transparent)' }} />
        </div>
      </section>

      {/* 2. JOURNEY STRIP (SCROLL-LINKED SVG FILL) */}
      <section ref={journeyRef} style={{ background: '#0f172a', padding: '10px 0 80px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <svg viewBox="0 0 1120 160" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <defs>
              <linearGradient id="gradline" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="55%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <path d="M40,80 L1080,80" fill="none" stroke="#233047" strokeWidth="2" />
            <path ref={fillPathRef} d="M40,80 L1080,80" fill="none" stroke="url(#gradline)" strokeWidth="2" strokeLinecap="round" />
            {STAGES.map((s, i) => {
              const x = 40 + i * (1040 / (STAGES.length - 1));
              return (
                <React.Fragment key={s}>
                  <circle className="stagedot" data-i={i} cx={x} cy={80} r={7} style={{ fill: '#0f172a', stroke: '#334156', strokeWidth: 2, transition: 'all 0.3s' }} />
                  <text className="stagelabel" data-i={i} x={x} y={i % 2 === 0 ? 60 : 112} textAnchor="middle" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fill: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
                    {s}
                  </text>
                </React.Fragment>
              );
            })}
          </svg>
        </div>
      </section>

      {/* AUTO-SCROLLING PLATFORM SERVICE SHOWCASE (WITH EXPLANATIONS) */}
      <ServiceShowcaseSection
        onOpenDashboard={onOpenDashboard}
        setActivePublicPage={setActivePublicPage}
      />

      {/* 3. BUILD SECTION */}
      <section style={{ padding: '96px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge g">Build</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', margin: '0 0 14px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                {buildSec?.title || 'Turn a raw idea into a fundable, buildable startup.'}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.6, margin: 0 }}>
                {buildSec?.lede || 'Validate assumptions before you spend, then draft the business model, plan, product requirements, and brand — with evidence and assumptions kept clearly separate.'}
              </p>
            </div>
            <LayerScene />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {buildSec?.cards?.map((c) => (
              <div
                key={c.title}
                onClick={() => onCardClick(c)}
                className="public-card"
              >
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

      {/* 4. GROW SECTION */}
      <section style={{ padding: '96px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge b">Grow</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', margin: '0 0 14px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                {growSec?.title || 'Run marketing, sales and finance in one workspace.'}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.6, margin: 0 }}>
                {growSec?.lede || 'Plan campaigns, manage the pipeline from lead to close, and track burn and runway side by side with a live founder dashboard.'}
              </p>
            </div>
            <BarScene />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {growSec?.cards?.map((c) => (
              <div
                key={c.title}
                onClick={() => onCardClick(c)}
                className="public-card"
                style={{ background: '#090d16' }}
              >
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

      {/* 5. FUNDING SECTION */}
      <section style={{ padding: '96px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge p">Funding</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', margin: '0 0 14px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                {fundingSec?.title || 'Get investor-ready without promises of investment.'}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.6, margin: 0 }}>
                {fundingSec?.lede || 'A readiness checklist, an organized data room, and an AI-drafted pitch deck — plus discovery of investors, accelerators, and programs that fit your stage.'}
              </p>
            </div>
            <CoinScene />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {fundingSec?.cards?.map((c) => (
              <div
                key={c.title}
                onClick={() => onCardClick(c)}
                className="public-card"
              >
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

      {/* 6. NETWORK SECTION */}
      <section style={{ padding: '96px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge g">Network</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', margin: '0 0 14px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                {networkSec?.title || "The people your startup can't build without."}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.6, margin: 0 }}>
                {networkSec?.lede || 'Verified mentors, service providers, co-founders and talent — matched to your stage and role needs. You stay in control of every decision.'}
              </p>
            </div>
            <OrbitScene />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {networkSec?.cards?.map((c) => (
              <div
                key={c.title}
                onClick={() => onCardClick(c)}
                className="public-card"
                style={{ background: '#090d16' }}
              >
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

      {/* 7. LEARN SECTION */}
      <section style={{ padding: '96px 0', background: '#090d16' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge b">Learn</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', margin: '0 0 14px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            {learnSec?.title || 'A founder academy built around your stage.'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '640px' }}>
            {learnSec?.lede || 'Courses, playbooks, templates and case studies across entrepreneurship, product, sales, marketing, fundraising and leadership — plus a founder community to test ideas in.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {learnSec?.cards?.map((c) => (
              <div
                key={c.title}
                onClick={() => onCardClick(c)}
                className="public-card"
              >
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

      {/* 8. AI VIRTUAL TEAM SECTION */}
      <section style={{ padding: '96px 0', background: '#0f172a' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 28px' }}>
          <span className="tag-badge p">AI Virtual Team</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', margin: '0 0 14px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            {aiSec?.title || 'A virtual startup team, working alongside you.'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.6, marginBottom: '28px', maxWidth: '680px' }}>
            {aiSec?.lede || 'Founder Copilot coordinates specialist agents for research, product, technology, marketing, sales, finance and funding — every action passes through you before it runs.'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontFamily: 'var(--font-heading)', fontSize: '14px', color: '#c084fc', fontWeight: 600, gap: '6px' }}>
            {(aiSec?.workflowSteps || ['Founder Goal', 'Research', 'Strategy', 'Tasks', 'Human Approval', 'Execution', 'Metrics', 'Review']).map((step, i, arr) => (
              <React.Fragment key={step}>
                <span style={{ padding: '8px 16px', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.12)', color: '#f3e8ff' }}>
                  {step}
                </span>
                {i < arr.length - 1 && <span style={{ color: '#7c3aed', padding: '0 2px' }}>➔</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ECOSYSTEM STATS & FINAL CTA */}
      <section style={{ padding: '96px 0', background: 'linear-gradient(180deg, #090d16 0%, #0f172a 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 28px' }}>
          <span className="badge-stage" style={{ marginBottom: '16px' }}>
            GrowUps Ecosystem
          </span>

          <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
            {ecoSec?.title || 'Ready to build, fund, and scale your venture?'}
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
            {ecoSec?.lede || 'Join 14,000+ founders moving through the GrowUps unified startup ecosystem.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActivePublicPage('funding'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              Grow My Startup <ArrowRight size={18} />
            </button>
            <button
              onClick={onOpenDashboard}
              className="btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              Launch Live Workspace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
