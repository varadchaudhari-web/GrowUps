import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Sparkles, Users, Layers, LogIn, LogOut, ChevronDown, CheckCircle2, Shield } from 'lucide-react';
import { PERSONA_STORIES } from '../../types/userStory';
import { UserRole } from '../../types';
import { GrowUpsLogo } from '../common/GrowUpsLogo';

export const Navbar: React.FC = () => {
  const { currentUser, switchRole, setShowLoginModal, setShowUserStoryModal, logout } = useAuth();
  const { startupData } = useApp();

  return (
    <header style={{
      minHeight: '64px',
      background: 'rgba(9, 13, 22, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      gap: '10px',
      flexWrap: 'wrap'
    }}>
      {/* Brand Logo & Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <div style={{ cursor: 'pointer' }}>
          <GrowUpsLogo size={28} showBadge={false} />
        </div>

        {/* Current Startup Indicator */}
        <div style={{
          display: 'none',
          padding: '4px 10px',
          background: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          alignItems: 'center',
          gap: '8px'
        }} className="lg:flex">
          <span style={{ fontSize: '0.725rem', color: '#94a3b8' }}>Startup:</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc' }}>{startupData.name}</span>
          <span className="badge-stage" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>{startupData.stage}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* User Story & 25-Module Matrix Button */}
        <button
          onClick={() => setShowUserStoryModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.35)',
            color: '#4ade80',
            padding: '5px 10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
          title="View Persona & 25 Module User Story Mapping"
        >
          <Layers size={14} />
          <span className="hidden sm:inline">User Stories & 25 Modules</span>
          <span className="sm:hidden">Stories</span>
        </button>

        {/* Persona Switcher Dropdown */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ position: 'relative' }}>
              <select
                value={currentUser.role}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                style={{
                  background: currentUser.role === 'super_admin' ? '#7c3aed' : '#1e293b',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  padding: '5px 8px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  maxWidth: '140px',
                  textOverflow: 'ellipsis'
                }}
              >
                {PERSONA_STORIES.map(p => (
                  <option key={p.role} value={p.role} style={{ background: '#0f172a', color: '#f8fafc' }}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Profile Avatar & Details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', padding: '3px 6px', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: '24px', height: '24px', borderRadius: '6px', objectFit: 'cover' }}
              />
              <span className="hidden md:inline" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser.name}
              </span>
            </div>

            <button
              onClick={logout}
              className="btn-secondary"
              style={{ padding: '5px 8px', fontSize: '0.75rem' }}
              title="Sign Out"
            >
              <LogOut size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="btn-primary"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
          >
            <LogIn size={14} /> Sign In
          </button>
        )}
      </div>
    </header>
  );
};
