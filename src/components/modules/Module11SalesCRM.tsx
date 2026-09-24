import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users2, Plus, Trash2, Mail, Phone, Building, DollarSign, Sparkles, CheckCircle2, Copy, Calendar } from 'lucide-react';
import { CRMLead } from '../../types';

export const Module11SalesCRM: React.FC = () => {
  const { crmLeads, addCRMLead, updateLeadStage, deleteCRMLead, startupData } = useApp();
  const [showAddLead, setShowAddLead] = useState(false);
  const [selectedLeadForAI, setSelectedLeadForAI] = useState<CRMLead | null>(crmLeads[0] || null);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dealValue, setDealValue] = useState(50000);
  const [notes, setNotes] = useState('');

  const stages: CRMLead['stage'][] = ['Lead', 'Qualified', 'Demo', 'Proposal', 'Negotiation', 'Won', 'Lost'];

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company) return;

    addCRMLead({
      name,
      company,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: phone || '+91 98765 00000',
      dealValue,
      stage: 'Lead',
      probabilityPercent: 20,
      lastContactDate: new Date().toISOString().split('T')[0],
      aiFollowUpDraft: `Hi ${name}, thank you for your interest in ${startupData.name}. I would love to schedule a quick 15-minute walkthrough of our autonomous cloud optimization platform.`,
      notes
    });

    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setShowAddLead(false);
  };

  const totalPipelineValue = crmLeads.filter(l => l.stage !== 'Lost').reduce((acc, l) => acc + l.dealValue, 0);
  const totalWonValue = crmLeads.filter(l => l.stage === 'Won').reduce((acc, l) => acc + l.dealValue, 0);

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 11</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>B2B Pipeline & Deals</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Sales CRM & Deal Pipeline
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Track sales pipeline from Lead to Won deals. Won contracts automatically synchronize into Startup Finance MRR.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 14px', fontSize: '0.8rem', color: '#cbd5e1' }}>
            Pipeline: <strong style={{ color: '#38bdf8' }}>₹{totalPipelineValue.toLocaleString('en-IN')}</strong> | Won: <strong style={{ color: '#22c55e' }}>₹{totalWonValue.toLocaleString('en-IN')}</strong>
          </div>
          <button onClick={() => setShowAddLead(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Plus size={14} /> Add Lead
          </button>
        </div>
      </div>

      {/* Add Lead Form */}
      {showAddLead && (
        <div style={{ background: '#090d16', border: '1px solid #3b82f6', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>Add New Sales Prospect</h3>
          <form onSubmit={handleCreateLead} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Contact Person</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Vikram Sethi" className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Company Name</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Zenith Logistics" className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="input-field" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Deal Value (INR)</label>
              <input type="number" value={dealValue} onChange={(e) => setDealValue(parseInt(e.target.value, 10) || 0)} className="input-field" required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Meeting Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Details regarding cloud spend, timeline, pain points..." className="input-field" rows={2} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary" style={{ padding: '8px 16px' }}>Save Lead</button>
              <button type="button" onClick={() => setShowAddLead(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Main CRM Grid (Pipeline Column + AI Follow-Up Assistant) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Leads List */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users2 size={18} color="#60a5fa" /> Active Sales Leads ({crmLeads.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {crmLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLeadForAI(lead)}
                style={{
                  background: selectedLeadForAI?.id === lead.id ? 'rgba(37, 99, 235, 0.15)' : '#090d16',
                  border: selectedLeadForAI?.id === lead.id ? '1px solid #3b82f6' : '1px solid #1e293b',
                  borderRadius: '10px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>{lead.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '8px' }}>• {lead.company}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#22c55e' }}>
                      ₹{lead.dealValue.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteCRMLead(lead.id); }}
                      style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '10px' }}>
                  <span><Mail size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {lead.email}</span>
                  <span><Phone size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {lead.phone}</span>
                  <span><Calendar size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Contacted: {lead.lastContactDate}</span>
                </div>

                {lead.notes && (
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '10px', background: '#0f172a', padding: '6px 10px', borderRadius: '6px' }}>
                    {lead.notes}
                  </p>
                )}

                {/* Stage Progression Pills */}
                <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingTop: '4px' }}>
                  {stages.map((stg) => {
                    const isCurrent = lead.stage === stg;
                    return (
                      <button
                        key={stg}
                        onClick={(e) => { e.stopPropagation(); updateLeadStage(lead.id, stg); }}
                        style={{
                          flex: 1,
                          padding: '4px 6px',
                          borderRadius: '4px',
                          border: isCurrent ? '1px solid #22c55e' : '1px solid #1e293b',
                          background: isCurrent ? (stg === 'Won' ? '#16a34a' : stg === 'Lost' ? '#dc2626' : '#2563eb') : '#0f172a',
                          color: isCurrent ? '#ffffff' : '#94a3b8',
                          fontSize: '0.7rem',
                          fontWeight: isCurrent ? 700 : 400,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {stg}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Follow-Up Assistant Side Panel */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={18} color="#a855f7" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>AI Follow-Up Drafter</h3>
          </div>

          {selectedLeadForAI ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Target Contact:</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{selectedLeadForAI.name} ({selectedLeadForAI.company})</div>
                <div style={{ fontSize: '0.725rem', color: '#60a5fa' }}>Stage: {selectedLeadForAI.stage} | Deal: ₹{selectedLeadForAI.dealValue.toLocaleString('en-IN')}</div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>AI Generated Draft:</label>
                <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px', fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.5, marginTop: '4px', minHeight: '180px' }}>
                  {selectedLeadForAI.aiFollowUpDraft || 'No draft generated yet.'}
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedLeadForAI.aiFollowUpDraft) {
                    navigator.clipboard.writeText(selectedLeadForAI.aiFollowUpDraft);
                    alert('Draft copied to clipboard!');
                  }
                }}
                className="btn-ai"
                style={{ width: '100%', padding: '10px', fontSize: '0.8rem' }}
              >
                <Copy size={14} /> Copy Draft to Clipboard
              </button>
            </div>
          ) : (
            <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', margin: 'auto' }}>
              Select a lead on the left to review AI follow-up suggestions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
