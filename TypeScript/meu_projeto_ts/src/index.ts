// Exemplo de Aplicação TypeScript

//===========================
// Definição da Interface (Exercicio 1)
// ===========================

interface Produto {
    nome: string;
    preco: number;
    categoria: string;
    emEstoque: boolean;
}

//===========================
// Criar Funções Tipadas (Exercicio 2)
//===========================

//função para calcular o desconto aplicado a um produto
function calcularDesconto (preco: number, percentual: number): number {
    return preco - (preco*(percentual/100));
}

//função para exibir informações do produto
function exibirInfo(p: Produto, desconto: number = 0): void {
    console.log(`Produto: ${p.nome.toLocaleUpperCase()}`);
    console.log("Categoria: " + p.categoria);
    console.log(`Status: ${p.emEstoque ? "Disponível" : "Indisponível"}`);
    if (desconto > 0) {
        const precoFinal = calcularDesconto(p.preco, desconto);
        console.log(`Preço: R$ ${precoFinal.toFixed(2)}`);
    } else {
        console.log(`Preço: R$ ${p.preco.toFixed(2)}`);
    }
    console.log("==================")
}

//===========================
// Execução da Aplicação
//===========================

console.log("===  SISTEMA DE INVENTÁRIO TS v1.0 ===\n");

// Criando uma lista de produtos baseada na interface
const listaProdutos: Produto[] = [
  {
    nome: "Notebook Gamer",
    preco: 4500.0,
    categoria: "Eletrônicos",
    emEstoque: true,
  },
  {
    nome: "Camiseta Algodão",
    preco: 89.9,
    categoria: "Vestuário",
    emEstoque: true,
  },
  {
    nome: "Teclado Mecânico",
    preco: 350.0,
    categoria: "Eletrônicos",
    emEstoque: false,
  },
];

// Percorrer a lista e aplicar desconto para Produtos de Eletrônicos
listaProdutos.forEach((produto) => {
    //se categoria eletrônica, aplicar 10% de desconto
    if (produto.categoria === "Eletrônicos" && produto.emEstoque) {
        exibirInfo(produto, 10);
    } else {
        exibirInfo(produto);
    }
});