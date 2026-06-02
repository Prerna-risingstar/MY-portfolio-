'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import type { Experience } from '@/types/database'

export default function ExperienceEditor({ initialExperiences }: { initialExperiences: Experience[] }) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences)
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(experiences[0]?.id ?? null)

  const addExperience = () => {
    const newExp: Experience = {
      id: `new-${Date.now()}`,
      company: '',
      position: '',
      duration: '',
      start_date: null,
      end_date: null,
      is_current: false,
      description: [''],
      sort_order: experiences.length,
    }
    setExperiences(e => [...e, newExp])
    setExpanded(newExp.id)
  }

  const update = (id: string, key: keyof Experience, value: Experience[keyof Experience]) =>
    setExperiences(e => e.map(ex => ex.id === id ? { ...ex, [key]: value } : ex))

  const updateBullet = (id: string, idx: number, value: string) =>
    setExperiences(e => e.map(ex => ex.id === id
      ? { ...ex, description: (ex.description ?? []).map((d, i) => i === idx ? value : d) }
      : ex
    ))

  const addBullet = (id: string) =>
    setExperiences(e => e.map(ex => ex.id === id
      ? { ...ex, description: [...(ex.description ?? []), ''] }
      : ex
    ))

  const removeBullet = (id: string, idx: number) =>
    setExperiences(e => e.map(ex => ex.id === id
      ? { ...ex, description: (ex.description ?? []).filter((_, i) => i !== idx) }
      : ex
    ))

  const removeExperience = (id: string) => setExperiences(e => e.filter(ex => ex.id !== id))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('experiences').delete().neq('id', 'none')
    const toInsert = experiences.map(({ id, ...rest }, i) => ({ ...rest, sort_order: i }))
    const { error } = await supabase.from('experiences').insert(toInsert)
    if (error) toast.error('Save failed: ' + error.message)
    else toast.success('Experience saved!')
    setSaving(false)
  }

  return (
    <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Experience</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Work history and internships</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={addExperience} className="btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}>
            <Plus size={14} /> Add Entry
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {experiences.map((exp) => (
        <div key={exp.id} className="glass-card" style={{ overflow: 'hidden' }}>
          {/* Accordion header */}
          <button
            onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
            style={{
              width: '100%', padding: '18px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-primary)', fontFamily: 'inherit',
            }}
          >
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
              {exp.position || 'New Position'} {exp.company ? `@ ${exp.company}` : ''}
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={(e) => { e.stopPropagation(); removeExperience(exp.id) }}
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '7px', cursor: 'pointer', color: '#fca5a5', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              >
                <Trash2 size={13} />
              </button>
              {expanded === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {expanded === exp.id && (
            <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="admin-label">Company</label>
                  <input type="text" value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} placeholder="Company Name" className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Position / Role</label>
                  <input type="text" value={exp.position} onChange={e => update(exp.id, 'position', e.target.value)} placeholder="Frontend Intern" className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Duration (display)</label>
                  <input type="text" value={exp.duration ?? ''} onChange={e => update(exp.id, 'duration', e.target.value)} placeholder="Jan 2026 – Apr 2026" className="admin-input" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
                  <input
                    id={`current-${exp.id}`}
                    type="checkbox"
                    checked={exp.is_current}
                    onChange={e => update(exp.id, 'is_current', e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#8b5cf6', cursor: 'pointer' }}
                  />
                  <label htmlFor={`current-${exp.id}`} style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>Currently working here</label>
                </div>
              </div>

              <div>
                <label className="admin-label">Description Bullets</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(exp.description ?? []).map((bullet, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={bullet}
                        onChange={e => updateBullet(exp.id, i, e.target.value)}
                        placeholder={`Bullet ${i + 1}`}
                        className="admin-input"
                      />
                      <button onClick={() => removeBullet(exp.id, i)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', cursor: 'pointer', color: '#fca5a5', width: '38px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addBullet(exp.id)} className="btn-outline" style={{ fontSize: '12px', padding: '6px 14px', alignSelf: 'flex-start' }}>
                    <Plus size={12} /> Add Bullet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {experiences.length === 0 && (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No experience entries. Click &ldquo;Add Entry&rdquo; to add one.
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
