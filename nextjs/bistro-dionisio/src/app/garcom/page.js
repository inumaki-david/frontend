'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import OperationalHeader from '../components/OperationalHeader';
import RoleGuard from '../components/RoleGuard';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function TerminalGarcom() {
  const [cardapio, setCardapio] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [numeroMesa, setNumeroMesa] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [fechandoMesa, setFechandoMesa] = useState(null);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');

  const carregarDados = useCallback(async () => {
    try {
      const [menuResponse, ordersResponse] = await Promise.all([
        fetch('/api/menu'),
        fetch('/api/orders')
      ]);
      const menuData = await menuResponse.json();
      const ordersData = await ordersResponse.json();

      if (!menuResponse.ok) throw new Error(menuData.erro || 'Não foi possível carregar o cardápio.');
      if (!ordersResponse.ok) throw new Error(ordersData.erro || 'Não foi possível carregar os pedidos.');

      setCardapio(menuData);
      setPedidos(ordersData);
      setErro('');
    } catch (error) {
      setErro(error.message || 'Falha ao carregar os dados do salão.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const inicializacao = setTimeout(carregarDados, 0);
    const intervalo = setInterval(carregarDados, 15000);
    return () => {
      clearTimeout(inicializacao);
      clearInterval(intervalo);
    };
  }, [carregarDados]);

  const totalPedido = useMemo(
    () => carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0),
    [carrinho]
  );

  const contasAbertas = useMemo(() => {
    const porMesa = new Map();
    pedidos.filter((pedido) => !pedido.contaFechada).forEach((pedido) => {
      const conta = porMesa.get(pedido.numeroMesa) || {
        numeroMesa: pedido.numeroMesa,
        total: 0,
        pedidos: []
      };
      conta.total += pedido.total || 0;
      conta.pedidos.push(pedido);
      porMesa.set(pedido.numeroMesa, conta);
    });
    return [...porMesa.values()].sort((a, b) => a.numeroMesa - b.numeroMesa);
  }, [pedidos]);

  const adicionarAoCarrinho = (item) => {
    setCarrinho((atual) => {
      const existente = atual.find((linha) => linha.menuItem === item._id);
      if (existente) {
        return atual.map((linha) => linha.menuItem === item._id
          ? { ...linha, quantidade: linha.quantidade + 1 }
          : linha);
      }
      return [...atual, {
        menuItem: item._id,
        nome: item.nome,
        preco: item.preco,
        quantidade: 1
      }];
    });
    setAviso('');
  };

  const alterarQuantidade = (id, incremento) => {
    setCarrinho((atual) => atual
      .map((item) => item.menuItem === id
        ? { ...item, quantidade: item.quantidade + incremento }
        : item)
      .filter((item) => item.quantidade > 0));
  };

  const enviarPedido = async (event) => {
    event.preventDefault();
    const mesa = Number(numeroMesa);
    if (!Number.isInteger(mesa) || mesa < 1) {
      setErro('Informe um número de mesa válido.');
      return;
    }
    if (carrinho.length === 0) {
      setErro('Adicione ao menos um item ao pedido.');
      return;
    }

    setEnviando(true);
    setErro('');
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numeroMesa: mesa,
          itens: carrinho.map(({ menuItem, quantidade }) => ({ menuItem, quantidade }))
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível enviar o pedido.');

      setCarrinho([]);
      setAviso(`Pedido da mesa ${mesa} enviado para a cozinha.`);
      await carregarDados();
    } catch (error) {
      setErro(error.message || 'Falha ao enviar o pedido.');
    } finally {
      setEnviando(false);
    }
  };

  const fecharConta = async (mesa) => {
    if (!window.confirm(`Fechar a conta da mesa ${mesa}?`)) return;
    setFechandoMesa(mesa);
    setErro('');
    setAviso('');
    try {
      const response = await fetch(`/api/accounts/${mesa}/close`, { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível fechar a conta.');

      setAviso(`Conta da mesa ${mesa} fechada: ${moeda.format(data.total)}.`);
      await carregarDados();
    } catch (error) {
      setErro(error.message || 'Falha ao fechar a conta.');
    } finally {
      setFechandoMesa(null);
    }
  };

  return (
    <RoleGuard role="GARCOM">
    <main className="app-shell">
      <OperationalHeader
        title="Atendimento do salão"
        description="Pedidos sem papel, do balcão à cozinha"
        active="/garcom"
      />

      {erro && <p className="feedback error" role="alert">{erro}</p>}
      {aviso && <p className="feedback success" role="status">{aviso}</p>}

      <div className="service-layout">
        <section className="panel menu-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Disponíveis agora</p>
              <h2>Cardápio</h2>
            </div>
            <span className="count-badge">{cardapio.filter((item) => item.disponivel).length} itens</span>
          </div>

          {carregando ? (
            <p className="empty-state">Carregando cardápio...</p>
          ) : cardapio.filter((item) => item.disponivel).length === 0 ? (
            <p className="empty-state">Nenhum item disponível. Peça ao gerente para atualizar o cardápio.</p>
          ) : (
            <div className="menu-grid">
              {cardapio.filter((item) => item.disponivel).map((item) => (
                <article className="menu-card" key={item._id}>
                  <div>
                    <span className="category-tag">{item.categoria}</span>
                    <h3>{item.nome}</h3>
                    {item.descricao && <p className="muted">{item.descricao}</p>}
                  </div>
                  <div className="menu-card-footer">
                    <strong>{moeda.format(item.preco)}</strong>
                    <button className="button button-outline" onClick={() => adicionarAoCarrinho(item)}>
                      Adicionar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="panel order-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Comanda atual</p>
              <h2>Novo pedido</h2>
            </div>
          </div>
          <form onSubmit={enviarPedido}>
            <label className="field-label" htmlFor="numero-mesa">Mesa</label>
            <input
              id="numero-mesa"
              className="text-input"
              type="number"
              min="1"
              step="1"
              required
              value={numeroMesa}
              onChange={(event) => setNumeroMesa(event.target.value)}
              placeholder="Ex.: 5"
            />

            {carrinho.length === 0 ? (
              <p className="empty-state cart-empty">Escolha itens do cardápio para montar o pedido.</p>
            ) : (
              <ul className="cart-list">
                {carrinho.map((item) => (
                  <li className="cart-item" key={item.menuItem}>
                    <div className="cart-item-info">
                      <strong>{item.nome}</strong>
                      <span className="muted">{moeda.format(item.preco * item.quantidade)}</span>
                    </div>
                    <div className="quantity-control" aria-label={`Quantidade de ${item.nome}`}>
                      <button type="button" aria-label={`Remover uma unidade de ${item.nome}`} onClick={() => alterarQuantidade(item.menuItem, -1)}>−</button>
                      <span>{item.quantidade}</span>
                      <button type="button" aria-label={`Adicionar uma unidade de ${item.nome}`} onClick={() => alterarQuantidade(item.menuItem, 1)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="order-total">
              <span>Total estimado</span>
              <strong>{moeda.format(totalPedido)}</strong>
            </div>
            <p className="muted small-text">O valor final é recalculado pelo servidor com os preços atuais do cardápio.</p>
            <button className="button button-primary full-width" type="submit" disabled={enviando || carregando || carrinho.length === 0}>
              {enviando ? 'Enviando pedido...' : 'Enviar para a cozinha'}
            </button>
          </form>
        </aside>
      </div>

      <section className="panel accounts-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Acompanhamento do salão</p>
            <h2>Contas em aberto</h2>
          </div>
          <button className="button button-quiet" onClick={carregarDados}>Atualizar</button>
        </div>
        {contasAbertas.length === 0 ? (
          <p className="empty-state">Não há contas em aberto.</p>
        ) : (
          <div className="account-grid">
            {contasAbertas.map((conta) => {
              const todosEntregues = conta.pedidos.every((pedido) => pedido.status === 'ENTREGUE');
              return (
                <article className="account-card" key={conta.numeroMesa}>
                  <div>
                    <strong>Mesa {conta.numeroMesa}</strong>
                    <span className="muted">{conta.pedidos.length} pedido(s) · {moeda.format(conta.total)}</span>
                  </div>
                  <button
                    className="button button-outline"
                    disabled={!todosEntregues || fechandoMesa === conta.numeroMesa}
                    onClick={() => fecharConta(conta.numeroMesa)}
                  >
                    {fechandoMesa === conta.numeroMesa ? 'Fechando...' : todosEntregues ? 'Fechar conta' : 'Aguardando entrega'}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
    </RoleGuard>
  );
}
