import React from 'react';
import { X, ArrowRight, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { CMSCard } from '../../context/CMSContext';
import { resolveLucideIcon } from '../../utils/iconResolver';

interface CardDetailModalProps {
  card: CMSCard | null;
  onClose: () => void;
  onLaunchModule: (moduleId: number) => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose, onLaunchModule }) => {
  if (!card) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="liquid-glass-modal"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '30px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94a3b8',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: card.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {resolveLucideIcon(card.iconName, 24, '#0F172A')}
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              {card.title}
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600 }}>
              GrowUps Integrated Module
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '18px' }}>
          {card.desc}
        </p>

        {card.detailBody && (
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>
              How it works on GrowUps:
            </div>
            <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
              {card.detailBody}
            </p>
          </div>
        )}

        {card.tags && card.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {card.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(37, 99, 235, 0.15)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#60a5fa',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (card.targetDashboardModule) {
                onLaunchModule(card.targetDashboardModule);
              } else {
                onLaunchModule(1);
              }
            }}
            className="btn-primary"
            style={{ flex: 2 }}
          >
            Launch in Workspace <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
