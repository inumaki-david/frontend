// Arquivo: src/app/api/orders/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import MenuItem from '@/models/MenuItem';
import mongoose from 'mongoose';
import { verificarAcesso } from '@/lib/auth';

/**
 * MÉTODO GET: Busca todos os pedidos.
 * Quem usará: A tela da Cozinha (em breve) para listar a fila de preparo.
 */
export async function GET() {
  try {
    const acesso = await verificarAcesso(['GERENTE', 'GARCOM', 'COZINHA']);
    if (acesso.response) return acesso.response;
    await connectToDatabase();
    
    // Busca os pedidos e usa o .populate() para trazer os detalhes do MenuItem (nome, preço)
    // em vez de trazer apenas o ID do prato.
    const pedidos = await Order.find({})
      .populate('itens.menuItem')
      .sort({ createdAt: 1 }); // Organiza do mais antigo para o mais novo (Fila da cozinha)

    return NextResponse.json(pedidos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { erro: 'Falha ao buscar pedidos', detalhes: error.message },
      { status: 500 }
    );
  }
}

/**
 * MÉTODO POST: Cria um novo pedido.
 * Quem usará: O terminal do Garçom, ao clicar em "Enviar para Cozinha".
 */
export async function POST(request) {
  try {
    const acesso = await verificarAcesso(['GARCOM']);
    if (acesso.response) return acesso.response;
    await connectToDatabase();
    const data = await request.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return NextResponse.json({ erro: 'Dados do pedido inválidos.' }, { status: 400 });
    }

    if (!Number.isInteger(data.numeroMesa) || data.numeroMesa < 1) {
      return NextResponse.json(
        { erro: 'Informe um número de mesa válido.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(data.itens) || data.itens.length === 0) {
      return NextResponse.json(
        { erro: 'Adicione ao menos um item ao pedido.' },
        { status: 400 }
      );
    }

    const itensNormalizados = new Map();
    for (const item of data.itens) {
      if (
        !item ||
        typeof item !== 'object' ||
        typeof item.menuItem !== 'string' ||
        !mongoose.isValidObjectId(item.menuItem) ||
        !Number.isInteger(item.quantidade) ||
        item.quantidade < 1 ||
        item.quantidade > 99
      ) {
        return NextResponse.json(
          { erro: 'Um ou mais itens do pedido são inválidos.' },
          { status: 400 }
        );
      }

      const atual = itensNormalizados.get(item.menuItem) || {
        menuItem: item.menuItem,
        quantidade: 0,
        modificadores: typeof item.modificadores === 'string'
          ? item.modificadores.trim().slice(0, 300)
          : ''
      };
      atual.quantidade += item.quantidade;
      if (atual.quantidade > 99) {
        return NextResponse.json(
          { erro: 'A quantidade máxima por item é 99 unidades.' },
          { status: 400 }
        );
      }
      itensNormalizados.set(item.menuItem, atual);
    }

    const itensRecebidos = [...itensNormalizados.values()];
    const itensCardapio = await MenuItem.find({
      _id: { $in: itensRecebidos.map((item) => item.menuItem) },
      disponivel: true
    });

    if (itensCardapio.length !== itensRecebidos.length) {
      return NextResponse.json(
        { erro: 'Um ou mais itens não estão disponíveis no cardápio.' },
        { status: 400 }
      );
    }

    const itensPedido = itensRecebidos.map((item) => {
      const itemCardapio = itensCardapio.find(
        (menuItem) => menuItem._id.toString() === item.menuItem
      );

      return {
        ...item,
        nome: itemCardapio.nome,
        preco: itemCardapio.preco
      };
    });
    const total = itensPedido.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    );
    const totalArredondado = Math.round(total * 100) / 100;

    const novoPedido = await Order.create({
      numeroMesa: data.numeroMesa,
      itens: itensPedido,
      total: totalArredondado,
      garcom: acesso.usuario.userId,
      status: 'RECEBIDO'
    });

    return NextResponse.json(novoPedido, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { erro: 'Falha ao criar o pedido', detalhes: error.message },
      { status: 500 }
    );
  }
}
