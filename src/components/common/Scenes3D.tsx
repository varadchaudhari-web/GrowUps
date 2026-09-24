import React from 'react';

export function LayerScene() {
  // Build: three translucent layers stacking up — idea, plan, product
  return (
    <div className="scene">
      <div className="inner spin">
        <div className="layer" style={{ background: 'rgba(34,197,94,.28)', transform: 'translateZ(-24px)' }} />
        <div className="layer" style={{ background: 'rgba(37,99,235,.28)', transform: 'translateZ(0px)' }} />
        <div className="layer" style={{ background: 'rgba(124,58,237,.28)', transform: 'translateZ(24px)' }} />
      </div>
    </div>
  );
}

export function BarScene() {
  // Grow: a small rising bar chart in real depth
  const bars = [
    { h: 60, x: -40, z: -20, c: '#22C55E' },
    { h: 96, x: 0, z: 0, c: '#2563EB' },
    { h: 130, x: 40, z: 20, c: '#7C3AED' },
  ];
  return (
    <div className="scene">
      <div className="inner spin">
        {bars.map((b, i) => (
          <div
            key={i}
            className="bar"
            style={{
              height: b.h,
              background: b.c,
              transform: `translate3d(${b.x}px, ${(150 - b.h) / 2}px, ${b.z}px)`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function CoinScene() {
  // Funding: a coin flipping in place
  return (
    <div className="scene">
      <div className="inner coinspin">
        <div className="coin front">Raise</div>
        <div className="coin back">Fund</div>
      </div>
    </div>
  );
}

export function OrbitScene() {
  // Network: a core node with others orbiting it in different planes
  return (
    <div className="scene">
      <div className="inner">
        <div className="core" />
        <div className="ring ring-a">
          <div className="node-orbit" style={{ background: '#22C55E', color: '#22C55E' }} />
        </div>
        <div className="ring ring-b">
          <div className="node-orbit" style={{ background: '#2563EB', color: '#2563EB' }} />
        </div>
        <div className="ring ring-c">
          <div className="node-orbit" style={{ background: '#7C3AED', color: '#7C3AED' }} />
        </div>
      </div>
    </div>
  );
}
