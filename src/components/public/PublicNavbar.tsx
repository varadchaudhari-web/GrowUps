import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, ArrowRight, LayoutDashboard, UserPlus, Sparkles, UserCheck } from 'lucide-react';
import { GrowUpsLogo } from '../common/GrowUpsLogo';

interface PublicNavbarProps {
  activePublicPage: string;
  setActivePublicPage: (page: string) => void;
  onOpenDashboard: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  activePublicPage,
  setActivePublicPage,
  onOpenDashboard
}) => {
  const { isAuthenticated, currentUser, openSignIn, openSignUp } = useAuth();
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 30) {
          navRef.current.style.background = 'rgba(9, 13, 22, 0.94)';
          navRef.current.style.backdropFilter = 'blur(16px)';
          navRef.current.style.padding = '12px 0';
          navRef.current.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
          navRef.current.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
          navRef.current.style.background = 'transparent';
          navRef.current.style.backdropFilter = 'none';
          navRef.current.style.padding = '18px 0';
          navRef.current.style.borderBottom = '1px solid transparent';
          navRef.current.style.boxShadow = 'none';
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'build', label: 'Build' },
    { id: 'grow', label: 'Grow' },
    { id: 'funding', label: 'Funding' },
    { id: 'network', label: 'Network' },
    { id: 'learn', label: 'Learn' },
    { id: 'ai', label: 'AI' },
    { id: 'about', label: 'About Us' }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePublicPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          padding: '18px 0',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="public-nav-container">
          {/* Brand Logo (Left) */}
          <div
            onClick={() => handleNavClick('home')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0
            }}
          >
            <GrowUpsLogo size={32} showBadge={true} />
          </div>

          {/* Desktop Navigation Links (Visible only on PC screen >= 1024px) */}
          <div className="public-nav-desktop-links">
            {navItems.map((item) => {
              const isActive = activePublicPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: isActive ? 'rgba(34, 197, 94, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid transparent',
                    borderRadius: '8px',
                    color: isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.8)',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '6px 14px',
                    fontFamily: 'var(--font-heading)',
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action CTAs (Visible only on PC screen >= 1024px) */}
          <div className="public-nav-desktop-actions">
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={onOpenDashboard}
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  <LayoutDashboard size={15} /> Open Dashboard
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#0f172a', padding: '4px 10px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                  <img
                    src={currentUser?.avatar}
                    alt=""
                    style={{ width: '26px', height: '26px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#f8fafc', fontWeight: 600 }}>{currentUser?.name}</span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={openSignIn}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ffffff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Sign In
                </button>

                {/* Grow My Startup: directly opens registration & role selection! */}
                <button
                  onClick={() => openSignUp()}
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Grow My Startup</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* 3-Line Mobile Menu Toggle Button (Visible ONLY when screen < 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="public-nav-mobile-toggle-btn public-nav-mobile-toggle"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Responsive Mobile Drawer / Navigation Modal */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 11, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          {/* Mobile Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
            <GrowUpsLogo size={28} showBadge={true} />
            <button
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 'auto 0' }}>
            {navItems.map((item) => {
              const isActive = activePublicPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: isActive ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid transparent',
                    borderRadius: '10px',
                    color: isActive ? '#4ade80' : '#ffffff',
                    fontSize: '18px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />}
                </button>
              );
            })}
          </div>

          {/* Mobile Bottom Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
            {isAuthenticated ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDashboard(); }}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
              >
                <LayoutDashboard size={16} /> Open Founder Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); openSignUp(); }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
                >
                  <UserPlus size={16} /> Grow My Startup (Create Account)
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); openSignIn(); }}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '10px', justifyContent: 'center' }}
                >
                  Sign In / Demo Personas
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
