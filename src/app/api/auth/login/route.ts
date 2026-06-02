export async function POST(request: Request) {
  try {
    const { password } = await request.json() as { password: string }
    const adminSecret = process.env.ADMIN_SECRET

    if (!adminSecret || password !== adminSecret) {
      return Response.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Set httpOnly cookie valid for 7 days
    const maxAge = 60 * 60 * 24 * 7
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `portfolio_admin=${adminSecret}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
      },
    })
  } catch {
    return Response.json({ error: 'Login failed' }, { status: 500 })
  }
}
