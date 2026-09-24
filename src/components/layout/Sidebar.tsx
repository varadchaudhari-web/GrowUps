import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { ALL_25_MODULES } from '../../types/userStory';
import {
  Building2, Bot, Sparkles, BarChart3, LayoutGrid, FileText, Cpu,
  KanbanSquare, Palette, Megaphone, Users2, DollarSign, ShieldCheck,
  Presentation, Search, Gift, GraduationCap, Briefcase, UserPlus,
  BriefcaseBusiness, BookOpen, MessageSquare, Building, TrendingUp, Lock,
  CheckCircle2, Shield
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Building2: <Building2 size={16} />,
  Bot: <Bot size={16} />,
  Sparkles: <Sparkles size={16} />,
  BarChart3: <BarChart3 size={16} />,
  LayoutGrid: <LayoutGrid size={16} />,
  FileText: <FileText size={16} />,
  Cpu: <Cpu size={16} />,
  KanbanSquare: <KanbanSquare size={16} />,
  Palette: <Palette size={16} />,
  Megaphone: <Megaphone size={16} />,
  Users2: <Users2 size={16} />,
  DollarSign: <DollarSign size={16} />,
  ShieldCheck: <ShieldCheck size={16} />,
  Presentation: <Presentation size={16} />,
  Search: <Search size={16} />,
  Gift: <Gift size={16} />,
  GraduationCap: <GraduationCap size={16} />,
  Briefcase: <Briefcase size={16} />,
  UserPlus: <UserPlus size={16} />,
  BriefcaseBusiness: <BriefcaseBusiness size={16} />,
  BookOpen: <BookOpen size={16} />,
  MessageSquare: <MessageSquare size={16} />,
  Building: <Building size={16} />,
  TrendingUp: <TrendingUp size={16} />,
  Lock: <Lock size={16} />
};

const CATEGORIES = [
  'Strategy & Validation',
  'Product & Build',
  'Growth & CRM',
  'Finance & Funding',
  'Talent & Network',
  'Ecosystem & Academy',
  'Governance'
] as const;

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const { canAccessModule, currentUser } = useAuth();
  const { activeModuleId, setActiveModuleId } = useApp();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 900
          }}
          className="md:hidden"
        />
      )}

      <aside
        className={`dashboard-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        style={{
          width: '280px',
          background: '#090d16',
          borderRight: '1px solid #1e293b',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px - 45px)',
          overflowY: 'auto',
          padding: '16px 12px',
          flexShrink: 0
        }}
      >
        {/* Mobile Close Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '12px',
            marginBottom: '12px',
            borderBottom: '1px solid #1e293b'
          }}
          className="md:hidden"
        >
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
            All 25 Startup Modules
          </div>
          <button
            onClick={onCloseMobile}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '6px',
              color: '#ffffff',
              padding: '4px 8px',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            ✕ Close
          </button>
        </div>
      {/* Admin Full Access Banner */}
      {currentUser?.role === 'super_admin' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          borderRadius: '10px',
          padding: '10px 12px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Shield size={16} color="#c084fc" />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f3e8ff' }}>ADMIN MASTER ACCESS</div>
            <div style={{ fontSize: '0.65rem', color: '#c084fc' }}>All 25 modules unlocked & live</div>
          </div>
        </div>
      )}

      {/* Module Categories */}
      {CATEGORIES.map(category => {
        const modulesInCategory = ALL_25_MODULES.filter(m => m.category === category);
        if (modulesInCategory.length === 0) return null;

        return (
          <div key={category} style={{ marginBottom: '18px' }}>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#64748b',
              padding: '4px 10px',
              marginBottom: '4px'
            }}>
              {category}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {modulesInCategory.map(m => {
                const isActive = activeModuleId === m.id;
                const isAllowed = canAccessModule(m.id);

                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      if (isAllowed) {
                        setActiveModuleId(m.id);
                        onCloseMobile?.();
                      }
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: isActive ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
                      background: isActive
                        ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)'
                        : isAllowed ? 'transparent' : 'rgba(15, 23, 42, 0.3)',
                      color: isActive ? '#60a5fa' : isAllowed ? '#cbd5e1' : '#475569',
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 600 : 400,
                      textAlign: 'left',
                      cursor: isAllowed ? 'pointer' : 'not-allowed',
                      opacity: isAllowed ? 1 : 0.55,
                      transition: 'all 0.15s ease'
                    }}
                    title={!isAllowed ? `Not accessible for ${currentUser?.role} role. Switch to Admin or authorized persona.` : m.description}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <span style={{ color: isActive ? '#3b82f6' : isAllowed ? '#94a3b8' : '#475569' }}>
                        {ICON_MAP[m.iconName] || <Sparkles size={16} />}
                      </span>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {m.title.replace(/Module \d+: /, '')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: 'monospace' }}>
                        M{m.id}
                      </span>
                      {!isAllowed && (
                        <Lock size={12} color="#64748b" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      </aside>
    </>
  );
};
