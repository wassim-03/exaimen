import { NextResponse } from 'next/server'

export async function POST(req) {
  const { access_token } = await req.json()
  // Puedes poner expires, etc. según lo que quieras
  const response = NextResponse.json({ ok: true })
  response.cookies.set('sb-access-token', access_token, {
    httpOnly: false, // Si la quieres leer desde JS (opcional, sino true)
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })
  return response
}
