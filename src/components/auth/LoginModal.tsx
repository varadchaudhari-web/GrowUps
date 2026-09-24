import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PERSONA_STORIES, PersonaStory } from '../../types/userStory';
import { CaptchaBox } from './CaptchaBox';
import { X, Lock, Mail, ShieldAlert, Sparkles, UserCheck, ArrowRight, UserPlus, Building, Briefcase, Target, CheckCircle2 } from 'lucide-react';
import { UserRole, StartupStage } from '../../types';

export const LoginModal: React.FC = () => {
  const {
    showLoginModal,
    setShowLoginModal,
    authModalMode,
    setAuthModalMode,
    login,
    register
  } = useAuth();

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('startup_founder');

  // Sign Up / Register state
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signupRole, setSignupRole] = useState<Exclude<UserRole, 'super_admin'>>('startup_founder');
  const [startupName, setStartupName] = useState('');
  const [industry, setIndustry] = useState('B2B SaaS');
  const [stage, setStage] = useState<StartupStage>('MVP');
  const [targetGoal, setTargetGoal] = useState('Build PRD & Launch MVP');

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!showLoginModal) return null;

  // Non-admin roles allowed for public signup
  const PUBLIC_ROLES = [
    { role: 'startup_founder' as const, label: 'Startup Founder' },
    { role: 'aspiring_entrepreneur' as const, label: 'Aspiring Entrepreneur' },
    { role: 'msme_owner' as const, label: 'MSME / Business Owner' },
    { role: 'mentor' as const, label: 'Mentor & Industry Advisor' },
    { role: 'investor' as const, label: 'Angel Investor / VC Scout' },
    { role: 'service_provider' as const, label: 'Professional Service Provider' },
    { role: 'incubator_manager' as const, label: 'Incubator / Accelerator Hub' },
    { role: 'job_seeker' as const, label: 'Freelancer / Job Seeker' }
  ];

  const handleSelectDemoUser = (persona: PersonaStory) => {
    setSignInEmail(persona.demoEmail);
    setSignInPassword(persona.demoPassword);
    setSelectedRole(persona.role);
    setErrorMessage('');
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      setErrorMessage('Please enter your Email and Password.');
      return;
    }
    if (!isCaptchaValid) {
      setErrorMessage('Please complete the Captcha security check.');
      return;
    }

    login(signInEmail, selectedRole);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !signUpEmail || !signUpPassword || !startupName) {
      setErrorMessage('Please fill in all required fields (Name, Email, Password, Startup Name).');
      return;
    }
    if (!isCaptchaValid) {
      setErrorMessage('Please complete the Captcha security verification.');
      return;
    }

    // Register user & persist to local and session storage
    register({
      fullName,
      email: signUpEmail,
      password: signUpPassword,
      role: signupRole,
      startupName,
      industry,
      stage,
      targetGoal
    });

    setSuccessMessage(`Account created successfully as ${signupRole.replace('_', ' ').toUpperCase()}! Redirecting to dashboard...`);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative',
          background: '#090d16',
          border: '1px solid #1e293b',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(34, 197, 94, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowLoginModal(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#94a3b8',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '9999px', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', marginBottom: '10px' }}>
            <Sparkles size={14} color="#22c55e" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {authModalMode === 'signup' ? 'Grow My Startup • Account Creation' : 'Founder & Member Access'}
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: '0 0 6px', fontFamily: 'var(--font-heading)' }}>
            {authModalMode === 'signup' ? 'Create Your GrowUps Account' : 'Welcome back to GrowUps'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '520px', margin: '0 auto' }}>
            {authModalMode === 'signup'
              ? 'Select your role (Founder, Mentor, Investor, MSME, Services) and launch your personalized startup cockpit.'
              : 'Sign in to access your interconnected 25-module startup workspace and AI virtual team.'}
          </p>
        </div>

        {/* Main Mode Toggle Tabs */}
        <div style={{ display: 'flex', background: '#0f172a', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '22px' }}>
          <button
            type="button"
            onClick={() => { setAuthModalMode('signup'); setErrorMessage(''); }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              border: 'none',
              background: authModalMode === 'signup' ? '#22c55e' : 'transparent',
              color: authModalMode === 'signup' ? '#052e16' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <UserPlus size={15} /> Create Account (Grow My Startup)
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalMode('signin'); setErrorMessage(''); }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              border: 'none',
              background: authModalMode === 'signin' ? '#2563eb' : 'transparent',
              color: authModalMode === 'signin' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Lock size={15} /> Sign In / Demo Personas
          </button>
        </div>

        {errorMessage && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px 14px', color: '#fca5a5', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ShieldAlert size={16} /> {errorMessage}
          </div>
        )}

        {successMessage && (
          <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', borderRadius: '8px', padding: '10px 14px', color: '#4ade80', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <CheckCircle2 size={16} /> {successMessage}
          </div>
        )}

        {/* ----------------- SIGN UP (ACCOUNT CREATION) ----------------- */}
        {authModalMode === 'signup' && (
          <form onSubmit={handleSignUpSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Varad Shinde"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Work / Professional Email *
                </label>
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="founder@yourstartup.com"
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Secure Password *
                </label>
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-field"
                  required
                />
              </div>

              {/* ROLE SELECTION (STRICTLY EXCLUDES SUPER ADMIN) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#22c55e', marginBottom: '6px' }}>
                  Select Platform Role * (Tailors Your Dashboard)
                </label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as any)}
                  className="input-field"
                  style={{ border: '1px solid #22c55e', background: '#090d16' }}
                >
                  {PUBLIC_ROLES.map(r => (
                    <option key={r.role} value={r.role}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SUBJECT-SPECIFIC STARTUP INFORMATION */}
            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building size={14} /> Venture / Professional Details
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.725rem', color: '#94a3b8', marginBottom: '4px' }}>
                    Startup / Organization Name *
                  </label>
                  <input
                    type="text"
                    value={startupName}
                    onChange={(e) => setStartupName(e.target.value)}
                    placeholder="e.g. Apex AI Systems"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.725rem', color: '#94a3b8', marginBottom: '4px' }}>
                    Industry / Domain
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="input-field"
                  >
                    <option value="B2B SaaS">B2B SaaS</option>
                    <option value="AI & DeepTech">AI & DeepTech</option>
                    <option value="FinTech & Payments">FinTech & Payments</option>
                    <option value="HealthTech & Bio">HealthTech & Bio</option>
                    <option value="E-Commerce & D2C">E-Commerce & D2C</option>
                    <option value="CleanTech & Energy">CleanTech & Energy</option>
                    <option value="EdTech & Learning">EdTech & Learning</option>
                    <option value="MSME & Manufacturing">MSME & Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.725rem', color: '#94a3b8', marginBottom: '4px' }}>
                    Current Startup Stage
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as StartupStage)}
                    className="input-field"
                  >
                    <option value="Idea">Idea / Discovery</option>
                    <option value="Validation">Problem Validation</option>
                    <option value="MVP">MVP & Build</option>
                    <option value="Early Traction">Early Traction</option>
                    <option value="Revenue">Early Revenue</option>
                    <option value="Growth">Growth & Scale</option>
                    <option value="Scale">Scale Stage</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.725rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Immediate Objective
                </label>
                <input
                  type="text"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  placeholder="e.g. Validate pricing, build PRD roadmap, raise angel round"
                  className="input-field"
                />
              </div>
            </div>

            {/* Security Captcha (Mandatory) */}
            <CaptchaBox onVerified={(isValid) => setIsCaptchaValid(isValid)} />

            <div style={{ marginTop: '16px' }}>
              <button
                type="submit"
                disabled={!isCaptchaValid}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  opacity: isCaptchaValid ? 1 : 0.5,
                  cursor: isCaptchaValid ? 'pointer' : 'not-allowed'
                }}
              >
                Complete Registration & Launch Workspace <ArrowRight size={16} />
              </button>
              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.725rem', color: '#64748b' }}>
                Account stored securely in Local & Session Storage. Accessible on future logins.
              </div>
            </div>
          </form>
        )}

        {/* ----------------- SIGN IN & DEMO USERS ----------------- */}
        {authModalMode === 'signin' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Quick Demo Personas (Auto-Fills Credentials):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                {PERSONA_STORIES.map((p) => {
                  const isSuperAdmin = p.role === 'super_admin';
                  return (
                    <div
                      key={p.role}
                      onClick={() => handleSelectDemoUser(p)}
                      style={{
                        background: isSuperAdmin ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)' : '#0f172a',
                        border: isSuperAdmin ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid #1e293b',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = isSuperAdmin ? '#a855f7' : '#3b82f6'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = isSuperAdmin ? 'rgba(168, 85, 247, 0.5)' : '#1e293b'}
                    >
                      <img src={p.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#60a5fa' }}>{p.demoEmail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSignInSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px' }}>
                  Target Role / Persona
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="input-field"
                >
                  {PERSONA_STORIES.map(p => (
                    <option key={p.role} value={p.role}>
                      {p.title} {p.role === 'super_admin' ? '(Admin — 25 Modules Full Access)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <CaptchaBox onVerified={(isValid) => setIsCaptchaValid(isValid)} />

              <button
                type="submit"
                disabled={!isCaptchaValid}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '14px',
                  opacity: isCaptchaValid ? 1 : 0.5,
                  cursor: isCaptchaValid ? 'pointer' : 'not-allowed'
                }}
              >
                Sign In to Workspace <ArrowRight size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
