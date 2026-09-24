import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Star, Clock, CheckCircle2, Award, PlayCircle, CreditCard, Sparkles, Download } from 'lucide-react';
import { openRazorpayCheckout } from '../../utils/razorpay';
import { CourseTrack } from '../../types';

export const Module21LearningAcademy: React.FC = () => {
  const { coursesList, enrolledCourses, enrollInCourse, addPaymentRecord } = useApp();
  const { currentUser } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [activeCourseModal, setActiveCourseModal] = useState<CourseTrack | null>(null);

  const tracks = ['All', 'Fundraising', 'Product', 'Sales', 'Marketing', 'Finance', 'Technology', 'Leadership', 'Operations'];

  const filteredCourses = selectedTrack === 'All'
    ? coursesList
    : coursesList.filter(c => c.trackName === selectedTrack);

  const handleEnrollRazorpay = (course: CourseTrack) => {
    openRazorpayCheckout({
      amountINR: course.priceINR,
      purpose: 'Academy Pro Certification',
      description: `Lifetime Enrollment: ${course.title}`,
      userName: currentUser?.name || 'Founder',
      userEmail: currentUser?.email || 'founder@cloudpulse.ai',
      onSuccess: (res) => {
        enrollInCourse(course.id, res.razorpay_payment_id);
        addPaymentRecord({
          razorpayPaymentId: res.razorpay_payment_id,
          amountINR: course.priceINR,
          userEmail: currentUser?.email || 'founder@cloudpulse.ai',
          purpose: `Academy Course: ${course.title}`,
          status: 'captured'
        });
        alert(`Successfully Enrolled in ${course.title} via Razorpay!\n\nPayment ID: ${res.razorpay_payment_id}\nYour verified course track & certificate are unlocked.`);
        setActiveCourseModal(null);
      }
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 21</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Founder Masterclasses & Certified Playbooks</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Founder Learning Academy
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Master fundraising, GTM, product scoping, and legal compliance with certified practitioner playbooks.
          </p>
        </div>

        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 14px', fontSize: '0.78rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={14} color="#4ade80" /> Verifiable Blockchain Certificates
        </div>
      </div>

      {/* Track Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {tracks.map(tr => (
          <button
            key={tr}
            onClick={() => setSelectedTrack(tr)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: selectedTrack === tr ? '1px solid #3b82f6' : '1px solid #1e293b',
              background: selectedTrack === tr ? 'rgba(37, 99, 235, 0.25)' : '#0f172a',
              color: selectedTrack === tr ? '#60a5fa' : '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tr}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledCourses.includes(course.id);

          return (
            <div
              key={course.id}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className="badge-stage" style={{ fontSize: '0.68rem' }}>{course.trackName}</span>
                  <span style={{ color: '#fbbf24', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}>
                    <Star size={13} fill="#fbbf24" /> {course.rating} ({course.enrolledStudents} founders)
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                  {course.title}
                </h3>

                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4, marginBottom: '14px' }}>
                  {course.description}
                </p>

                <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '14px' }}>
                  <span><Clock size={12} style={{ display: 'inline' }} /> {course.durationMinutes} Mins</span>
                  <span>• {course.lessonsCount} Modules</span>
                  <span>• {course.level}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Certification Fee:</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 900, color: isEnrolled ? '#4ade80' : '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isEnrolled ? (
                      <><CheckCircle2 size={16} color="#4ade80" /> Enrolled</>
                    ) : (
                      `₹${course.priceINR.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>

                {isEnrolled ? (
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.78rem' }}
                  >
                    <PlayCircle size={14} /> Start Lessons
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnrollRazorpay(course)}
                    className="btn-razorpay"
                    style={{ padding: '8px 16px', fontSize: '0.78rem' }}
                  >
                    <CreditCard size={14} /> Enroll (Razorpay)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Player / Curriculum Modal */}
      {activeCourseModal && (
        <div className="modal-overlay" onClick={() => setActiveCourseModal(null)}>
          <div className="glass-panel" style={{ width: '680px', padding: '28px', background: '#090d16' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span className="badge-stage" style={{ fontSize: '0.7rem' }}>Masterclass Portal</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                  {activeCourseModal.title}
                </h3>
              </div>
              <span style={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={14} color="#4ade80" /> Certificate: Unlocked
              </span>
            </div>

            <div style={{ background: '#000', height: '220px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', gap: '8px' }}>
              <PlayCircle size={24} color="#60a5fa" /> Video Lesson 1: Institutional Valuation Mechanics & Term Sheets
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>Downloadable Masterclass Resources:</div>
              <div style={{ background: '#0f172a', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={14} color="#60a5fa" /> Series Seed Term Sheet Template & SHA Checklist.docx
                </span>
                <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem' }}><Download size={12} /> Download</button>
              </div>
            </div>

            <button onClick={() => setActiveCourseModal(null)} className="btn-secondary" style={{ width: '100%' }}>
              Close Player
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
