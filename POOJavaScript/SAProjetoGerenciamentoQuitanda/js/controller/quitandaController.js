export class QuitandaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init(); // Inicializa os ouvintes de eventos assim que o objeto é criado
    }

    init() {
        // Vincula os cliques dos botões principais às funções de tratamento
        document.getElementById('btn-salvar').addEventListener('click', () => this.handleAddProduct());
        document.getElementById('btn-venda').addEventListener('click', () => this.handleSellProduct());
        
        // Delegação de Eventos. Ouvimos o container pai para detectar cliques 
        // em botões que são criados dinamicamente (botão de excluir no estoque).
        document.getElementById('lista-estoque').addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-remover')) {
                const nome = event.target.getAttribute('data-nome');
                this.handleRemoveProduct(nome);
            }
        });
    }

    handleAddProduct() {
        // Captura os valores atuais dos inputs de cadastro
        const nome = document.getElementById('p-nome').value;
        const cat = document.getElementById('p-categoria').value;
        const preco = document.getElementById('p-preco').value;
        const qtd = document.getElementById('p-qtd').value;

        const resultado = this.model.addProduct(nome, cat, preco, qtd);
        this.processarResultado(resultado);
    }

    handleSellProduct() {
        // Captura os valores para o registro de saída
        const nome = document.getElementById('v-nome').value;
        const qtd = document.getElementById('v-qtd').value;

        const resultado = this.model.sellProduct(nome, qtd);
        this.processarResultado(resultado);
    }

    // Centralização de Resposta. Este método padroniza o que acontece
    // após qualquer ação bem-sucedida ou erro no Model.
    processarResultado(res) {
        if (res.erro) {
            this.view.notify(res.erro, true);
        } else {
            this.view.notify(res.msg);
            
            // Orquestra a atualização de todos os componentes visuais
            this.view.renderStock(this.model.produtos);
            this.view.renderSales(this.model.historico);
            
            // Recalcula e atualiza os dados do painel de indicadores
            const stats = this.model.getDashboardData();
            this.view.renderDashboard(stats);
            
            // Atualiza a lista de seleção (dropdown) para refletir o estoque atualizado
            this.view.updateProductDropdown(this.model.produtos);
        }
    }

    handleRemoveProduct(nome) {
        // Validação simples antes de disparar a exclusão definitiva no Model
        if (confirm(`Tem certeza que deseja excluir '${nome}' do estoque?`)) {
            const resultado = this.model.removeProduct(nome);
            this.processarResultado(resultado);
        }
    }
}