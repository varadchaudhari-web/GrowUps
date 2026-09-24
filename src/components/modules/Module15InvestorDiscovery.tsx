import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Globe, Send, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { InvestorProfile } from '../../types';

export const Module15InvestorDiscovery: React.FC = () => {
  const { investorsList, startupData } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [submittedPitchId, setSubmittedPitchId] = useState<string | null>(null);

  const sectors = ['All', 'B2B SaaS', 'DevOps', 'AI Infrastructure', 'Fintech', 'DeepTech'];
  const types = ['All', 'Venture Capital', 'Angel', 'Micro VC'];

  const filteredInvestors = investorsList.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) || inv.firm.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All' || inv.sectors.includes(selectedSector);
    const matchesType = selectedType === 'All' || inv.type === selectedType;
    return matchesSearch && matchesSector && matchesType;
  });

  const handlePitchDeckSubmit = (invId: string, firmName: string) => {
    setSubmittedPitchId(invId);
    setTimeout(() => {
      alert(`Pitch Deck & Executive Summary for ${startupData.name} submitted directly to ${firmName} deal pipeline!`);
    }, 400);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 15</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Institutional Capital Matchmaker</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Investor Discovery Directory
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Research verified Angel Investors, Venture Funds, and Micro-VCs aligned with your industry and stage.
          </p>
        </div>

        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 14px', fontSize: '0.75rem', color: '#cbd5e1' }}>
          Platform Disclaimer: Facilitates research & discovery; does not guarantee funding.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search VC Firm, Angel or Partner name..."
            className="input-field"
            style={{ paddingLeft: '38px', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="input-field"
            style={{ width: '160px', fontSize: '0.8rem' }}
          >
            {sectors.map(s => <option key={s} value={s}>{s} (Sector)</option>)}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input-field"
            style={{ width: '160px', fontSize: '0.8rem' }}
          >
            {types.map(t => <option key={t} value={t}>{t} (Type)</option>)}
          </select>
        </div>
      </div>

      {/* Investors Directory Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredInvestors.map((inv) => (
          <div
            key={inv.id}
            className="glass-panel"
            style={{
              padding: '22px',
              background: '#090d16',
              border: '1px solid #1e293b',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>{inv.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600 }}>{inv.firm}</div>
                </div>
                <span className="badge-stage" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{inv.type}</span>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '12px' }}>
                <strong>Check Size:</strong> <span style={{ color: '#4ade80', fontWeight: 700 }}>{inv.ticketSize}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {inv.sectors.map((sec, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', background: '#0f172a', border: '1px solid #334155', color: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>
                    {sec}
                  </span>
                ))}
              </div>

              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '16px' }}>
                <strong>Notable Portfolio:</strong> {inv.portfolio.join(', ')}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #1e293b', paddingTop: '14px' }}>
              <a
                href={inv.website}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ flex: 1, padding: '8px', fontSize: '0.75rem', textDecoration: 'none' }}
              >
                <ExternalLink size={13} /> Visit Site
              </a>

              <button
                onClick={() => handlePitchDeckSubmit(inv.id, inv.firm)}
                className="btn-primary"
                style={{ flex: 1.5, padding: '8px', fontSize: '0.75rem' }}
              >
                {submittedPitchId === inv.id ? <><CheckCircle2 size={13} /> Submitted</> : <><Send size={13} /> Pitch {startupData.name}</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
