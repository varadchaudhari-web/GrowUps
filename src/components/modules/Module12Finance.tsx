import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, TrendingUp, TrendingDown, Plus, Sparkles, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { FinancialTransaction } from '../../types';

export const Module12Finance: React.FC = () => {
  const { financialMetrics, transactions, addTransaction, startupData } = useApp();
  const [scenario, setScenario] = useState<'base' | 'pessimistic' | 'aggressive'>('base');
  const [showAddTx, setShowAddTx] = useState(false);

  const [txType, setTxType] = useState<'income' | 'expense'>('expense');
  const [txCategory, setTxCategory] = useState('Cloud & AI Servers');
  const [txDescription, setTxDescription] = useState('');
  const [txAmount, setTxAmount] = useState(15000);

  const handleAddTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDescription || !txAmount) return;

    addTransaction({
      date: new Date().toISOString().split('T')[0],
      type: txType,
      category: txCategory,
      description: txDescription,
      amount: txAmount
    });

    setTxDescription('');
    setShowAddTx(false);
  };

  // Scenario multipliers
  const scenarioMultiplier = scenario === 'aggressive' ? 1.4 : scenario === 'pessimistic' ? 0.75 : 1.0;
  const simulatedMRR = Math.round(startupData.traction.mrr * scenarioMultiplier);
  const simulatedRunway = scenario === 'aggressive' ? 22 : scenario === 'pessimistic' ? 9.5 : startupData.traction.runwayMonths;

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 12</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Unit Economics & Financial Runway</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Startup Finance & Unit Economics
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Track revenue, burn rate, cash runway, and simulate financial growth scenarios.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => setShowAddTx(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Plus size={14} /> Log Transaction
          </button>
        </div>
      </div>

      {/* Key Metric Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Monthly Recurring (MRR)</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#22c55e', margin: '4px 0' }}>
            ₹{startupData.traction.mrr.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={14} /> +{startupData.traction.growthRatePercent}% MoM
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Annualized Run-Rate (ARR)</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#60a5fa', margin: '4px 0' }}>
            ₹{(startupData.traction.mrr * 12).toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Annualized Contract Value</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Net Monthly Burn</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#f87171', margin: '4px 0' }}>
            ₹{startupData.traction.burnRate.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cloud, Team & Marketing</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Cash Runway</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#fbbf24', margin: '4px 0' }}>
            {startupData.traction.runwayMonths} Months
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>Sufficient for Seed Round</div>
        </div>
      </div>

      {/* Unit Economics Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={18} color="#22c55e" /> Unit Economics Health Check
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Customer Acquisition Cost (CAC):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>₹{financialMetrics.cac.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Estimated Lifetime Value (LTV):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80' }}>₹{financialMetrics.ltv.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>LTV / CAC Ratio:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#22c55e' }}>
                {(financialMetrics.ltv / financialMetrics.cac).toFixed(1)}x (Healthy &gt; 3x)
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>CAC Payback Period:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>{financialMetrics.cacPaybackMonths} Months</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#090d16', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Gross Margin:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a855f7' }}>{financialMetrics.grossMarginPercent}%</span>
            </div>
          </div>
        </div>

        {/* Financial Scenario Simulator */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#a855f7" /> Scenario Forecast Simulator
            </h2>
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['pessimistic', 'base', 'aggressive'] as const).map(sc => (
                <button
                  key={sc}
                  onClick={() => setScenario(sc)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: scenario === sc ? '1px solid #a855f7' : '1px solid #334155',
                    background: scenario === sc ? 'rgba(124, 58, 237, 0.25)' : '#0f172a',
                    color: scenario === sc ? '#c084fc' : '#94a3b8',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    cursor: 'pointer'
                  }}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Simulated 6-Month MRR ({scenario})</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: scenario === 'aggressive' ? '#22c55e' : scenario === 'pessimistic' ? '#f87171' : '#60a5fa', margin: '4px 0' }}>
              ₹{simulatedMRR.toLocaleString('en-IN')} / mo
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
              Simulated Runway: <strong style={{ color: '#fbbf24' }}>{simulatedRunway} Months</strong>
            </div>
          </div>

          <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
            <em>Scenario Note: In the <strong>{scenario}</strong> case, assuming CAC changes by ±20% and conversion rates fluctuate based on market macroeconomic factors.</em>
          </p>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTx && (
        <div style={{ background: '#090d16', border: '1px solid #3b82f6', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>Log Cash Transaction</h3>
          <form onSubmit={handleAddTx} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Type</label>
              <select value={txType} onChange={(e) => setTxType(e.target.value as any)} className="input-field">
                <option value="income">Income (Revenue / Inflow)</option>
                <option value="expense">Expense (Outflow)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Category</label>
              <input type="text" value={txCategory} onChange={(e) => setTxCategory(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Description</label>
              <input type="text" value={txDescription} onChange={(e) => setTxDescription(e.target.value)} placeholder="e.g. AWS Invoice" className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Amount (INR)</label>
              <input type="number" value={txAmount} onChange={(e) => setTxAmount(parseInt(e.target.value, 10) || 0)} className="input-field" required />
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <button type="submit" className="btn-primary" style={{ padding: '10px 16px' }}>Save Entry</button>
              <button type="button" onClick={() => setShowAddTx(false)} className="btn-secondary" style={{ padding: '10px 16px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Transactions Table */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
          Recent Financial Transactions ({transactions.length})
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '10px', color: '#f8fafc' }}>Date</th>
              <th style={{ padding: '10px', color: '#94a3b8' }}>Type</th>
              <th style={{ padding: '10px', color: '#cbd5e1' }}>Category</th>
              <th style={{ padding: '10px', color: '#cbd5e1' }}>Description</th>
              <th style={{ padding: '10px', color: '#f8fafc', textAlign: 'right' }}>Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '10px', color: '#94a3b8' }}>{tx.date}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: tx.type === 'income' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: tx.type === 'income' ? '#4ade80' : '#f87171' }}>
                    {tx.type.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '10px', color: '#cbd5e1' }}>{tx.category}</td>
                <td style={{ padding: '10px', color: '#f8fafc', fontWeight: 500 }}>{tx.description}</td>
                <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700, color: tx.type === 'income' ? '#22c55e' : '#f87171' }}>
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
