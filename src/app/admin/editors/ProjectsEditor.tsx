'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import type { Project } from '@/types/database'

export default function ProjectsEditor({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(projects[0]?.id ?? null)

  const addProject = () => {
    const p: Project = {
      id: `new-${Date.now()}`,
      title: '',
      description: '',
      tech_stack: [],
      image_url: null,
      github_url: null,
      live_url: null,
      category: 'Web',
      featured: false,
      sort_order: projects.length,
    }
    setProjects(ps => [...ps, p])
    setExpanded(p.id)
  }

  const update = (id: string, key: keyof Project, value: Project[keyof Project]) =>
    setProjects(ps => ps.map(p => p.id === id ? { ...p, [key]: value } : p))

  const removeProject = (id: string) => setProjects(ps => ps.filter(p => p.id !== id))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('projects').delete().neq('id', 'none')
    const toInsert = projects.map(({ id, ...rest }, i) => ({ ...rest, sort_order: i }))
    const { error } = await supabase.from('projects').insert(toInsert)
    if (error) toast.error('Save failed: ' + error.message)
    else toast.success('Projects saved!')
    setSaving(false)
  }

  const CATEGORIES = ['Web', 'Mobile', 'AI/ML', 'Data', 'Open Source', 'Other']

  return (
    <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Projects</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Manage your portfolio projects</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={addProject} className="btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}>
            <Plus size={14} /> Add Project
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="glass-card" style={{ overflow: 'hidden' }}>
          <button
            onClick={() => setExpanded(expanded === project.id ? null : project.id)}
            style={{ width: '100%', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'inherit' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{project.title || 'New Project'}</span>
              {project.featured && (
                <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.3)', fontWeight: 700 }}>Featured</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button onClick={e => { e.stopPropagation(); removeProject(project.id) }} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '7px', cursor: 'pointer', color: '#fca5a5', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={13} />
              </button>
              {expanded === project.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {expanded === project.id && (
            <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="admin-label">Title</label>
                  <input type="text" value={project.title} onChange={e => update(project.id, 'title', e.target.value)} placeholder="Project Title" className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Category</label>
                  <select value={project.category ?? 'Web'} onChange={e => update(project.id, 'category', e.target.value)} className="admin-input" style={{ cursor: 'pointer' }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea rows={3} value={project.description ?? ''} onChange={e => update(project.id, 'description', e.target.value)} placeholder="What does this project do?" className="admin-input" style={{ resize: 'vertical' }} />
              </div>

              <div>
                <label className="admin-label">Tech Stack (comma-separated)</label>
                <input type="text" value={(project.tech_stack ?? []).join(', ')} onChange={e => update(project.id, 'tech_stack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="React, TypeScript, Supabase" className="admin-input" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="admin-label">GitHub URL</label>
                  <input type="text" value={project.github_url ?? ''} onChange={e => update(project.id, 'github_url', e.target.value)} placeholder="https://github.com/..." className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Live URL</label>
                  <input type="text" value={project.live_url ?? ''} onChange={e => update(project.id, 'live_url', e.target.value)} placeholder="https://..." className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Image URL</label>
                  <input type="text" value={project.image_url ?? ''} onChange={e => update(project.id, 'image_url', e.target.value)} placeholder="https://..." className="admin-input" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
                  <input id={`featured-${project.id}`} type="checkbox" checked={project.featured} onChange={e => update(project.id, 'featured', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#8b5cf6', cursor: 'pointer' }} />
                  <label htmlFor={`featured-${project.id}`} style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>Featured project</label>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {projects.length === 0 && (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No projects yet. Click &ldquo;Add Project&rdquo; to add one.
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
