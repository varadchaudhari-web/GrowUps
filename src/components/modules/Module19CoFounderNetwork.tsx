import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, CheckCircle2, Search, Filter, MapPin, Clock, PieChart, Sparkles } from 'lucide-react';
import { TalentProfile } from '../../types';

export const Module19CoFounderNetwork: React.FC = () => {
  const { talentList, connectionRequests, sendConnectionRequest, startupData } = useApp();
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const roles = ['All', 'Technical Co-Founder', 'Growth Marketer', 'UI/UX Lead', 'AI Engineer', 'Product Manager'];

  const filteredTalent = talentList.filter(t => {
    const matchesRole = selectedRole === 'All' || t.role === selectedRole;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 19</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Co-Founders & Founding Team Matchmaking</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Co-Founder & Talent Network
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Smart matching based on skills, startup stage, industry alignment, and equity expectations.
          </p>
        </div>

        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 14px', fontSize: '0.8rem', color: '#cbd5e1' }}>
          Active Matches for {startupData.name}: <strong style={{ color: '#4ade80' }}>18 Verified Candidates</strong>
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
            placeholder="Search skill (e.g. TypeScript, Rust, SEO)..."
            className="input-field"
            style={{ paddingLeft: '38px', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="input-field"
            style={{ width: '200px', fontSize: '0.8rem' }}
          >
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredTalent.map((talent) => {
          const isConnected = connectionRequests.includes(talent.id);

          return (
            <div
              key={talent.id}
              className="glass-panel"
              style={{
                padding: '24px',
                background: '#090d16',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>{talent.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600 }}>{talent.role}</div>
                  </div>
                  <span className="badge-stage" style={{ fontSize: '0.68rem' }}>{talent.availability}</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '12px' }}>
                  <span><MapPin size={12} style={{ display: 'inline' }} /> {talent.location}</span>
                  <span>• {talent.experienceYears} Years Exp</span>
                </div>

                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4, marginBottom: '14px' }}>
                  {talent.bio}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                  {talent.skills.map((skill, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', background: '#0f172a', border: '1px solid #334155', color: '#cbd5e1', padding: '2px 8px', borderRadius: '4px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Equity Expected:</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#4ade80' }}>
                    {talent.equityExpectedPercent}
                  </span>
                </div>

                <button
                  onClick={() => sendConnectionRequest(talent.id)}
                  disabled={isConnected}
                  className={isConnected ? 'btn-secondary' : 'btn-primary'}
                  style={{ padding: '8px 16px', fontSize: '0.78rem' }}
                >
                  {isConnected ? <><CheckCircle2 size={14} color="#22c55e" /> Request Sent</> : <><UserPlus size={14} /> Connect / Partner</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
