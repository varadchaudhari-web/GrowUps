import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Star, Calendar, Video, CheckCircle2, ShieldCheck, Clock, CreditCard, Sparkles } from 'lucide-react';
import { openRazorpayCheckout } from '../../utils/razorpay';
import { MentorItem } from '../../types';

export const Module17MentorMarketplace: React.FC = () => {
  const { mentorsList, bookedSessions, bookMentorSession, addPaymentRecord, startupData } = useApp();
  const { currentUser } = useAuth();
  const [selectedExpertise, setSelectedExpertise] = useState<string>('All');
  const [bookingMentor, setBookingMentor] = useState<MentorItem | null>(null);
  const [sessionTopic, setSessionTopic] = useState('Pitch Deck & Seed Round Strategy');
  const [sessionDate, setSessionDate] = useState('2026-10-02');
  const [sessionTime, setSessionTime] = useState('05:00 PM IST');
  const [inVideoRoom, setInVideoRoom] = useState<string | null>(null);

  const categories = ['All', 'Product', 'Fundraising', 'Technology', 'Marketing', 'Legal', 'Finance', 'Sales', 'Operations'];

  const filteredMentors = selectedExpertise === 'All'
    ? mentorsList
    : mentorsList.filter(m => m.expertise.includes(selectedExpertise as any));

  const handleStartBooking = (mentor: MentorItem) => {
    setBookingMentor(mentor);
  };

  const handleRazorpayPayment = () => {
    if (!bookingMentor) return;

    openRazorpayCheckout({
      amountINR: bookingMentor.hourlyRateINR,
      purpose: 'Mentor 1:1 Advisory Session',
      description: `1-Hour Consultation with ${bookingMentor.name}`,
      userName: currentUser?.name || 'Startup Founder',
      userEmail: currentUser?.email || 'founder@cloudpulse.ai',
      onSuccess: (res) => {
        bookMentorSession(
          bookingMentor.id,
          bookingMentor.name,
          sessionDate,
          sessionTime,
          res.razorpay_payment_id,
          sessionTopic
        );

        addPaymentRecord({
          razorpayPaymentId: res.razorpay_payment_id,
          amountINR: bookingMentor.hourlyRateINR,
          userEmail: currentUser?.email || 'founder@cloudpulse.ai',
          purpose: `Mentor Session: ${bookingMentor.name}`,
          status: 'captured'
        });

        alert(`Payment of ₹${bookingMentor.hourlyRateINR.toLocaleString('en-IN')} Successful via Razorpay! (ID: ${res.razorpay_payment_id})\n\nYour 1:1 consultation session is confirmed.`);
        setBookingMentor(null);
      },
      onFailure: (err) => {
        alert('Payment cancelled or failed: ' + err.message);
      }
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 17</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>1:1 Executive Mentorship & Advisory</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Mentor Marketplace
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Book 1:1 video advisory sessions with verified entrepreneurs, product leaders, and angel investors via Razorpay.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 12px', fontSize: '0.78rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CreditCard size={14} color="#60a5fa" /> Razorpay Test Checkout Active
          </div>
        </div>
      </div>

      {/* Booked Sessions Alert / Active Rooms */}
      {bookedSessions.length > 0 && (
        <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} /> Confirmed Advisory Sessions ({bookedSessions.length})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
            {bookedSessions.map((s, idx) => (
              <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{s.mentorName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{s.topic}</div>
                  <div style={{ fontSize: '0.7rem', color: '#60a5fa', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={11} /> {s.date} at {s.time}</div>
                </div>
                <button
                  onClick={() => setInVideoRoom(s.mentorName)}
                  className="btn-primary"
                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                >
                  <Video size={13} /> Join Room
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Video Consultation Mock Modal */}
      {inVideoRoom && (
        <div className="modal-overlay" onClick={() => setInVideoRoom(null)}>
          <div className="glass-panel" style={{ width: '800px', padding: '24px', background: '#090d16', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Video size={20} color="#22c55e" /> Live Video Advisory Room with {inVideoRoom}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '16px' }}>
              Encrypted WebRTC Session • Connected via GrowUps High-Def Telepresence
            </p>

            <div style={{ height: '360px', background: '#000', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ color: '#4ade80', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} /> Video Stream Active: {inVideoRoom} & {currentUser?.name}
              </div>
              <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: '#1e293b', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', color: '#ffffff' }}>
                Duration: 14:32 min
              </div>
            </div>

            <button onClick={() => setInVideoRoom(null)} className="btn-secondary" style={{ marginTop: '16px' }}>
              Leave Video Room
            </button>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedExpertise(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: selectedExpertise === cat ? '1px solid #3b82f6' : '1px solid #1e293b',
              background: selectedExpertise === cat ? 'rgba(37, 99, 235, 0.25)' : '#0f172a',
              color: selectedExpertise === cat ? '#60a5fa' : '#94a3b8',
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

      {/* Mentors Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
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
              <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #334155' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{mentor.name}</h3>
                    <ShieldCheck size={16} color="#22c55e" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#60a5fa', fontWeight: 600 }}>{mentor.title}</div>
                  <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{mentor.company}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '0.78rem' }}>
                <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}>
                  <Star size={14} fill="#fbbf24" /> {mentor.rating} ({mentor.reviewsCount} reviews)
                </span>
                <span style={{ color: '#94a3b8' }}>• {mentor.sessionsConducted} sessions</span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4, marginBottom: '14px' }}>
                {mentor.bio}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                {mentor.expertise.map((exp, i) => (
                  <span key={i} style={{ fontSize: '0.68rem', background: '#0f172a', border: '1px solid #334155', color: '#cbd5e1', padding: '2px 8px', borderRadius: '4px' }}>
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Advisory Fee:</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#22c55e' }}>
                  ₹{mentor.hourlyRateINR.toLocaleString('en-IN')}<span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/hr</span>
                </span>
              </div>

              <button
                onClick={() => handleStartBooking(mentor)}
                className="btn-razorpay"
                style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              >
                <CreditCard size={14} /> Book via Razorpay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Checkout Modal */}
      {bookingMentor && (
        <div className="modal-overlay" onClick={() => setBookingMentor(null)}>
          <div className="glass-panel" style={{ width: '480px', padding: '24px', background: '#090d16' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              Confirm Advisory Session
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '16px' }}>
              1:1 Video Consultation with <strong>{bookingMentor.name}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Consultation Topic / Goals</label>
                <input type="text" value={sessionTopic} onChange={e => setSessionTopic(e.target.value)} className="input-field" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Date</label>
                  <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} className="input-field" required />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Time Slot</label>
                  <select value={sessionTime} onChange={e => setSessionTime(e.target.value)} className="input-field">
                    <option value="11:00 AM IST">11:00 AM IST</option>
                    <option value="03:00 PM IST">03:00 PM IST</option>
                    <option value="05:00 PM IST">05:00 PM IST</option>
                    <option value="07:30 PM IST">07:30 PM IST</option>
                  </select>
                </div>
              </div>

              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Total Amount Payable:</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#22c55e' }}>₹{bookingMentor.hourlyRateINR.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setBookingMentor(null)} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button onClick={handleRazorpayPayment} className="btn-razorpay" style={{ flex: 2 }}>
                Pay ₹{bookingMentor.hourlyRateINR.toLocaleString('en-IN')} with Razorpay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
