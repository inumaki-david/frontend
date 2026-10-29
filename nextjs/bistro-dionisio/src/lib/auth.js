import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function verificarAcesso(perfisPermitidos = []) {
  const segredo = process.env.JWT_SECRET;
  if (!segredo) {
    return {
      response: NextResponse.json(
        { erro: 'JWT_SECRET não está configurada no servidor.' },
        { status: 500 }
      )
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('bistro_session')?.value;
  if (!token) {
    return {
      response: NextResponse.json({ erro: 'Autenticação necessária.' }, { status: 401 })
    };
  }

  try {
    const usuario = jwt.verify(token, segredo);
    if (
      typeof usuario !== 'object' ||
      typeof usuario.userId !== 'string' ||
      !['GERENTE', 'GARCOM', 'COZINHA'].includes(usuario.role)
    ) {
      return {
        response: NextResponse.json({ erro: 'Sessão inválida.' }, { status: 401 })
      };
    }

    if (perfisPermitidos.length && !perfisPermitidos.includes(usuario.role)) {
      return {
        response: NextResponse.json({ erro: 'Você não tem permissão para esta ação.' }, { status: 403 })
      };
    }

    return { usuario };
  } catch {
    return {
      response: NextResponse.json({ erro: 'Sessão expirada ou inválida.' }, { status: 401 })
    };
  }
}
