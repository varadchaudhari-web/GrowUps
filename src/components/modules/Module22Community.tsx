import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Heart, MessageCircle, Share2, Plus, Sparkles, Filter, Tag } from 'lucide-react';
import { CommunityPost } from '../../types';

export const Module22Community: React.FC = () => {
  const { communityPosts, addCommunityPost, likeCommunityPost, startupData } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<CommunityPost['postType']>('Discussion');
  const [tagInput, setTagInput] = useState('#SaaS, #BuildInPublic');

  const filters = ['All', 'Founder Story', 'Question', 'Discussion', 'Demo Day', 'Collaboration'];

  const filteredPosts = selectedFilter === 'All'
    ? communityPosts
    : communityPosts.filter(p => p.postType === selectedFilter);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addCommunityPost(
      title,
      content,
      postType,
      tagInput.split(',').map(t => t.trim()).filter(Boolean)
    );

    setTitle('');
    setContent('');
    setShowCreateModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-stage">Module 22</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Peer Ecosystem & Demo Days</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
            Startup Community & AMA Feed
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '4px' }}>
            Connect with fellow founders, ask hard questions, share traction milestones, and collaborate.
          </p>
        </div>

        <button onClick={() => setShowCreateModal(true)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
          <Plus size={14} /> New Community Post
        </button>
      </div>

      {/* Post Modal */}
      {showCreateModal && (
        <div style={{ background: '#090d16', border: '1px solid #3b82f6', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>Publish to Founder Feed</h3>
          <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Post Headline</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. How we closed our first 10 enterprise design partners" className="input-field" required />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Post Category</label>
                <select value={postType} onChange={e => setPostType(e.target.value as any)} className="input-field">
                  <option value="Founder Story">Founder Story</option>
                  <option value="Question">Question / Help Needed</option>
                  <option value="Discussion">Discussion</option>
                  <option value="Collaboration">Collaboration Request</option>
                  <option value="Demo Day">Demo Day Announcement</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Content / Learnings</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share your authentic journey, metrics, or questions..." className="input-field" rows={4} required />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hashtags (comma separated)</label>
              <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="#FinOps, #SaaS, #Bootstrapped" className="input-field" />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary" style={{ padding: '8px 16px' }}>Publish Post</button>
              <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: selectedFilter === f ? '1px solid #3b82f6' : '1px solid #1e293b',
              background: selectedFilter === f ? 'rgba(37, 99, 235, 0.25)' : '#0f172a',
              color: selectedFilter === f ? '#60a5fa' : '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Community Feed Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="glass-panel"
            style={{
              padding: '22px',
              background: '#090d16',
              border: '1px solid #1e293b'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{post.authorName}</div>
                  <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{post.authorRole} • {post.postedAt}</div>
                </div>
              </div>

              <span className="badge-stage" style={{ fontSize: '0.68rem' }}>{post.postType}</span>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              {post.title}
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '14px', whiteSpace: 'pre-wrap' }}>
              {post.content}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {post.tags.map((t, i) => (
                <span key={i} style={{ fontSize: '0.7rem', color: '#60a5fa' }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #1e293b', paddingTop: '12px' }}>
              <button
                onClick={() => likeCommunityPost(post.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: post.likesCount > 0 ? '#f43f5e' : '#94a3b8',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Heart size={15} fill={post.likesCount > 0 ? '#f43f5e' : 'none'} /> {post.likesCount} Helpful
              </button>

              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <MessageCircle size={15} /> {post.commentsCount} Comments
              </button>

              <button
                onClick={() => alert('Post link copied to clipboard!')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
