/** Shared helper — calls the /api/portfolio endpoint to persist a section */
export async function saveSection(section: string, data: unknown): Promise<void> {
  const res = await fetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, data }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? 'Save failed')
  }
}
