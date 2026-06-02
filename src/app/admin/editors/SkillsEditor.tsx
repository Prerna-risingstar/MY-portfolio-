'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import type { Skill } from '@/types/database'

export default function SkillsEditor({ initialSkills }: { initialSkills: Skill[] }) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [saving, setSaving] = useState(false)

  const addSkill = () => {
    const newSkill: Skill = {
      id: `new-${Date.now()}`,
      name: '',
      category: 'Frontend',
      icon: '',
      sort_order: skills.length,
    }
    setSkills(s => [...s, newSkill])
  }

  const updateSkill = (id: string, key: keyof Skill, value: string | number) =>
    setSkills(s => s.map(sk => sk.id === id ? { ...sk, [key]: value } : sk))

  const removeSkill = (id: string) => setSkills(s => s.filter(sk => sk.id !== id))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()

    // Delete all existing and re-insert (simple upsert strategy)
    const { error: delErr } = await supabase.from('skills').delete().neq('id', 'none')
    if (delErr) { toast.error('Save failed: ' + delErr.message); setSaving(false); return }

    const toInsert = skills.map(({ id, ...rest }, i) => ({ ...rest, sort_order: i }))
    const { error } = await supabase.from('skills').insert(toInsert)

    if (error) toast.error('Save failed: ' + error.message)
    else toast.success('Skills saved!')
    setSaving(false)
  }

  const CATEGORIES = ['Frontend', 'Backend', 'Tools', 'General']

  return (
    <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Skills</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Manage your technology stack</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={addSkill} className="btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}>
            <Plus size={14} /> Add Skill
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>
            {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {skills.map((skill, i) => (
          <div
            key={skill.id}
            className="glass-card"
            style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '2fr 1fr 60px auto', gap: '12px', alignItems: 'center' }}
          >
            <input
              type="text"
              value={skill.name}
              onChange={e => updateSkill(skill.id, 'name', e.target.value)}
              placeholder="Skill name"
              className="admin-input"
            />
            <select
              value={skill.category ?? 'General'}
              onChange={e => updateSkill(skill.id, 'category', e.target.value)}
              className="admin-input"
              style={{ cursor: 'pointer' }}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="text"
              value={skill.icon ?? ''}
              onChange={e => updateSkill(skill.id, 'icon', e.target.value)}
              placeholder="Icon"
              className="admin-input"
              style={{ textAlign: 'center' }}
            />
            <button
              onClick={() => removeSkill(skill.id)}
              style={{
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '8px', cursor: 'pointer', color: '#fca5a5',
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No skills yet. Click &ldquo;Add Skill&rdquo; to get started.
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
