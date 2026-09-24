import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KanbanSquare, Plus, Trash2, Calendar, User, Tag, AlertTriangle, Sparkles, CheckCircle2, Flag } from 'lucide-react';
import { WorkspaceTask } from '../../types';

export const Module08Workspace: React.FC = () => {
  const { tasks, addTask, updateTaskStatus, deleteTask, milestones, addMilestone } = useApp();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('Aarav Patel');
  const [priority, setPriority] = useState<WorkspaceTask['priority']>('medium');
  const [dueDate, setDueDate] = useState('2026-10-15');
  const [tagInput, setTagInput] = useState('Sprint, MVP');

  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDate, setMilestoneDate] = useState('2026-11-01');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      assignee,
      status: 'todo',
      priority,
      dueDate,
      tags: tagInput.split(',').map(t => t.trim()).filter(Boolean)
    });

    setTitle('');
    setDescription('');
    setShowAddTask(false);
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneTitle.trim()) return;
    addMilestone(milestoneTitle, milestoneDate);
    setMilestoneTitle('');
    setShowAddMilestone(false);
  };

  const columns: Array<{ id: WorkspaceTask['status']; title: string; color: string }> = [
    { id: 'todo', title: 'To Do', color: '#64748b' },
    { id: 'inprogress', title: 'In Progress', color: '#3b82f6' },
    { id: 'review', title: 'Review & QA', color: '#a855f7' },
    { id: 'done', title: 'Done & Shipped', color: '#22c55e' }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 8</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Agile Execution & Sprints</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Startup Project Workspace
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Kanban boards, milestone roadmaps, team assignments, and AI weekly startup summaries.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => setShowAddMilestone(true)} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Flag size={14} /> Add Milestone
          </button>
          <button onClick={() => setShowAddTask(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
            <Plus size={14} /> Create Task
          </button>
        </div>
      </div>

      {/* AI Weekly Startup Summary & Delay Alert */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={20} color="#c084fc" />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
              AI Weekly Sprint Audit: 4 of 6 Sprint Tasks Completed (66% Velocity)
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
              Zero critical blockers detected. 1 task is approaching deadline in 2 days.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '0.75rem', background: '#090d16', border: '1px solid #334155', padding: '4px 10px', borderRadius: '6px', color: '#4ade80' }}>
            Velocity: High
          </span>
        </div>
      </div>

      {/* Modals for Adding */}
      {showAddTask && (
        <div style={{ background: '#090d16', border: '1px solid #3b82f6', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>Create Workspace Sprint Task</h3>
          <form onSubmit={handleCreateTask} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Task Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Audit Kubernetes memory spikes" className="input-field" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Assignee</label>
              <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} className="input-field" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as any)} className="input-field">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Due Date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input-field" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Description / Acceptance Criteria</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" rows={2} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary" style={{ padding: '8px 16px' }}>Save Task</button>
              <button type="button" onClick={() => setShowAddTask(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {showAddMilestone && (
        <div style={{ background: '#090d16', border: '1px solid #a855f7', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>Add Strategic Milestone</h3>
          <form onSubmit={handleCreateMilestone} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input type="text" value={milestoneTitle} onChange={(e) => setMilestoneTitle(e.target.value)} placeholder="Milestone Title..." className="input-field" style={{ flex: 1 }} required />
            <input type="date" value={milestoneDate} onChange={(e) => setMilestoneDate(e.target.value)} className="input-field" style={{ width: '180px' }} />
            <button type="submit" className="btn-ai">Save Milestone</button>
            <button type="button" onClick={() => setShowAddMilestone(false)} className="btn-secondary">Cancel</button>
          </form>
        </div>
      )}

      {/* Milestones Horizontal Bar */}
      <div className="glass-panel" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flag size={14} color="#f59e0b" /> Key Startup Milestones
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {milestones.map((m) => (
            <div key={m.id} style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{m.title}</div>
                <div style={{ fontSize: '0.725rem', color: '#60a5fa', marginTop: '2px' }}>Target: {m.targetDate}</div>
              </div>
              <span className="badge-stage" style={{ fontSize: '0.65rem' }}>{m.completedTasksCount}/{m.tasksCount} Done</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '16px' }}>
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div
              key={col.id}
              className="glass-panel"
              style={{
                padding: '16px',
                background: '#090d16',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '480px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{col.title}</h3>
                <span style={{ fontSize: '0.725rem', background: '#1e293b', color: '#94a3b8', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks in Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {colTasks.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      background: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '10px',
                      padding: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          background: t.priority === 'urgent' ? 'rgba(239, 68, 68, 0.2)' : t.priority === 'high' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                          color: t.priority === 'urgent' ? '#f87171' : t.priority === 'high' ? '#fbbf24' : '#60a5fa'
                        }}
                      >
                        {t.priority}
                      </span>
                      <button
                        onClick={() => deleteTask(t.id)}
                        style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                        title="Delete Task"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: '6px' }}>
                      {t.title}
                    </div>

                    {t.description && (
                      <p style={{ fontSize: '0.725rem', color: '#94a3b8', marginBottom: '8px', lineHeight: 1.3 }}>
                        {t.description}
                      </p>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', borderTop: '1px solid #1e293b', paddingTop: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={11} /> {t.assignee}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={11} /> {t.dueDate}</span>
                    </div>

                    {/* Move Column Selector */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                      {columns.filter(c => c.id !== t.status).map(targetCol => (
                        <button
                          key={targetCol.id}
                          onClick={() => updateTaskStatus(t.id, targetCol.id)}
                          style={{
                            flex: 1,
                            background: '#1e293b',
                            border: 'none',
                            color: '#94a3b8',
                            fontSize: '0.65rem',
                            padding: '3px 4px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          &rarr; {targetCol.id}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
