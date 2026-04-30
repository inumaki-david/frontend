export class QuitandaView {
    renderStock(produtos) {
        const container = document.getElementById('lista-estoque');
        
        if (produtos.length === 0) {
            container.innerHTML = '<p class="stats-categoria">Nenhum produto em estoque.</p>';
            return;
        }

        // O método reduce() varre o array 'produtos' e o transforma em um objeto agrupado.
        // Se a categoria ainda não existe no acumulador 'grupos', ele cria um array vazio para ela e depois adiciona o produto.
        const produtosAgrupados = produtos.reduce((grupos, produto) => {
            if (!grupos[produto.category]) {
                grupos[produto.category] = [];
            }
            grupos[produto.category].push(produto);
            return grupos;
        }, {});

        let html = '';
        
        // Object.entries() pega o objeto 'produtosAgrupados' e o divide em pares [chave, valor].
        // Isso permite usar o loop 'for...of' para extrair o nome da 'categoria' e a lista de 'itens' dela simultaneamente.
        for (const [categoria, itens] of Object.entries(produtosAgrupados)) {
            html += `<h3 class="categoria-titulo">${categoria}</h3>`;
            html += `<ul>`;
            itens.forEach(p => {
                html += `<li>
                            <span>${p.name} (R$ ${p.price} | Qtd: ${p.quantity})</span>
                            <button class="btn-remover" data-nome="${p.name}">Excluir</button>
                         </li>`;
            });
            html += `</ul>`;
        }

        container.innerHTML = html;
    }

    renderSales(historico) {
        const lista = document.getElementById('lista-historico');
        
        // O método map() transforma cada item do array de histórico em uma linha <li> HTML.
        // Em seguida, o join('') une todas essas linhas soltas em uma única string de texto contínua para o innerHTML.
        lista.innerHTML = historico.map(h => 
            `<li>[${h.data}] ${h.tipo}: ${h.nome} (${h.qtd})</li>`
        ).join('');
    }

    notify(mensagem, erro = false) {
        alert(mensagem); 
    }

    updateProductDropdown(produtos) {
        const select = document.getElementById('v-nome');
        
        let optionsHTML = '<option value="">Selecione um produto</option>';
        
        produtos.forEach(p => {
            optionsHTML += `<option value="${p.name}">${p.name} (Estoque: ${p.quantity})</option>`;
        });
        
        select.innerHTML = optionsHTML;
    }

    renderDashboard(data) {
        const container = document.getElementById('dashboard-cards');
        
        // Criação de uma função embutida para formatação financeira.
        // O toLocaleString formata o número automaticamente incluindo 'R$', pontos e vírgulas (padrão pt-BR).
        const money = (val) => val.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        const categoriasHTML = Object.entries(data.categorias)
            .map(([cat, qtd]) => `<p><strong>${cat}:</strong> ${qtd} itens</p>`)
            .join('');

        const vendasCatHTML = Object.entries(data.vendasPorCategoria)
            .map(([cat, qtd]) => `<p><strong>${cat}:</strong> ${qtd} un.</p>`)
            .join('');

        container.innerHTML = `
            <div class="card card-vermelho">
                <h3>Total em Vendas</h3>
                <p>${money(data.totalVendasReais)}</p>
            </div>
            <div class="card card-laranja">
                <h3>Valor em Estoque</h3>
                <p>${money(data.totalEstoqueReais)}</p>
            </div>
            <div class="card card-amarelo">
                <h3>Itens Vendidos</h3>
                <p>${data.totalItensVendidos} un.</p>
                <div class="stats-categoria">
                    <br>
                    ${vendasCatHTML || '<p>Nenhuma venda</p>'}
                </div>
            </div>
            <div class="card card-branco">
                <h3>Estoque por Categoria</h3>
                <div class="stats-categoria">${categoriasHTML || '<p>Nenhum</p>'}</div>
            </div>
        `;
    }
}