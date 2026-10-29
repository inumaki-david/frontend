// Ficheiro: src/app/api/orders/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import mongoose from 'mongoose';
import { verificarAcesso } from '@/lib/auth';

/**
 * MÉTODO PUT: Atualiza um pedido específico (geralmente o seu estado).
 * Quem usará: O Monitor da Cozinha para avançar o fluxo do Kanban.
 */
export async function PUT(request, { params }) {
  try {
    const acesso = await verificarAcesso(['COZINHA']);
    if (acesso.response) return acesso.response;
    await connectToDatabase();
    
    // Extrai o ID do pedido a partir da URL
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ erro: 'Identificador de pedido inválido.' }, { status: 400 });
    }

    // Extrai os dados enviados no corpo da requisição (ex: { status: 'EM_PREPARO' })
    const data = await request.json();
    const transicoesPermitidas = {
      RECEBIDO: 'EM_PREPARO',
      EM_PREPARO: 'ENTREGUE'
    };

    if (
      !data ||
      typeof data.status !== 'string' ||
      !Object.values(transicoesPermitidas).includes(data.status)
    ) {
      return NextResponse.json({ erro: 'Estado de pedido inválido.' }, { status: 400 });
    }

    const pedidoAtual = await Order.findById(id);
    if (!pedidoAtual) {
      return NextResponse.json({ erro: 'Pedido não encontrado.' }, { status: 404 });
    }
    if (pedidoAtual.contaFechada) {
      return NextResponse.json({ erro: 'A conta deste pedido já foi fechada.' }, { status: 409 });
    }
    if (transicoesPermitidas[pedidoAtual.status] !== data.status) {
      return NextResponse.json(
        { erro: 'Esta mudança de estado não é permitida.' },
        { status: 409 }
      );
    }

    pedidoAtual.status = data.status;
    await pedidoAtual.save();
    return NextResponse.json(pedidoAtual, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { erro: 'Falha ao atualizar o estado do pedido.', detalhes: error.message },
      { status: 500 }
    );
  }
}
