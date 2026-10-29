// Arquivo: src/app/api/menu/route.js
import { NextResponse } from 'next/server'; // Ferramenta do Next.js para enviar respostas HTTP
import connectToDatabase from '@/lib/mongodb'; // Nossa função de conexão com o banco
import MenuItem from '@/models/MenuItem'; // O esquema de dados do cardápio que criamos
import { verificarAcesso } from '@/lib/auth';

/**
 * MÉTODO GET: Retorna todos os itens do cardápio.
 * Quem usará: O painel do Gerente (para listar) e o terminal do Garçom (para montar o pedido).
 */
export async function GET() {
  try {
    const acesso = await verificarAcesso(['GERENTE', 'GARCOM']);
    if (acesso.response) return acesso.response;
    // 1. Garante que estamos conectados ao MongoDB local
    await connectToDatabase();

    // 2. Busca todos os documentos na coleção 'MenuItems'
    // O .sort({ createdAt: -1 }) organiza para que os itens mais novos apareçam primeiro
    const menuItems = await MenuItem.find({}).sort({ createdAt: -1 });

    // 3. Retorna os dados em formato JSON com status 200 (OK)
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    // Em caso de erro, retorna uma mensagem clara e o status 500 (Erro Interno do Servidor)
    return NextResponse.json(
      { erro: 'Falha ao buscar os itens do cardápio', detalhes: error.message },
      { status: 500 }
    );
  }
}

/**
 * MÉTODO POST: Cria um novo item no cardápio.
 * Quem usará: O painel do Gerente, ao clicar em "Adicionar Novo Item".
 */
export async function POST(request) {
  try {
    const acesso = await verificarAcesso(['GERENTE']);
    if (acesso.response) return acesso.response;
    // 1. Conecta ao banco de dados
    await connectToDatabase();

    // 2. Extrai os dados enviados pelo Frontend (nome, categoria, preco) do corpo da requisição
    const data = await request.json();

    // 3. Validação básica de segurança (evita salvar pratos sem nome ou sem preço)
    const nome = typeof data.nome === 'string' ? data.nome.trim() : '';
    const categoria = typeof data.categoria === 'string' ? data.categoria.trim() : '';
    const preco = Number(data.preco);
    if (!nome || !categoria || !Number.isFinite(preco) || preco <= 0) {
      return NextResponse.json(
        { erro: 'Informe nome, categoria e um preço maior que zero.' },
        { status: 400 } // Status 400 significa "Bad Request" (Requisição inválida por parte do usuário)
      );
    }

    // 4. Cria o novo item no MongoDB usando o nosso Modelo
    const novoItem = await MenuItem.create({
      nome,
      categoria,
      preco,
      disponivel: true // Definimos o padrão explicitamente
    });

    // 5. Retorna o item recém-criado com o status 201 (Created/Criado)
    return NextResponse.json(novoItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { erro: 'Falha ao criar o item no cardápio', detalhes: error.message },
      { status: 500 }
    );
  }
}