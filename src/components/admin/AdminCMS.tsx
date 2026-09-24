import React, { useState } from 'react';
import { useCMS, CMSSection, CMSCard } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Globe,
  Eye,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Layers,
  LayoutDashboard
} from 'lucide-react';
import { resolveLucideIcon } from '../../utils/iconResolver';
import { GrowUpsLogo } from '../common/GrowUpsLogo';

interface AdminCMSProps {
  onBackToPublicSite: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({ onBackToPublicSite }) => {
  const { sections, updateSectionDraft, publishDrafts, resetToDefaults, hasUnpublishedChanges, getSectionsByPage } = useCMS();
  const { currentUser, switchRole } = useAuth();

  // Admin Access Lock
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isUnlockedLocally, setIsUnlockedLocally] = useState(currentUser?.role === 'super_admin');

  // CMS State
  const [selectedPage, setSelectedPage] = useState<CMSSection['page']>('home');
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>('home.hero');
  const [isPublishedNotice, setIsPublishedNotice] = useState(false);

  const pages: Array<{ id: CMSSection['page']; label: string }> = [
    { id: 'home', label: '1. Home Page' },
    { id: 'build', label: '2. Build Page' },
    { id: 'grow', label: '3. Grow Page' },
    { id: 'funding', label: '4. Funding Page' },
    { id: 'network', label: '5. Network Page' },
    { id: 'learn', label: '6. Learn Page' },
    { id: 'ai', label: '7. AI Virtual Team' },
    { id: 'about', label: '8. About Us' }
  ];

  const pageSections = sections.filter(s => s.page === selectedPage);
  const activeSection = sections.find(s => s.sectionKey === selectedSectionKey) || pageSections[0];

  const handleUnlockWithPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === 'GROWUPS_ADMIN_2026' || adminPasscode === 'admin' || adminPasscode === 'superadmin') {
      switchRole('super_admin');
      setIsUnlockedLocally(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid Admin Passcode. Use master code: GROWUPS_ADMIN_2026 or click 1-Click Demo Unlock below.');
    }
  };

  const handleQuickUnlockDemo = () => {
    switchRole('super_admin');
    setIsUnlockedLocally(true);
  };

  const handlePageChange = (p: CMSSection['page']) => {
    setSelectedPage(p);
    const secs = sections.filter(s => s.page === p);
    if (secs.length > 0) {
      setSelectedSectionKey(secs[0].sectionKey);
    }
  };

  const handlePublish = () => {
    publishDrafts();
    setIsPublishedNotice(true);
    setTimeout(() => setIsPublishedNotice(false), 3500);
  };

  const handleUpdateCard = (cardIdx: number, updates: Partial<CMSCard>) => {
    if (!activeSection?.cards) return;
    const newCards = [...activeSection.cards];
    newCards[cardIdx] = { ...newCards[cardIdx], ...updates };
    updateSectionDraft(activeSection.sectionKey, { cards: newCards });
  };

  const handleAddCard = () => {
    if (!activeSection) return;
    const newCard: CMSCard = {
      id: 'c_' + Date.now(),
      iconName: 'Sparkles',
      tint: '#DCFCE7',
      title: 'New Feature Card',
      desc: 'Description of the newly added startup tool or capability.'
    };
    const currentCards = activeSection.cards || [];
    updateSectionDraft(activeSection.sectionKey, { cards: [...currentCards, newCard] });
  };

  const handleDeleteCard = (cardIdx: number) => {
    if (!activeSection?.cards) return;
    const newCards = activeSection.cards.filter((_, i) => i !== cardIdx);
    updateSectionDraft(activeSection.sectionKey, { cards: newCards });
  };

  // -------------------------------------------------------------
  // 1. LOCKED SECURITY GATE (If user is not Super Admin)
  // -------------------------------------------------------------
  if (!isUnlockedLocally && currentUser?.role !== 'super_admin') {
    return (
      <div style={{ background: '#090d16', color: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div
          className="glass-panel"
          style={{
            maxWidth: '520px',
            width: '100%',
            padding: '36px',
            background: '#0f172a',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(124, 58, 237, 0.15)'
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <GrowUpsLogo size={32} showBadge={true} badgeText="Admin CMS" />
          </div>

          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(168, 85, 247, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={26} color="#c084fc" />
          </div>

          <span className="badge-stage" style={{ background: '#7c3aed', color: '#ffffff', marginBottom: '8px' }}>
            Super Admin Gate
          </span>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: '8px 0 10px' }}>
            Admin Section CMS Locked
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '22px' }}>
            The GrowUps CMS controls live headlines, feature cards, and copy across the entire public platform. Enter the admin passcode or authorize as Super Admin to continue.
          </p>

          {passcodeError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px 14px', color: '#fca5a5', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textAlign: 'left' }}>
              <ShieldAlert size={16} style={{ flexShrink: 0 }} /> {passcodeError}
            </div>
          )}

          <form onSubmit={handleUnlockWithPasscode} style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '14px' }}>
              <input
                type="password"
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                placeholder="Enter Admin Passcode (e.g. GROWUPS_ADMIN_2026)"
                className="input-field"
                style={{ textAlign: 'center', letterSpacing: '0.05em', padding: '12px' }}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '0.875rem' }}
            >
              <ShieldCheck size={16} /> Authenticate & Unlock CMS
            </button>
          </form>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              onClick={handleQuickUnlockDemo}
              style={{
                background: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                color: '#e9d5ff',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.825rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={14} color="#c084fc" /> 1-Click Super Admin Demo Unlock
            </button>

            <button
              type="button"
              onClick={onBackToPublicSite}
              style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. UNLOCKED PREMIUM CMS EDITOR
  // -------------------------------------------------------------
  return (
    <div style={{ background: '#090d16', color: '#f8fafc', minHeight: '100vh', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top Control Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <GrowUpsLogo size={28} showBadge={false} />
              <span className="badge-stage" style={{ background: '#7c3aed', color: '#ffffff' }}>Super Admin Protected</span>
              <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 600 }}>Active & Authenticated</span>
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: 0 }}>
              Live Section & Content CMS
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
              Select any public page and section below. Edit text, badges, and cards with instant draft preview and 1-click live publish.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={onBackToPublicSite} className="btn-secondary" style={{ fontSize: '0.825rem' }}>
              <Eye size={14} /> View Live Website
            </button>
            <button onClick={resetToDefaults} className="btn-secondary" style={{ fontSize: '0.825rem' }} title="Reset all sections to default copy">
              <RotateCcw size={14} /> Reset Defaults
            </button>
            <button
              onClick={handlePublish}
              className="btn-primary"
              style={{
                fontSize: '0.85rem',
                background: hasUnpublishedChanges ? '#22c55e' : '#1e293b',
                color: hasUnpublishedChanges ? '#052e16' : '#94a3b8',
                boxShadow: hasUnpublishedChanges ? '0 0 20px rgba(34, 197, 94, 0.4)' : 'none'
              }}
            >
              <Globe size={15} /> {hasUnpublishedChanges ? 'Publish All Drafts to Live Site' : 'Published (Up to Date)'}
            </button>
          </div>
        </div>

        {/* Publish Alert Notification */}
        {isPublishedNotice && (
          <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', borderRadius: '10px', padding: '12px 18px', color: '#4ade80', fontSize: '0.875rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} /> All draft updates have been published to the live public store!
          </div>
        )}

        {/* 1. Page Selection Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px' }}>
          {pages.map((p) => {
            const isCurrent = selectedPage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handlePageChange(p.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: isCurrent ? '1px solid #22c55e' : '1px solid #1e293b',
                  background: isCurrent ? 'rgba(34, 197, 94, 0.15)' : '#0f172a',
                  color: isCurrent ? '#4ade80' : '#94a3b8',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* 2. Section Selector for the Selected Page */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase' }}>
            Available Sections:
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {pageSections.map((sec) => {
              const isSelected = activeSection?.sectionKey === sec.sectionKey;
              return (
                <button
                  key={sec.sectionKey}
                  onClick={() => setSelectedSectionKey(sec.sectionKey)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid #3b82f6' : '1px solid #334155',
                    background: isSelected ? '#2563eb' : '#090d16',
                    color: isSelected ? '#ffffff' : '#cbd5e1',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {sec.sectionKey}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Main Editor & Live Preview Grid */}
        {activeSection && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
            {/* Left: Input Form Controls */}
            <div className="glass-panel" style={{ padding: '24px', background: '#0f172a', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  Editing: <span style={{ color: '#60a5fa' }}>{activeSection.sectionKey}</span>
                </h3>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Updated: {new Date(activeSection.updatedAt).toLocaleTimeString()}
                </span>
              </div>

              {/* Tag & Color */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                    Badge Tag Text
                  </label>
                  <input
                    type="text"
                    value={activeSection.tag}
                    onChange={(e) => updateSectionDraft(activeSection.sectionKey, { tag: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                    Tag Color
                  </label>
                  <select
                    value={activeSection.tagColor}
                    onChange={(e) => updateSectionDraft(activeSection.sectionKey, { tagColor: e.target.value as any })}
                    className="input-field"
                  >
                    <option value="g">Green (g)</option>
                    <option value="b">Blue (b)</option>
                    <option value="p">Purple (p)</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                  Section Headline / Title (H1 / H2)
                </label>
                <input
                  type="text"
                  value={activeSection.title}
                  onChange={(e) => updateSectionDraft(activeSection.sectionKey, { title: e.target.value })}
                  className="input-field"
                  style={{ fontSize: '0.95rem', fontWeight: 700 }}
                />
              </div>

              {/* Subtitle / Lede */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                  Subtitle / Descriptive Copy
                </label>
                <textarea
                  rows={3}
                  value={activeSection.lede}
                  onChange={(e) => updateSectionDraft(activeSection.sectionKey, { lede: e.target.value })}
                  className="input-field"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* CTA Button Text */}
              {activeSection.ctaText !== undefined && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={activeSection.ctaText}
                    onChange={(e) => updateSectionDraft(activeSection.sectionKey, { ctaText: e.target.value })}
                    className="input-field"
                  />
                </div>
              )}

              {/* Feature Cards Manager */}
              {activeSection.cards && (
                <div style={{ marginTop: '20px', borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                      Feature Cards ({activeSection.cards.length})
                    </span>
                    <button onClick={handleAddCard} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.725rem' }}>
                      <Plus size={12} /> Add Card
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeSection.cards.map((c, idx) => (
                      <div key={c.id} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa' }}>Card #{idx + 1}</span>
                          <button
                            onClick={() => handleDeleteCard(idx)}
                            style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0 }}
                            title="Delete card"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', marginBottom: '8px' }}>
                          <input
                            type="text"
                            value={c.iconName}
                            onChange={(e) => handleUpdateCard(idx, { iconName: e.target.value })}
                            placeholder="Lucide Icon (e.g. ShieldCheck)"
                            className="input-field"
                            style={{ fontSize: '0.75rem' }}
                          />
                          <input
                            type="text"
                            value={c.title}
                            onChange={(e) => handleUpdateCard(idx, { title: e.target.value })}
                            placeholder="Card Title"
                            className="input-field"
                            style={{ fontSize: '0.75rem', fontWeight: 700 }}
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={c.desc}
                          onChange={(e) => handleUpdateCard(idx, { desc: e.target.value })}
                          placeholder="Card description..."
                          className="input-field"
                          style={{ fontSize: '0.75rem', resize: 'vertical' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Live Real-Time Website Preview */}
            <div className="glass-panel" style={{ padding: '28px', background: '#070b14', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Eye size={14} /> Live Component Preview
                </span>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Matches Public Website Rendering</span>
              </div>

              {/* Preview Canvas */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px 0' }}>
                <span className={`tag-badge ${activeSection.tagColor}`}>
                  {activeSection.tag}
                </span>

                <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#ffffff', margin: '14px 0 12px', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                  {activeSection.title}
                </h2>

                <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
                  {activeSection.lede}
                </p>

                {activeSection.ctaText && (
                  <div style={{ marginBottom: '24px' }}>
                    <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                      {activeSection.ctaText} <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {/* Cards Preview Grid */}
                {activeSection.cards && activeSection.cards.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '10px' }}>
                    {activeSection.cards.map((c) => (
                      <div key={c.id} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', marginBottom: '8px' }}>
                          {resolveLucideIcon(c.iconName, 16, '#22c55e')}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{c.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>{c.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
