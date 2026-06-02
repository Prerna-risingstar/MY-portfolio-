'use client'

import { Printer } from 'lucide-react'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--gradient-primary)',
        color: 'white',
        fontWeight: 600,
        fontSize: '14px',
        padding: '10px 20px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.25)'
      }}
    >
      <Printer size={16} />
      Print / Save PDF
    </button>
  )
}
