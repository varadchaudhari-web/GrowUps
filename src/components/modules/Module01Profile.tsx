import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Building2, User, Globe, MapPin, Users, Calendar, DollarSign, TrendingUp, Save, Sparkles, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { StartupStage } from '../../types';

export const Module01Profile: React.FC = () => {
  const { startupData, updateStartupData, setStartupStage } = useApp();
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(startupData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStartupData(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addCoFounder = () => {
    setFormData(prev => ({
      ...prev,
      coFounders: [...prev.coFounders, { name: '', role: 'Co-Founder', email: '' }]
    }));
  };

  const removeCoFounder = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      coFounders: prev.coFounders.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Module Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-stage">Module 1</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Identity & Ecosystem Core</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Founder & Startup Profile
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Configure your company identity, traction metrics, team hierarchy, and lifecycle stage to dynamically personalize GrowUps AI.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {savedSuccess && (
            <span style={{ color: '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <CheckCircle2 size={16} /> Changes Saved!
            </span>
          )}
          <button
            onClick={() => {
              if (isEditing) {
                updateStartupData(formData);
                setIsEditing(false);
              } else {
                setFormData(startupData);
                setIsEditing(true);
              }
            }}
            className={isEditing ? 'btn-primary' : 'btn-secondary'}
          >
            {isEditing ? <><Save size={16} /> Save Profile</> : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Dynamic Stage Personalization Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '14px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#2563eb', padding: '10px', borderRadius: '10px', color: '#fff' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
              Current Lifecycle Stage: <span style={{ color: '#38bdf8' }}>{startupData.stage}</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '2px' }}>
              GrowUps AI Advisor, PRD generator, and due-diligence checklists are currently optimized for <strong>{startupData.stage}</strong> operations.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quick Switch:</span>
          {(['Idea', 'Validation', 'MVP', 'Early Traction', 'Revenue', 'Growth', 'Scale'] as StartupStage[]).map(st => (
            <button
              key={st}
              onClick={() => {
                setStartupStage(st);
                setFormData(prev => ({ ...prev, stage: st }));
              }}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: startupData.stage === st ? '1px solid #22c55e' : '1px solid #334155',
                background: startupData.stage === st ? 'rgba(34, 197, 94, 0.25)' : '#0f172a',
                color: startupData.stage === st ? '#4ade80' : '#94a3b8',
                fontSize: '0.725rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Startup Overview Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Building2 size={20} color="#60a5fa" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>Startup Information</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Startup Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              ) : (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>{startupData.name}</div>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Tagline</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="input-field"
                />
              ) : (
                <div style={{ fontSize: '0.875rem', color: '#cbd5e1', marginTop: '2px' }}>{startupData.tagline}</div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Industry</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#f8fafc', marginTop: '2px' }}>{startupData.industry}</div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Business Model</label>
                {isEditing ? (
                  <select
                    value={formData.businessModel}
                    onChange={(e) => setFormData({ ...formData, businessModel: e.target.value as any })}
                    className="input-field"
                  >
                    <option value="SaaS">SaaS</option>
                    <option value="B2B">B2B Enterprise</option>
                    <option value="B2C">B2C Consumer</option>
                    <option value="Marketplace">Marketplace</option>
                    <option value="D2C">D2C E-commerce</option>
                  </select>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#f8fafc', marginTop: '2px' }}>{startupData.businessModel}</div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#f8fafc', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#60a5fa" /> {startupData.location}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Team Size</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value, 10) || 1 })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#f8fafc', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} color="#60a5fa" /> {startupData.teamSize} Members
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Website / URL</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="input-field"
                />
              ) : (
                <a href={startupData.website} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#60a5fa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Globe size={14} /> {startupData.website}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Live Traction & Financial Metrics Snapshot */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <TrendingUp size={20} color="#4ade80" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>Traction & Runway Snapshot</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Active MRR</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#22c55e', marginTop: '4px' }}>
                ₹{startupData.traction.mrr.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#4ade80', marginTop: '2px' }}>+{startupData.traction.growthRatePercent}% MoM Growth</div>
            </div>

            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Active Users</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {startupData.traction.users.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>14 B2B Enterprises</div>
            </div>

            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Net Monthly Burn</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f87171', marginTop: '4px' }}>
                ₹{startupData.traction.burnRate.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Cloud & Payroll</div>
            </div>

            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Cash Runway</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>
                {startupData.traction.runwayMonths} Mo
              </div>
              <div style={{ fontSize: '0.7rem', color: '#4ade80', marginTop: '2px' }}>Healthy Pre-Seed</div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Problem Statement</label>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', background: '#090d16', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', marginTop: '4px' }}>
              {startupData.problemStatement}
            </div>
          </div>
        </div>
      </div>

      {/* Founders & Leadership Team */}
      <div className="glass-panel" style={{ padding: '24px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} color="#a855f7" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>Founders & Leadership Team</h2>
          </div>
          {isEditing && (
            <button onClick={addCoFounder} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
              <Plus size={14} /> Add Co-Founder
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {(isEditing ? formData.coFounders : startupData.coFounders).map((cf, idx) => (
            <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px', position: 'relative' }}>
              {isEditing && (
                <button
                  onClick={() => removeCoFounder(idx)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                  {cf.name.charAt(0) || 'F'}
                </div>
                <div style={{ flex: 1 }}>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={cf.name}
                        onChange={(e) => {
                          const updated = [...formData.coFounders];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, coFounders: updated });
                        }}
                        placeholder="Founder Name"
                        className="input-field"
                        style={{ padding: '4px 8px', marginBottom: '4px', fontSize: '0.8rem' }}
                      />
                      <input
                        type="text"
                        value={cf.role}
                        onChange={(e) => {
                          const updated = [...formData.coFounders];
                          updated[idx].role = e.target.value;
                          setFormData({ ...formData, coFounders: updated });
                        }}
                        placeholder="Role (e.g. CEO, CTO)"
                        className="input-field"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                      />
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{cf.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#60a5fa' }}>{cf.role}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{cf.email}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
