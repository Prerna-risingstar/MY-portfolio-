export async function POST() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'portfolio_admin=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax',
    },
  })
}
