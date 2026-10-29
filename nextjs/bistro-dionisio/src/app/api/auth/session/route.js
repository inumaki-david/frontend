import { NextResponse } from 'next/server';
import { verificarAcesso } from '@/lib/auth';

export async function GET() {
  const acesso = await verificarAcesso();
  if (acesso.response) return acesso.response;

  return NextResponse.json({
    usuario: {
      userId: acesso.usuario.userId,
      email: acesso.usuario.email,
      nome: acesso.usuario.nome,
      role: acesso.usuario.role
    }
  });
}
