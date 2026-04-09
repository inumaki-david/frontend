
class Produto {
    //atributos
    nome;
    preco;
    estoque;

    //constructor
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    //método para reduzir o estoque ao vender
    vender(quantidade) {
        if (quantidade <= this.estoque) {
        this.estoque -= quantidade;
        console.log(`\nVenda realizada: ${quantidade} unidades de ${this.nome}.`);
        } else {
        console.log(
            `Erro: Estoque insuficiente para vender ${quantidade} unidade(s) de ${this.nome}.`,
        );
        }
    }

    //método para aumentar o estoque ao repor
    repor(quantidade) {
        this.estoque += quantidade;
        console.log(
        `\nEstoque atualizado: +${quantidade} unidade(s) de ${this.nome}.`,
        );
    }

    //método para exibir
    exibirInfo() {
        console.log(`\nProduto: ${this.nome}
            Preço: R$ ${this.preco.toFixed(2)}
            Estoque Atual: ${this.estoque} unidades`);
    }
}

//instancia Obj de Produto
const produto1 = new Produto("Teclado Mecânico", 250.0, 10);

produto1.exibirInfo();

produto1.vender(3); //vende 3 produtos
produto1.repor(5); //repõe 5 produtos no estoque

produto1.exibirInfo();
