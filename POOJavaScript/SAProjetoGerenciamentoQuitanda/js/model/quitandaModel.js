export class QuitandaModel {
    constructor() {
        this.produtos = []; // Armazenamento de itens atuais
        this.historico = []; // Registro de todas as ações realizadas
    }

    addProduct(nome, categoria, preco, qtd) {
        // Aplicação das Regras de Negócio (RN-002 e RN-003)
        if (!nome || preco <= 0 || qtd < 0) return { erro: "Dados inválidos!" };

        const produtoExistente = this.produtos.find(p => p.name === nome);

        if (produtoExistente) {
            // Atualiza apenas a quantidade se o produto já constar na lista
            produtoExistente.quantity += Number(qtd);
            this.registrarMovimentacao(nome, 'Entrada', qtd);
            return { msg: "Estoque atualizado!" };
        } else {
            // Cria um novo objeto de produto caso seja a primeira entrada
            const novo = { name: nome, category: categoria, price: Number(preco), quantity: Number(qtd) };
            this.produtos.push(novo);
            this.registrarMovimentacao(nome, 'Cadastro/Entrada', qtd);
            return { msg: "Produto cadastrado com sucesso!" };
        }
    }

    sellProduct(nome, qtd) {
        const produto = this.produtos.find(p => p.name === nome);
        
        // Validação de estoque suficiente (RN-004)
        if (!produto || produto.quantity < qtd) {
            return { erro: "Estoque insuficiente ou produto inexistente!" };
        }

        produto.quantity -= Number(qtd);
        this.registrarMovimentacao(nome, 'Venda', -qtd);
        return { msg: "Venda realizada!" };
    }

    removeProduct(nome) {
        const index = this.produtos.findIndex(p => p.name === nome);
        
        if (index !== -1) {
            const qtd = this.produtos[index].quantity;
            
            // Remove o item da lista sem afetar os outros índices
            this.produtos.splice(index, 1);
            
            this.registrarMovimentacao(nome, 'Descarte', -qtd);
            return { msg: "Produto descartado/removido com sucesso!" };
        }
        
        return { erro: "Produto não encontrado no estoque!" };
    }

    registrarMovimentacao(nome, tipo, qtd) {
        // Garante que toda ação seja rastreável (RN-005)
        this.historico.push({
            data: new Date().toLocaleString(),
            nome,
            tipo,
            qtd
        });
    }

    getDashboardData() {
        // Cálculo do valor total parado em estoque (Preço x Quantidade)
        const totalEstoqueReais = this.produtos.reduce((acc, p) => acc + (p.price * p.quantity), 0);

        // Filtra o histórico para calcular o faturamento real apenas com saídas do tipo 'Venda'
        const totalVendasReais = this.historico
            .filter(h => h.tipo === 'Venda')
            .reduce((acc, h) => {
                const produto = this.produtos.find(p => p.name === h.nome);
                // Math.abs garante que a quantidade negativa do histórico seja tratada como positiva no cálculo
                return acc + (produto ? produto.price * Math.abs(h.qtd) : 0);
            }, 0);

        const totalItensVendidos = this.historico
            .filter(h => h.tipo === 'Venda')
            .reduce((acc, h) => acc + Math.abs(h.qtd), 0);

        // Agrupamento de vendas e estoque por categoria para visão analítica
        const vendasPorCategoria = {};
        this.historico.filter(h => h.tipo === 'Venda').forEach(h => {
            const produto = this.produtos.find(p => p.name === h.nome);
            if (produto) {
                vendasPorCategoria[produto.category] = (vendasPorCategoria[produto.category] || 0) + Math.abs(h.qtd);
            }
        });

        const categorias = {};
        this.produtos.forEach(p => {
            categorias[p.category] = (categorias[p.category] || 0) + p.quantity;
        });

        return {
            totalEstoqueReais,
            totalVendasReais,
            totalItensVendidos,
            categorias,
            vendasPorCategoria
        };
    }
}