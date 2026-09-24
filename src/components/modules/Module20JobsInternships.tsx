import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BriefcaseBusiness, Plus, MapPin, DollarSign, Send, CheckCircle2, Clock, Filter, Calendar } from 'lucide-react';
import { StartupJob } from '../../types';

export const Module20JobsInternships: React.FC = () => {
  const { jobsList, postJob, startupData } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [roleType, setRoleType] = useState<StartupJob['roleType']>('Full-Time');
  const [location, setLocation] = useState('Remote / India');
  const [stipendOrSalary, setStipendOrSalary] = useState('₹15 LPA – ₹22 LPA');
  const [skillsRequired, setSkillsRequired] = useState('React, TypeScript, Node.js');
  const [description, setDescription] = useState('');

  const types = ['All', 'Full-Time', 'Internship', 'Founders Office', 'Equity-Based', 'Freelance'];

  const filteredJobs = selectedType === 'All'
    ? jobsList
    : jobsList.filter(j => j.roleType === selectedType);

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    postJob({
      startupName: startupData.name,
      title,
      roleType,
      location,
      stipendOrSalary,
      skillsRequired: skillsRequired.split(',').map(s => s.trim()).filter(Boolean),
      description
    });

    setTitle('');
    setDescription('');
    setShowPostModal(false);
  };

  const handleApply = (id: string) => {
    setAppliedJobId(id);
    setTimeout(() => {
      alert('Application & GrowUps Profile sent directly to the Hiring Founder!');
    }, 400);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 20</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Startup Jobs, Gigs & Internships</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Startup Jobs & Internships Ecosystem
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Hire high-conviction early builders, Founder's Office interns, and equity-aligned engineers.
          </p>
        </div>

        <button onClick={() => setShowPostModal(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
          <Plus size={14} /> Post Startup Opening
        </button>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div style={{ background: '#090d16', border: '1px solid #3b82f6', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>Post Job Opening for {startupData.name}</h3>
          <form onSubmit={handlePostJob} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Job Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Lead Frontend Engineer" className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Role Type</label>
              <select value={roleType} onChange={e => setRoleType(e.target.value as any)} className="input-field">
                <option value="Full-Time">Full-Time</option>
                <option value="Internship">Internship</option>
                <option value="Founders Office">Founders Office</option>
                <option value="Equity-Based">Equity-Based</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Salary / Stipend</label>
              <input type="text" value={stipendOrSalary} onChange={e => setStipendOrSalary(e.target.value)} className="input-field" required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Skills Required (comma separated)</label>
              <input type="text" value={skillsRequired} onChange={e => setSkillsRequired(e.target.value)} className="input-field" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Role Description & Responsibilities</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="input-field" rows={3} required />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary" style={{ padding: '8px 16px' }}>Publish Job</button>
              <button type="button" onClick={() => setShowPostModal(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Role Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {types.map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: selectedType === t ? '1px solid #3b82f6' : '1px solid #1e293b',
              background: selectedType === t ? 'rgba(37, 99, 235, 0.25)' : '#0f172a',
              color: selectedType === t ? '#60a5fa' : '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredJobs.map((job) => (
          <div
            key={job.id}
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
                <div>
                  <span style={{ fontSize: '0.725rem', color: '#60a5fa', fontWeight: 700 }}>{job.startupName}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{job.title}</h3>
                </div>
                <span className="badge-stage" style={{ fontSize: '0.68rem' }}>{job.roleType}</span>
              </div>

              <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '12px' }}>
                <span><MapPin size={12} style={{ display: 'inline' }} /> {job.location}</span>
                <span>• <Calendar size={12} style={{ display: 'inline' }} /> Posted: {job.postedDate}</span>
              </div>

              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#22c55e', marginBottom: '12px' }}>
                {job.stipendOrSalary} {job.equityPercent ? `+ ${job.equityPercent} Equity` : ''}
              </div>

              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4, marginBottom: '14px' }}>
                {job.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                {job.skillsRequired.map((skill, i) => (
                  <span key={i} style={{ fontSize: '0.68rem', background: '#0f172a', border: '1px solid #334155', color: '#cbd5e1', padding: '2px 8px', borderRadius: '4px' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => handleApply(job.id)}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.78rem' }}
              >
                {appliedJobId === job.id ? <><CheckCircle2 size={13} /> Applied</> : <><Send size={13} /> 1-Click Apply</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
