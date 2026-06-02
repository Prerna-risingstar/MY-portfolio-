'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import type { Achievement } from '@/types/database'

export default function AchievementsEditor({ initialAchievements }: { initialAchievements: Achievement[] }) {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements)
  const [saving, setSaving] = useState(false)

  const add = () => setAchievements(a => [...a, { id: `new-${Date.now()}`, title: '', description: '', icon: '🏆', sort_order: a.length }])
  const update = (id: string, key: keyof Achievement, value: string | null) =>
    setAchievements(a => a.map(ach => ach.id === id ? { ...ach, [key]: value } : ach))
  const remove = (id: string) => setAchievements(a => a.filter(ach => ach.id !== id))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('achievements').delete().neq('id', 'none')
    const toInsert = achievements.map(({ id, ...rest }, i) => ({ ...rest, sort_order: i }))
    const { error } = await supabase.from('achievements').insert(toInsert)
    if (error) toast.error('Save failed: ' + error.message)
    else toast.success('Achievements saved!')
    setSaving(false)
  }

  return (
    <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Achievements</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Awards, milestones and highlights</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={add} className="btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}><Plus size={14} /> Add</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {achievements.map((ach) => (
        <div key={ach.id} className="glass-card" style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '60px 1fr 2fr auto', gap: '12px', alignItems: 'center' }}>
          <div>
            <label className="admin-label">Icon</label>
            <input
              type="text"
              value={ach.icon ?? ''}
              onChange={e => update(ach.id, 'icon', e.target.value)}
              placeholder="🏆"
              className="admin-input"
              style={{ textAlign: 'center', fontSize: '18px' }}
            />
          </div>
          <div>
            <label className="admin-label">Title</label>
            <input type="text" value={ach.title} onChange={e => update(ach.id, 'title', e.target.value)} placeholder="Hackathon Finalist" className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Description</label>
            <input type="text" value={ach.description ?? ''} onChange={e => update(ach.id, 'description', e.target.value)} placeholder="Top 10 at national-level hackathon" className="admin-input" />
          </div>
          <button onClick={() => remove(ach.id)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', cursor: 'pointer', color: '#fca5a5', height: '38px', width: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '20px' }}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      {achievements.length === 0 && (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No achievements. Click &ldquo;Add&rdquo; to add one.</div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
