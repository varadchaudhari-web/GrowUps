import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Star, ShieldCheck, CheckCircle2, Plus, CreditCard, Clock, FileCheck } from 'lucide-react';
import { openRazorpayCheckout } from '../../utils/razorpay';
import { BusinessServiceItem } from '../../types';

export const Module18BusinessServices: React.FC = () => {
  const { servicesList, hiredServices, hireServiceOrder, addPaymentRecord, startupData } = useApp();
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hiringService, setHiringService] = useState<BusinessServiceItem | null>(null);
  const [rfqNote, setRfqNote] = useState('Need high conversion responsive frontend setup');

  const categories = ['All', 'Website Development', 'Company Registration', 'Software Development', 'Legal', 'GST', 'Design'];

  const filteredServices = selectedCategory === 'All'
    ? servicesList
    : servicesList.filter(s => s.serviceCategory === selectedCategory);

  const handleHireCheckout = () => {
    if (!hiringService) return;

    openRazorpayCheckout({
      amountINR: hiringService.priceStartingINR,
      purpose: 'B2B Service Escrow Hire',
      description: `${hiringService.title} by ${hiringService.providerName}`,
      userName: currentUser?.name || 'Founder',
      userEmail: currentUser?.email || 'founder@cloudpulse.ai',
      onSuccess: (res) => {
        hireServiceOrder(
          hiringService.id,
          hiringService.title,
          hiringService.providerName,
          res.razorpay_payment_id
        );

        addPaymentRecord({
          razorpayPaymentId: res.razorpay_payment_id,
          amountINR: hiringService.priceStartingINR,
          userEmail: currentUser?.email || 'founder@cloudpulse.ai',
          purpose: `Service Escrow: ${hiringService.title}`,
          status: 'captured'
        });

        alert(`Escrow Payment of ₹${hiringService.priceStartingINR.toLocaleString('en-IN')} held securely via Razorpay!\n\nPayment ID: ${res.razorpay_payment_id}\nProvider ${hiringService.providerName} has been notified to begin delivery.`);
        setHiringService(null);
      },
      onFailure: (err) => {
        alert('Escrow payment cancelled: ' + err.message);
      }
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 18</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Verified Agency Marketplace & Escrow</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Business Services Marketplace
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Hire pre-vetted agencies for Web Dev, Pvt Ltd Incorporation, GST filings, and IP protection with Razorpay milestone escrow.
          </p>
        </div>

        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 12px', fontSize: '0.78rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="#60a5fa" /> 100% Escrow Milestone Protected
        </div>
      </div>

      {/* Active Hired Services */}
      {hiredServices.length > 0 && (
        <div style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileCheck size={16} /> Active Escrow Contracts ({hiredServices.length})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
            {hiredServices.map((h, i) => (
              <div key={i} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{h.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Agency: {h.providerName}</div>
                  <div style={{ fontSize: '0.7rem', color: '#4ade80', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={11} /> {h.status}
                  </div>
                </div>
                <button
                  onClick={() => alert(`Milestone released to ${h.providerName} for ${h.title}!`)}
                  className="btn-primary"
                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                >
                  Release Milestone
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: selectedCategory === cat ? '1px solid #3b82f6' : '1px solid #1e293b',
              background: selectedCategory === cat ? 'rgba(37, 99, 235, 0.25)' : '#0f172a',
              color: selectedCategory === cat ? '#60a5fa' : '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
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
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge-stage" style={{ fontSize: '0.68rem' }}>{srv.serviceCategory}</span>
                <span style={{ color: '#fbbf24', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}>
                  <Star size={13} fill="#fbbf24" /> {srv.providerRating}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                {srv.title}
              </h3>

              <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Agency: {srv.providerName} <ShieldCheck size={14} color="#22c55e" />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>Guaranteed Deliverables:</div>
                <ul style={{ paddingLeft: '16px', fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {srv.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Turnaround: {srv.turnaroundTime}</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#22c55e' }}>
                  ₹{srv.priceStartingINR.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => setHiringService(srv)}
                className="btn-razorpay"
                style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              >
                <CreditCard size={14} /> Hire via Escrow
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hire Modal */}
      {hiringService && (
        <div className="modal-overlay" onClick={() => setHiringService(null)}>
          <div className="glass-panel" style={{ width: '480px', padding: '24px', background: '#090d16' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              Hire {hiringService.providerName}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '16px' }}>
              {hiringService.title}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Scope of Work / Custom RFQ Notes</label>
                <textarea value={rfqNote} onChange={e => setRfqNote(e.target.value)} className="input-field" rows={3} />
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Escrow Amount:</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#22c55e' }}>₹{hiringService.priceStartingINR.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setHiringService(null)} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button onClick={handleHireCheckout} className="btn-razorpay" style={{ flex: 2 }}>
                Lock Funds in Escrow (Razorpay)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
