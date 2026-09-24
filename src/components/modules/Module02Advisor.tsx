import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Send, Sparkles, Trash2, AlertTriangle, CheckCircle2, ArrowRight, Lightbulb, Zap } from 'lucide-react';

const QUICK_PROMPTS = [
  "How should I price my SaaS?",
  "What should my MVP include for v1.0?",
  "How can I acquire my first 100 customers?",
  "Calculate my CAC Payback period and runway risks",
  "I have an idea but don't know where to start."
];

export const Module02Advisor: React.FC = () => {
  const { advisorMessages, sendAdvisorMessage, clearAdvisorChat, startupData, setActiveModuleId } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [advisorMessages, isTyping]);

  const handleSend = (text?: string) => {
    const query = text || inputText;
    if (!query.trim()) return;

    setInputText('');
    setIsTyping(true);
    sendAdvisorMessage(query);
    setTimeout(() => {
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px - 45px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 2</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Conversational Intelligence Companion</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            AI Startup Advisor <span style={{ fontSize: '0.75rem', background: '#7c3aed', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>Stage: {startupData.stage}</span>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={clearAdvisorChat}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            title="Reset Chat History"
          >
            <Trash2 size={14} /> Clear Chat
          </button>
        </div>
      </div>

      {/* Distinction Reminder Alert */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid #1e293b',
        borderRadius: '10px',
        padding: '10px 16px',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.78rem',
        color: '#94a3b8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={15} color="#fbbf24" />
          <span>GrowUps AI clearly separates <strong style={{ color: '#f87171' }}>Hypothetical Assumptions</strong> from <strong style={{ color: '#4ade80' }}>Verified Business Telemetry</strong>.</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-verified">Verified Data</span>
          <span className="badge-assumption">AI Assumption</span>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="glass-panel" style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {advisorMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                alignSelf: isUser ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px',
                fontSize: '0.75rem',
                color: '#64748b'
              }}>
                {!isUser && <Bot size={14} color="#a855f7" />}
                <span>{isUser ? 'You (Founder)' : 'GrowUps Advisor'}</span>
                <span>• {msg.timestamp}</span>
                {!isUser && msg.isAssumption !== undefined && (
                  msg.isAssumption ? (
                    <span className="badge-assumption" title="This recommendation contains market assumptions; validate with customers.">
                      Hypothesis / Assumption
                    </span>
                  ) : (
                    <span className="badge-verified">
                      Verified Heuristic
                    </span>
                  )
                )}
              </div>

              <div style={{
                background: isUser ? '#2563eb' : '#0f172a',
                color: '#f8fafc',
                border: isUser ? '1px solid #3b82f6' : '1px solid #1e293b',
                borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                padding: '14px 18px',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                boxShadow: isUser ? '0 4px 14px rgba(37, 99, 235, 0.25)' : 'none',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>

              {/* Action Suggestions */}
              {msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {msg.actionSuggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      style={{
                        background: 'rgba(124, 58, 237, 0.12)',
                        border: '1px solid rgba(124, 58, 237, 0.35)',
                        color: '#c084fc',
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s'
                      }}
                    >
                      <Sparkles size={11} /> {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>
            <Bot size={16} color="#a855f7" className="animate-spin" />
            <span>GrowUps AI is analyzing strategy telemetry...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '10px', paddingBottom: '4px' }}>
        {QUICK_PROMPTS.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#cbd5e1',
              fontSize: '0.75rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s'
            }}
          >
            <Lightbulb size={12} color="#fbbf24" /> {qp}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask about pricing, MVP scope, CAC, 100 first users for ${startupData.name}...`}
          className="input-field"
          style={{ flex: 1, padding: '12px 16px', fontSize: '0.9rem' }}
        />
        <button
          type="submit"
          className="btn-ai"
          style={{ padding: '0 20px' }}
        >
          <Send size={16} /> Ask AI
        </button>
      </form>
    </div>
  );
};
