// Arquivo: src/app/api/menu/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';
import mongoose from 'mongoose';
import { verificarAcesso } from '@/lib/auth';

/**
 * MÉTODO PUT: Atualiza um item do cardápio existente buscando pelo seu ID na URL.
 */
export async function PUT(request, { params }) {
  try {
    const acesso = await verificarAcesso(['GERENTE']);
    if (acesso.response) return acesso.response;
    await connectToDatabase();
    
    // Extrai o ID dos parâmetros da URL
    const { id } = await params;
    const data = await request.json();
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ erro: 'Identificador de item inválido.' }, { status: 400 });
    }

    const campos = {};
    if (typeof data.nome === 'string') campos.nome = data.nome.trim();
    if (typeof data.categoria === 'string') campos.categoria = data.categoria.trim();
    if (data.preco !== undefined) campos.preco = Number(data.preco);
    if (typeof data.disponivel === 'boolean') campos.disponivel = data.disponivel;
    if (
      (campos.nome !== undefined && !campos.nome) ||
      (campos.categoria !== undefined && !campos.categoria) ||
      (campos.preco !== undefined && (!Number.isFinite(campos.preco) || campos.preco <= 0)) ||
      Object.keys(campos).length === 0
    ) {
      return NextResponse.json({ erro: 'Dados inválidos para atualizar o item.' }, { status: 400 });
    }

    // Atualiza o documento no MongoDB e retorna a versão nova ({ new: true })
    const itemAtualizado = await MenuItem.findByIdAndUpdate(
      id,
      campos,
      { new: true, runValidators: true }
    );

    if (!itemAtualizado) {
      return NextResponse.json(
        { erro: 'Item do cardápio não encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json(itemAtualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { erro: 'Falha ao atualizar o item do cardápio.', detalhes: error.message },
      { status: 500 }
    );
  }
}

/**
 * MÉTODO DELETE: Remove um item do cardápio do banco de dados pelo seu ID.
 */
export async function DELETE(request, { params }) {
  try {
    const acesso = await verificarAcesso(['GERENTE']);
    if (acesso.response) return acesso.response;
    await connectToDatabase();
    
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ erro: 'Identificador de item inválido.' }, { status: 400 });
    }

    // Mantém a referência para pedidos antigos; itens indisponíveis somem do salão.
    const itemRemovido = await MenuItem.findByIdAndUpdate(
      id,
      { disponivel: false },
      { new: true }
    );

    if (!itemRemovido) {
      return NextResponse.json(
        { erro: 'Item do cardápio não encontrado para exclusão.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { mensagem: 'Item desativado no cardápio com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { erro: 'Falha ao deletar o item do cardápio.', detalhes: error.message },
      { status: 500 }
    );
  }
}
