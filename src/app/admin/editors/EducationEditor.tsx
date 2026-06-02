'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import type { Education } from '@/types/database'

export default function EducationEditor({ initialEducation }: { initialEducation: Education[] }) {
  const [education, setEducation] = useState<Education[]>(initialEducation)
  const [saving, setSaving] = useState(false)

  const add = () => setEducation(e => [...e, { id: `new-${Date.now()}`, degree: '', institution: '', duration: '', cgpa: '', sort_order: e.length }])
  const update = (id: string, key: keyof Education, value: string | null) =>
    setEducation(e => e.map(ed => ed.id === id ? { ...ed, [key]: value } : ed))
  const remove = (id: string) => setEducation(e => e.filter(ed => ed.id !== id))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('education').delete().neq('id', 'none')
    const toInsert = education.map(({ id, ...rest }, i) => ({ ...rest, sort_order: i }))
    const { error } = await supabase.from('education').insert(toInsert)
    if (error) toast.error('Save failed: ' + error.message)
    else toast.success('Education saved!')
    setSaving(false)
  }

  return (
    <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Education</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Degrees and academic background</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={add} className="btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}><Plus size={14} /> Add</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {education.map((edu) => (
        <div key={edu.id} className="glass-card" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
            <div>
              <label className="admin-label">Degree</label>
              <input type="text" value={edu.degree} onChange={e => update(edu.id, 'degree', e.target.value)} placeholder="B.Tech Computer Science" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Institution</label>
              <input type="text" value={edu.institution ?? ''} onChange={e => update(edu.id, 'institution', e.target.value)} placeholder="XYZ University" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Duration</label>
              <input type="text" value={edu.duration ?? ''} onChange={e => update(edu.id, 'duration', e.target.value)} placeholder="2023 – 2027" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">CGPA / GPA</label>
              <input type="text" value={edu.cgpa ?? ''} onChange={e => update(edu.id, 'cgpa', e.target.value)} placeholder="8.5" className="admin-input" />
            </div>
            <button onClick={() => remove(edu.id)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', cursor: 'pointer', color: '#fca5a5', height: '38px', width: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No education entries. Click &ldquo;Add&rdquo; to add one.</div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
