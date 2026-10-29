import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import { verificarAcesso } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const acesso = await verificarAcesso(['GARCOM']);
    if (acesso.response) return acesso.response;
    await connectToDatabase();
    const { numeroMesa: numeroMesaParam } = await params;
    const numeroMesa = Number(numeroMesaParam);

    if (!Number.isInteger(numeroMesa) || numeroMesa < 1) {
      return NextResponse.json({ erro: 'Número de mesa inválido.' }, { status: 400 });
    }

    const pedidosAbertos = await Order.find({
      numeroMesa,
      contaFechada: false
    });

    if (pedidosAbertos.length === 0) {
      return NextResponse.json(
        { erro: 'Não há pedidos em aberto para esta mesa.' },
        { status: 404 }
      );
    }

    if (pedidosAbertos.some((pedido) => pedido.status !== 'ENTREGUE')) {
      return NextResponse.json(
        { erro: 'Finalize todos os pedidos da mesa antes de fechar a conta.' },
        { status: 409 }
      );
    }

    const ids = pedidosAbertos.map((pedido) => pedido._id);
    const contaFechadaEm = new Date();
    const resultado = await Order.updateMany(
      { _id: { $in: ids }, contaFechada: false, status: 'ENTREGUE' },
      { $set: { contaFechada: true, contaFechadaEm } }
    );

    if (resultado.modifiedCount !== ids.length) {
      return NextResponse.json(
        { erro: 'A conta foi alterada por outro atendimento. Atualize os pedidos e tente novamente.' },
        { status: 409 }
      );
    }

    const total = Math.round(
      pedidosAbertos.reduce((soma, pedido) => soma + pedido.total, 0) * 100
    ) / 100;
    return NextResponse.json(
      { numeroMesa, total, pedidosFechados: resultado.modifiedCount, contaFechadaEm },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { erro: 'Falha ao fechar a conta.', detalhes: error.message },
      { status: 500 }
    );
  }
}
