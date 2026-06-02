'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { Save, Loader2 } from 'lucide-react'
import type { Profile } from '@/types/database'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { saveSection } from './saveSection'

export default function ProfileEditor({ initialProfile }: { initialProfile: Profile }) {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [saving, setSaving] = useState(false)

  const update = (key: keyof Profile, value: string | string[] | null) =>
    setProfile(p => ({ ...p, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    try {
      // 1. Save to Supabase database
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .upsert({ ...profile, updated_at: new Date().toISOString() })

      if (error) {
        toast.error('Supabase save error: ' + error.message)
      }

      // 2. Save locally to portfolio.json via server API
      await saveSection('profile', profile)
      toast.success('Profile saved successfully!')
    } catch (err: any) {
      toast.error('Failed to save profile: ' + (err.message || err))
    } finally {
      setSaving(false)
    }
  }

  const Field = ({ label, id, value, onChange, multiline = false, placeholder = '' }: {
    label: string; id: string; value: string; onChange: (v: string) => void
    multiline?: boolean; placeholder?: string
  }) => (
    <div>
      <label className="admin-label" htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="admin-input"
          style={{ resize: 'vertical' }}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="admin-input"
        />
      )}
    </div>
  )

  return (
    <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Profile</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Hero section, about info, and social links</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
          style={{ opacity: saving ? 0.7 : 1, cursor: saving ? 'wait' : 'pointer' }}
        >
          {saving ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={15} />}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Basic Info</p>
        {/* DP Preview */}
        {profile.profile_picture_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
          >
            <Image
              src={profile.profile_picture_url}
              alt={profile.name || 'Profile'}
              width={120}
              height={120}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          </motion.div>
        )}
        <Field label="Full Name" id="p-name" value={profile.name ?? ''} onChange={v => update('name', v)} placeholder="Jane Doe" />
        <Field label="Role / Title" id="p-role" value={profile.role ?? ''} onChange={v => update('role', v)} placeholder="Frontend Developer" />
        <Field label="Short Bio (hero tagline)" id="p-bio" value={profile.bio ?? ''} onChange={v => update('bio', v)} placeholder="Building beautiful digital experiences." multiline />
        <Field label="About Me (full paragraph)" id="p-about" value={profile.about_me ?? ''} onChange={v => update('about_me', v)} placeholder="I'm a passionate developer…" multiline />
        <Field label="Location" id="p-location" value={profile.location ?? ''} onChange={v => update('location', v)} placeholder="India" />
        <Field label="Career Objective" id="p-objective" value={profile.career_objective ?? ''} onChange={v => update('career_objective', v)} placeholder="To build…" multiline />
      </div>

      <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Links</p>
        <Field label="Email" id="p-email" value={profile.email ?? ''} onChange={v => update('email', v)} placeholder="hello@example.com" />
        <Field label="GitHub URL" id="p-github" value={profile.github_url ?? ''} onChange={v => update('github_url', v)} placeholder="https://github.com/username" />
        <Field label="LinkedIn URL" id="p-linkedin" value={profile.linkedin_url ?? ''} onChange={v => update('linkedin_url', v)} placeholder="https://linkedin.com/in/username" />
        <Field label="Resume URL" id="p-resume" value={profile.resume_url ?? ''} onChange={v => update('resume_url', v)} placeholder="https://..." />
        <Field label="Profile Picture URL" id="p-avatar" value={profile.profile_picture_url ?? ''} onChange={v => update('profile_picture_url', v)} placeholder="https://..." />
      </div>

      <div className="glass-card" style={{ padding: '28px' }}>
        <label className="admin-label" htmlFor="p-interests">Interests (comma-separated)</label>
        <input
          id="p-interests"
          type="text"
          value={(profile.interests ?? []).join(', ')}
          onChange={e => update('interests', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="Web Development, UI/UX, Open Source"
          className="admin-input"
        />
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
