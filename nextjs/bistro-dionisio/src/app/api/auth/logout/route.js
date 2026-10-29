import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ mensagem: 'Sessão encerrada.' });
  response.cookies.set('bistro_session', '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });
  return response;
}
