'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import OperationalHeader from '../components/OperationalHeader';
import RoleGuard from '../components/RoleGuard';

const hora = (data) => new Date(data).toLocaleTimeString('pt-BR', {
  hour: '2-digit',
  minute: '2-digit'
});

export default function MonitorCozinha() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pedidoEmAtualizacao, setPedidoEmAtualizacao] = useState('');
  const [erro, setErro] = useState('');
  const [atualizadoEm, setAtualizadoEm] = useState(null);

  const carregarPedidos = useCallback(async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível carregar os pedidos.');
      setPedidos(data);
      setAtualizadoEm(new Date());
      setErro('');
    } catch (error) {
      setErro(error.message || 'Falha ao atualizar a fila da cozinha.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const inicializacao = setTimeout(carregarPedidos, 0);
    const intervalo = setInterval(carregarPedidos, 10000);
    return () => {
      clearTimeout(inicializacao);
      clearInterval(intervalo);
    };
  }, [carregarPedidos]);

  const pedidosAbertos = useMemo(
    () => pedidos.filter((pedido) => !pedido.contaFechada),
    [pedidos]
  );
  const recebidos = pedidosAbertos.filter((pedido) => pedido.status === 'RECEBIDO');
  const emPreparo = pedidosAbertos.filter((pedido) => pedido.status === 'EM_PREPARO');
  const concluidos = pedidosAbertos
    .filter((pedido) => pedido.status === 'ENTREGUE')
    .slice(-5)
    .reverse();

  const atualizarStatus = async (pedido, status) => {
    setPedidoEmAtualizacao(pedido._id);
    setErro('');
    try {
      const response = await fetch(`/api/orders/${pedido._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível atualizar o pedido.');
      await carregarPedidos();
    } catch (error) {
      setErro(error.message || 'Falha ao atualizar o pedido.');
    } finally {
      setPedidoEmAtualizacao('');
    }
  };

  const renderizarPedido = (pedido, proximoStatus, rotuloBotao) => (
    <article className="ticket-card" key={pedido._id}>
      <div className="ticket-header">
        <div>
          <span className="ticket-table">Mesa {pedido.numeroMesa}</span>
          <span className="ticket-number">Comanda #{pedido._id.slice(-5).toUpperCase()}</span>
        </div>
        <time dateTime={pedido.createdAt}>{hora(pedido.createdAt)}</time>
      </div>
      <ul className="ticket-items">
        {pedido.itens.map((item, index) => (
          <li key={`${pedido._id}-${index}`}>
            <strong>{item.quantidade}×</strong>
            <span>{item.nome || item.menuItem?.nome || 'Item do cardápio'}</span>
            {item.modificadores && <small>{item.modificadores}</small>}
          </li>
        ))}
      </ul>
      {proximoStatus && (
        <button
          className="button button-primary full-width"
          disabled={pedidoEmAtualizacao === pedido._id}
          onClick={() => atualizarStatus(pedido, proximoStatus)}
        >
          {pedidoEmAtualizacao === pedido._id ? 'Atualizando...' : rotuloBotao}
        </button>
      )}
    </article>
  );

  return (
    <RoleGuard role="COZINHA">
    <main className="app-shell">
      <OperationalHeader
        title="Fila de preparo"
        description="KDS · cozinha em ordem de chegada"
        active="/cozinha"
      />

      {erro && <p className="feedback error" role="alert">{erro}</p>}

      <div className="kitchen-toolbar">
        <p>
          {atualizadoEm
            ? `Atualizado às ${hora(atualizadoEm)} · atualização automática a cada 10 segundos`
            : 'Buscando pedidos...'}
        </p>
        <button className="button button-quiet" onClick={carregarPedidos}>Atualizar agora</button>
      </div>

      {carregando ? (
        <p className="empty-state">Carregando fila...</p>
      ) : (
        <div className="kanban-board">
          {[
            { id: 'recebidos', title: 'Novos pedidos', entries: recebidos, status: 'RECEBIDO', next: 'EM_PREPARO', action: 'Iniciar preparo' },
            { id: 'preparo', title: 'Em preparo', entries: emPreparo, status: 'EM_PREPARO', next: 'ENTREGUE', action: 'Marcar como entregue' },
            { id: 'concluidos', title: 'Entregues recentemente', entries: concluidos, status: 'ENTREGUE', next: null, action: null }
          ].map((coluna) => (
            <section className="kanban-column" key={coluna.id}>
              <div className={`column-heading status-${coluna.status.toLowerCase()}`}>
                <h2>{coluna.title}</h2>
                <span>{coluna.entries.length}</span>
              </div>
              <div className="ticket-list">
                {coluna.entries.length === 0 ? (
                  <p className="empty-state compact">Nenhum pedido nesta etapa.</p>
                ) : (
                  coluna.entries.map((pedido) => renderizarPedido(pedido, coluna.next, coluna.action))
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
    </RoleGuard>
  );
}
