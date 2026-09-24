import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Palette, Sparkles, Copy, Check, CheckCircle2, RefreshCw, Globe, MessageSquare, ArrowRight } from 'lucide-react';

export const Module09BrandingStudio: React.FC = () => {
  const { brandIdentity, generateBranding, startupData, setActiveModuleId } = useApp();
  const [nameIdea, setNameIdea] = useState(startupData.name);
  const [industryIdea, setIndustryIdea] = useState(startupData.industry);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      generateBranding(nameIdea, industryIdea);
      setIsGenerating(false);
    }, 600);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 9</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Visual & Verbal Identity</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            AI Branding Studio
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Create memorable startup names, taglines, logo concepts, color systems, and social marketing launch assets.
          </p>
        </div>

        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={nameIdea}
            onChange={(e) => setNameIdea(e.target.value)}
            placeholder="Brand Concept / Name..."
            className="input-field"
            style={{ width: '220px', padding: '8px 12px', fontSize: '0.825rem' }}
          />
          <button type="submit" className="btn-ai" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />} AI Generate Kit
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Brand Names & Domain Checks */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Globe size={18} color="#60a5fa" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>AI Name Brainstormer & Domain Status</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {brandIdentity.brandNames.map((item, idx) => (
              <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>{item.rationale}</div>
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: item.domainAvailable ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: item.domainAvailable ? '#4ade80' : '#f87171'
                  }}
                >
                  {item.domainAvailable ? '.com Available' : 'Taken'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Logo Concept & Brand Colors */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Palette size={18} color="#a855f7" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Brand Color Palette & Tokens</h2>
          </div>

          {/* Color Tokens Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {brandIdentity.colorPalette.map((col, idx) => (
              <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: col.hex, flexShrink: 0, boxShadow: `0 0 10px ${col.hex}40` }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>{col.name}</div>
                  <button
                    onClick={() => copyToClipboard(col.hex)}
                    style={{ background: 'transparent', border: 'none', color: '#60a5fa', fontSize: '0.725rem', fontFamily: 'monospace', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                  >
                    {col.hex} {copiedHex === col.hex ? <Check size={11} color="#22c55e" /> : <Copy size={11} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Logo Visualizer Mock */}
          <div style={{ background: '#090d16', border: '1px dashed #334155', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 10px', borderRadius: '12px', background: 'linear-gradient(135deg, #22c55e 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '1.3rem', boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}>
              {startupData.name.charAt(0)}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>{startupData.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>{brandIdentity.taglines[0]}</div>
          </div>
        </div>
      </div>

      {/* Brand Voice & Social Media Templates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Brand Voice */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
            Brand Voice & Communication Guidelines
          </h2>

          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 700 }}>Core Tone:</div>
            <div style={{ fontSize: '0.85rem', color: '#f8fafc', marginTop: '2px' }}>{brandIdentity.brandVoice.tone}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} color="#4ade80" /> Do:
              </div>
              <ul style={{ paddingLeft: '14px', fontSize: '0.72rem', color: '#cbd5e1' }}>
                {brandIdentity.brandVoice.doList.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f87171', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={13} color="#f87171" /> Avoid:
              </div>
              <ul style={{ paddingLeft: '14px', fontSize: '0.72rem', color: '#cbd5e1' }}>
                {brandIdentity.brandVoice.dontList.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Templates */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <MessageSquare size={18} color="#22c55e" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Social Launch Copy Templates</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {brandIdentity.socialTemplates.map((tpl, idx) => (
              <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa' }}>{tpl.platform} Launch Post</span>
                  <button onClick={() => copyToClipboard(tpl.templateText)} className="btn-secondary" style={{ padding: '3px 8px', fontSize: '0.7rem' }}>
                    <Copy size={11} /> Copy
                  </button>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#e2e8f0', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                  {tpl.templateText}
                </p>
                <div style={{ fontSize: '0.7rem', color: '#a855f7', marginTop: '6px' }}>
                  {tpl.hashtags.join(' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
