import React from 'react';
import { ArrowLeft, Sparkles, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotFound404: React.FC = () => {
  const { setActiveModuleId } = useApp();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '20px',
        background: 'rgba(239, 68, 68, 0.12)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <AlertTriangle size={36} color="#f87171" />
      </div>

      <span className="badge-stage" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', marginBottom: '12px' }}>
        Public Route — 404 Not Found (Phase 2)
      </span>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '12px' }}>
        404 — Public Page Reserved
      </h1>

      <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '520px', lineHeight: 1.6, marginBottom: '28px' }}>
        Public visitor pages will be rolled out in <strong>Phase 2</strong>. You are currently in the live authenticated <strong>GrowUps Platform Workspace</strong> with full 25-module access.
      </p>

      <button
        onClick={() => setActiveModuleId(1)}
        className="btn-primary"
      >
        <ArrowLeft size={16} /> Return to Startup Workspace (Module 1)
      </button>
    </div>
  );
};
