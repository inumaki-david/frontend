// Arquivo: src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const segredo = process.env.JWT_SECRET;
    if (!segredo) {
      return NextResponse.json(
        { erro: 'JWT_SECRET não está configurada no servidor.' },
        { status: 500 }
      );
    }

    await connectToDatabase();
    const { email, senha } = await request.json();

    // 1. Validação básica de campos
    if (typeof email !== 'string' || typeof senha !== 'string' || !email.trim() || !senha) {
      return NextResponse.json(
        { erro: 'E-mail e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    // 2. Busca o usuário no MongoDB pelo e-mail
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { erro: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    // 3. Compara a senha digitada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return NextResponse.json(
        { erro: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    // 4. Gera um Token JWT de acesso válido por 8 horas
    const token = jwt.sign(
      { userId: user._id.toString(), nome: user.nome, email: user.email, role: user.role },
      segredo,
      { expiresIn: '8h' }
    );

    // 5. Retorna o sucesso e os dados básicos do usuário (sem a senha)
    const response = NextResponse.json(
      {
        mensagem: 'Login realizado com sucesso!',
        usuario: {
          nome: user.nome,
          email: user.email,
          role: user.role
        }
      },
      { status: 200 }
    );
    response.cookies.set('bistro_session', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { erro: 'Erro interno no servidor ao realizar login.', detalhes: error.message },
      { status: 500 }
    );
  }
}