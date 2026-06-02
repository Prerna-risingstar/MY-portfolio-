'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import type { Certification } from '@/types/database'

export default function CertificationsEditor({ initialCertifications }: { initialCertifications: Certification[] }) {
  const [certs, setCerts] = useState<Certification[]>(initialCertifications)
  const [saving, setSaving] = useState(false)

  const addCert = () => setCerts(c => [...c, { id: `new-${Date.now()}`, title: '', issuer: '', year: '', certificate_url: null, image_url: null, sort_order: c.length }])
  const update = (id: string, key: keyof Certification, value: string | null) =>
    setCerts(c => c.map(cert => cert.id === id ? { ...cert, [key]: value } : cert))
  const remove = (id: string) => setCerts(c => c.filter(cert => cert.id !== id))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('certifications').delete().neq('id', 'none')
    const toInsert = certs.map(({ id, ...rest }, i) => ({ ...rest, sort_order: i }))
    const { error } = await supabase.from('certifications').insert(toInsert)
    if (error) toast.error('Save failed: ' + error.message)
    else toast.success('Certifications saved!')
    setSaving(false)
  }

  return (
    <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Certifications</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Certificates and credentials</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={addCert} className="btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}><Plus size={14} /> Add</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {certs.map((cert) => (
        <div key={cert.id} className="glass-card" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px auto', gap: '10px', alignItems: 'end' }}>
            <div>
              <label className="admin-label">Certificate Title</label>
              <input type="text" value={cert.title} onChange={e => update(cert.id, 'title', e.target.value)} placeholder="Google Data Analytics" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Issuer</label>
              <input type="text" value={cert.issuer ?? ''} onChange={e => update(cert.id, 'issuer', e.target.value)} placeholder="Coursera" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Year</label>
              <input type="text" value={cert.year ?? ''} onChange={e => update(cert.id, 'year', e.target.value)} placeholder="2026" className="admin-input" />
            </div>
            <button onClick={() => remove(cert.id)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', cursor: 'pointer', color: '#fca5a5', height: '38px', width: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Trash2 size={14} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label className="admin-label">Certificate URL</label>
              <input type="text" value={cert.certificate_url ?? ''} onChange={e => update(cert.id, 'certificate_url', e.target.value)} placeholder="https://..." className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Logo / Image URL</label>
              <input type="text" value={cert.image_url ?? ''} onChange={e => update(cert.id, 'image_url', e.target.value)} placeholder="https://..." className="admin-input" />
            </div>
          </div>
        </div>
      ))}

      {certs.length === 0 && (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No certifications. Click &ldquo;Add&rdquo; to add one.</div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
