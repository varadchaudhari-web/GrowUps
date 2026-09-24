import React from 'react';

interface GrowUpsLogoProps {
  size?: number;
  showText?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  className?: string;
}

export const GrowUpsLogo: React.FC<GrowUpsLogoProps> = ({
  size = 32,
  showText = true,
  showBadge = false,
  badgeText = 'AI Ecosystem',
  className = ''
}) => {
  return (
    <div
      className={`growups-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.max(8, Math.round(size * 0.28))}px`,
        textDecoration: 'none',
        userSelect: 'none'
      }}
    >
      {/* Brand Icon Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          flexShrink: 0,
          filter: 'drop-shadow(0 4px 12px rgba(34, 197, 94, 0.25))'
        }}
      >
        <defs>
          <linearGradient id="gu-comp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>
          <linearGradient id="gu-comp-green" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#16a34a" />
            <stop offset="50%" stop-color="#22c55e" />
            <stop offset="100%" stop-color="#4ade80" />
          </linearGradient>
          <linearGradient id="gu-comp-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#7c3aed" />
          </linearGradient>
          <filter id="gu-comp-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Squircle Container */}
        <rect width="64" height="64" rx="16" fill="url(#gu-comp-bg)" />
        <rect
          width="62"
          height="62"
          x="1"
          y="1"
          rx="15"
          stroke="rgba(34, 197, 94, 0.4)"
          strokeWidth="1.5"
        />

        {/* Scaling Trajectory Lines & Arrow */}
        <g filter="url(#gu-comp-glow)">
          <path
            d="M14 44 C 14 44, 20 44, 25 36 C 30 28, 35 32, 42 21 L 49 14"
            stroke="url(#gu-comp-blue)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37 14 L 50 14 L 50 27"
            stroke="url(#gu-comp-green)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 48 C 24 48, 29 42, 36 34 L 43 27"
            stroke="url(#gu-comp-green)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="14" cy="44" r="3.5" fill="#38bdf8" />
          <circle cx="28" cy="32" r="3.5" fill="#22c55e" />
          <circle cx="50" cy="14" r="4" fill="#4ade80" />
        </g>
      </svg>

      {/* Typography */}
      {showText && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              fontSize: `${Math.round(size * 0.65)}px`,
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: 1
            }}
          >
            Grow<span style={{ color: '#22c55e' }}>Ups</span>
          </div>

          {showBadge && (
            <span
              style={{
                fontSize: `${Math.max(10, Math.round(size * 0.32))}px`,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '999px',
                background: 'rgba(34, 197, 94, 0.12)',
                color: '#4ade80',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
