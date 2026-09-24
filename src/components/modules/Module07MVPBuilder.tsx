import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Plus, Trash2, CheckCircle2, Sparkles, Layers, ArrowRight, Server, Database, Cloud, Code } from 'lucide-react';
import { UserStory } from '../../types';

export const Module07MVPBuilder: React.FC = () => {
  const { userStories, addUserStory, updateUserStory, deleteUserStory, techStacks, syncStoriesToKanban, setActiveModuleId } = useApp();
  const [showAddStory, setShowAddStory] = useState(false);
  const [synced, setSynced] = useState(false);

  const [newRole, setNewRole] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newPriority, setNewPriority] = useState<UserStory['priority']>('Must Have');

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole || !newGoal) return;

    addUserStory({
      role: newRole,
      goal: newGoal,
      benefit: newBenefit || 'So that the core product workflow is satisfied',
      priority: newPriority,
      status: 'Backlog'
    });

    setNewRole('');
    setNewGoal('');
    setNewBenefit('');
    setShowAddStory(false);
  };

  const handleSync = () => {
    syncStoriesToKanban();
    setSynced(true);
    setTimeout(() => setSynced(false), 3000);
  };

  const totalEstimatedTechCost = techStacks.reduce((acc, curr) => acc + curr.estimatedCostPerMonth, 0);

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1250px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 7</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>PRD, Feature Scope & Architecture</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            MVP & Product Builder
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Translate business ideas into buildable products: PRD, MoSCoW user stories, and architecture blueprints.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {synced && (
            <span style={{ color: '#4ade80', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> Stories Synced to Module 8 Kanban!
            </span>
          )}
          <button onClick={handleSync} className="btn-ai" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Layers size={14} /> Sync Stories to Workspace Tasks
          </button>
          <button onClick={() => setShowAddStory(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Plus size={14} /> Add User Story
          </button>
        </div>
      </div>

      {/* Add Story Modal/Form */}
      {showAddStory && (
        <div style={{ background: '#090d16', border: '1px solid #3b82f6', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
            Create New MVP User Story (Agile Format)
          </h3>
          <form onSubmit={handleCreateStory} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>As a [Role]</label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. DevOps Engineer"
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>I want to [Action / Goal]</label>
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="e.g. Connect AWS IAM in 2 clicks"
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>So that [Business Benefit]</label>
              <input
                type="text"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="e.g. We can scan idle resources"
                className="input-field"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>MoSCoW Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="input-field"
              >
                <option value="Must Have">Must Have (MVP Critical)</option>
                <option value="Should Have">Should Have</option>
                <option value="Could Have">Could Have</option>
                <option value="Won't Have">Won't Have (Post-MVP)</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1, padding: '10px' }}>
                Save Story
              </button>
              <button type="button" onClick={() => setShowAddStory(false)} className="btn-secondary" style={{ padding: '10px' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* User Stories Table */}
      <div className="glass-panel" style={{ padding: '22px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} color="#60a5fa" /> MVP Prioritization & User Stories ({userStories.length})
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Must Haves: <strong style={{ color: '#ef4444' }}>{userStories.filter(s => s.priority === 'Must Have').length}</strong> | Done: <strong style={{ color: '#22c55e' }}>{userStories.filter(s => s.status === 'Done').length}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {userStories.map((story) => (
            <div
              key={story.id}
              style={{
                background: '#090d16',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.725rem', background: '#1e293b', color: '#60a5fa', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    {story.role}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: story.priority === 'Must Have' ? 'rgba(239, 68, 68, 0.15)' : story.priority === 'Should Have' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                      color: story.priority === 'Must Have' ? '#f87171' : story.priority === 'Should Have' ? '#fbbf24' : '#60a5fa'
                    }}
                  >
                    {story.priority}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>
                  I want to {story.goal}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                  {story.benefit}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select
                  value={story.status}
                  onChange={(e) => updateUserStory(story.id, { status: e.target.value as any })}
                  style={{
                    background: '#0f172a',
                    color: story.status === 'Done' ? '#4ade80' : '#cbd5e1',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Backlog">Backlog</option>
                  <option value="In Development">In Development</option>
                  <option value="Testing">Testing</option>
                  <option value="Done">Done (Validated)</option>
                </select>

                <button
                  onClick={() => deleteUserStory(story.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  title="Delete Story"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Tech Stack & Cost Estimation */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={18} color="#a855f7" /> Recommended Tech Stack & Infrastructure Blueprint
            </h2>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
              Optimized for high velocity, TypeScript type-safety, and minimal MVP operating overhead.
            </p>
          </div>
          <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.35)', borderRadius: '8px', padding: '6px 14px', color: '#4ade80', fontSize: '0.85rem', fontWeight: 700 }}>
            Est. Monthly Infra Cost: ₹{totalEstimatedTechCost.toLocaleString('en-IN')}/mo
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {techStacks.map((tech, idx) => (
            <div key={idx} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.725rem', color: '#a855f7', fontWeight: 700, textTransform: 'uppercase' }}>{tech.category}</span>
                <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600 }}>₹{tech.estimatedCostPerMonth}/mo</span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                {tech.recommended}
              </div>
              <p style={{ fontSize: '0.725rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '8px' }}>
                {tech.rationale}
              </p>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                <strong>Alternatives:</strong> {tech.alternatives.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
