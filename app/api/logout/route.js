import { NextResponse } from 'next/server'

export async function POST(req) {
  // Preparamos la respuesta
  const response = NextResponse.json({ ok: true })
  // Para borrar la cookie, la seteas con maxAge: 0
  response.cookies.set('sb-access-token', '', {
    path: '/',
    maxAge: 0,
  })
  return response
}
