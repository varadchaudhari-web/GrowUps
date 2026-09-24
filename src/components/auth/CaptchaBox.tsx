import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface CaptchaBoxProps {
  onVerified: (isValid: boolean) => void;
}

export const CaptchaBox: React.FC<CaptchaBoxProps> = ({ onVerified }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState<'+' | 'x'>('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const generateChallenge = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 6) + 1;
    const op = Math.random() > 0.5 ? '+' : 'x';
    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setUserAnswer('');
    setIsVerified(false);
    setError(false);
    onVerified(false);
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const handleVerify = (val: string) => {
    setUserAnswer(val);
    const expected = operator === '+' ? num1 + num2 : num1 * num2;
    if (parseInt(val, 10) === expected) {
      setIsVerified(true);
      setError(false);
      onVerified(true);
    } else {
      setIsVerified(false);
      if (val.length >= String(expected).length) {
        setError(true);
      }
      onVerified(false);
    }
  };

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.9)',
      border: isVerified ? '1px solid #22c55e' : error ? '1px solid #ef4444' : '1px solid #334155',
      borderRadius: '10px',
      padding: '12px 14px',
      marginTop: '12px',
      marginBottom: '14px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="#60a5fa" /> Security Captcha Verification:
        </span>
        <button
          type="button"
          onClick={generateChallenge}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#60a5fa',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem'
          }}
          title="Refresh Captcha"
        >
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '1px dashed #475569',
          borderRadius: '8px',
          padding: '6px 14px',
          fontFamily: 'monospace',
          fontSize: '1rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          color: '#38bdf8',
          userSelect: 'none'
        }}>
          {num1} {operator} {num2} = ?
        </div>

        <input
          type="number"
          value={userAnswer}
          onChange={(e) => handleVerify(e.target.value)}
          placeholder="Enter answer"
          style={{
            flex: 1,
            background: '#090d16',
            border: isVerified ? '1px solid #22c55e' : '1px solid #334155',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />

        {isVerified && (
          <div style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
            <CheckCircle2 size={18} /> Verified
          </div>
        )}

        {error && !isVerified && (
          <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
            <AlertCircle size={16} /> Incorrect
          </div>
        )}
      </div>
      <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '6px' }}>
        Solve the quick math challenge to prove you are human.
      </p>
    </div>
  );
};
