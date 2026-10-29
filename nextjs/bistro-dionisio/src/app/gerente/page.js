'use client';

import { useCallback, useEffect, useState } from 'react';
import OperationalHeader from '../components/OperationalHeader';
import RoleGuard from '../components/RoleGuard';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const categorias = ['Pratos', 'Entradas', 'Lanches', 'Bebidas', 'Sobremesas'];

export default function PainelGerente() {
  const [itens, setItens] = useState([]);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Pratos');
  const [preco, setPreco] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState('');
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);
  const [edicao, setEdicao] = useState({ nome: '', categoria: '', preco: '' });
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');

  const carregarCardapio = useCallback(async () => {
    try {
      const response = await fetch('/api/menu');
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível carregar o cardápio.');
      setItens(data);
      setErro('');
    } catch (error) {
      setErro(error.message || 'Falha ao carregar o cardápio.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const inicializacao = setTimeout(carregarCardapio, 0);
    return () => clearTimeout(inicializacao);
  }, [carregarCardapio]);

  const adicionarItem = async (event) => {
    event.preventDefault();
    setSalvando(true);
    setErro('');
    setAviso('');
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, categoria, preco: Number(preco) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível cadastrar o item.');

      setNome('');
      setPreco('');
      setAviso('Item adicionado ao cardápio.');
      await carregarCardapio();
    } catch (error) {
      setErro(error.message || 'Falha ao cadastrar item.');
    } finally {
      setSalvando(false);
    }
  };

  const alternarDisponibilidade = async (item) => {
    setErro('');
    setAviso('');
    try {
      const response = item.disponivel
        ? await fetch(`/api/menu/${item._id}`, { method: 'DELETE' })
        : await fetch(`/api/menu/${item._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ disponivel: true })
        });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível alterar a disponibilidade.');
      setAviso(item.disponivel ? 'Item indisponível no salão.' : 'Item disponível no salão.');
      await carregarCardapio();
    } catch (error) {
      setErro(error.message || 'Falha ao alterar item.');
    }
  };

  const iniciarEdicao = (item) => {
    setEditandoId(item._id);
    setEdicao({
      nome: item.nome,
      categoria: item.categoria,
      preco: String(item.preco)
    });
    setErro('');
    setAviso('');
  };

  const salvarEdicao = async (event, id) => {
    event.preventDefault();
    setSalvandoEdicao(true);
    setErro('');
    setAviso('');
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: edicao.nome.trim(),
          categoria: edicao.categoria,
          preco: Number(edicao.preco)
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível atualizar o item.');

      setEditandoId('');
      setAviso('Item atualizado com sucesso.');
      await carregarCardapio();
    } catch (error) {
      setErro(error.message || 'Falha ao atualizar o item.');
    } finally {
      setSalvandoEdicao(false);
    }
  };

  const cancelarEdicao = () => {
    setEditandoId('');
    setEdicao({ nome: '', categoria: '', preco: '' });
  };

  const itensDisponiveis = itens.filter((item) => item.disponivel).length;

  return (
    <RoleGuard role="GERENTE">
    <main className="app-shell">
      <OperationalHeader
        title="Gestão do cardápio"
        description="Gerência · produtos e disponibilidade"
        active="/gerente"
      />

      {erro && <p className="feedback error" role="alert">{erro}</p>}
      {aviso && <p className="feedback success" role="status">{aviso}</p>}

      <div className="manager-summary">
        <span className="summary-number">{itensDisponiveis}</span>
        <span>itens disponíveis para pedidos</span>
      </div>

      <div className="manager-layout">
        <section className="panel manager-form-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Novo produto</p>
              <h2>Adicionar ao cardápio</h2>
            </div>
          </div>
          <form className="manager-form" onSubmit={adicionarItem}>
            <label className="field-label" htmlFor="nome-item">Nome do prato ou bebida</label>
            <input
              id="nome-item"
              className="text-input"
              type="text"
              maxLength="100"
              required
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Ex.: Risoto de cogumelos"
            />

            <label className="field-label" htmlFor="categoria-item">Categoria</label>
            <select id="categoria-item" className="text-input" value={categoria} onChange={(event) => setCategoria(event.target.value)}>
              {categorias.map((opcao) => <option key={opcao}>{opcao}</option>)}
            </select>

            <label className="field-label" htmlFor="preco-item">Preço (R$)</label>
            <input
              id="preco-item"
              className="text-input"
              type="number"
              min="0.01"
              step="0.01"
              required
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
              placeholder="0,00"
            />

            <button className="button button-primary full-width" type="submit" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Cadastrar item'}
            </button>
          </form>
        </section>

        <section className="panel menu-management-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Produtos cadastrados</p>
              <h2>Itens do cardápio</h2>
            </div>
            <button className="button button-quiet" onClick={carregarCardapio}>Atualizar</button>
          </div>
          {carregando ? (
            <p className="empty-state">Carregando itens...</p>
          ) : itens.length === 0 ? (
            <p className="empty-state">Nenhum item cadastrado. Adicione o primeiro ao cardápio.</p>
          ) : (
            <div className="menu-table-wrap">
              <table className="menu-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Disponibilidade</th>
                    <th><span className="visually-hidden">Ações</span></th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item) => {
                    const emEdicao = editandoId === item._id;
                    return (
                      <tr key={item._id}>
                        <td>
                          {emEdicao ? (
                            <input
                              className="menu-edit-input"
                              aria-label={`Nome de ${item.nome}`}
                              type="text"
                              maxLength="100"
                              required
                              value={edicao.nome}
                              onChange={(event) => setEdicao({ ...edicao, nome: event.target.value })}
                            />
                          ) : <strong>{item.nome}</strong>}
                        </td>
                        <td>
                          {emEdicao ? (
                            <select
                              className="menu-edit-input"
                              aria-label={`Categoria de ${item.nome}`}
                              value={edicao.categoria}
                              onChange={(event) => setEdicao({ ...edicao, categoria: event.target.value })}
                            >
                              {[...new Set([...categorias, item.categoria])].map((opcao) => (
                                <option key={opcao}>{opcao}</option>
                              ))}
                            </select>
                          ) : item.categoria}
                        </td>
                        <td>
                          {emEdicao ? (
                            <input
                              className="menu-edit-input price-edit-input"
                              aria-label={`Preço de ${item.nome}`}
                              type="number"
                              min="0.01"
                              step="0.01"
                              required
                              value={edicao.preco}
                              onChange={(event) => setEdicao({ ...edicao, preco: event.target.value })}
                            />
                          ) : moeda.format(item.preco)}
                        </td>
                        <td>
                          <span className={item.disponivel ? 'availability available' : 'availability unavailable'}>
                            {item.disponivel ? 'Disponível' : 'Indisponível'}
                          </span>
                        </td>
                        <td>
                          <div className="menu-row-actions">
                            {emEdicao ? (
                              <form className="edit-actions" onSubmit={(event) => salvarEdicao(event, item._id)}>
                                <button className="button button-small button-primary" type="submit" disabled={salvandoEdicao}>
                                  {salvandoEdicao ? 'Salvando...' : 'Salvar'}
                                </button>
                                <button className="button button-small button-quiet" type="button" onClick={cancelarEdicao} disabled={salvandoEdicao}>
                                  Cancelar
                                </button>
                              </form>
                            ) : (
                              <>
                                <button
                                  className="button button-small button-outline"
                                  onClick={() => iniciarEdicao(item)}
                                  disabled={Boolean(editandoId)}
                                >
                                  Editar
                                </button>
                                <button
                                  className="button button-small button-outline"
                                  onClick={() => alternarDisponibilidade(item)}
                                  disabled={Boolean(editandoId)}
                                >
                                  {item.disponivel ? 'Indisponibilizar' : 'Reativar'}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
    </RoleGuard>
  );
}
