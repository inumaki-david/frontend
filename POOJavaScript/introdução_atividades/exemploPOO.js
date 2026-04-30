//estudos de POO em JavaScript
//Diferença entre Procedural e POO

//declaração de uma variável em procedural
let produto1 = {
    nome: "Impressora",
    preco: 1000,
    marca: "Epson",
    disponivel: true,
    desconto: function (){
        return this.preco*0.1; //desconto de 10% no preço
    }
} //coleção

let produto2 = {
    nome: "Mouse",
    preco: 100,
    marca: "Elgin",
    disponivel: false,
    desconto: function () {
        return this.preco*0.2; //desconto de 20%
    }
}

console.log(`
    Produto: ${produto1.nome},
    Preço: ${produto1.preco},
    Marca: ${produto1.marca},
    Disponível: ${produto1.disponivel ? "Sim":"Não"},
    Desconto: ${produto1.disponivel ? produto1.desconto():""}
`);

//criação de um obj com uma classe (poo)
class Produto {
    //atributos
    nome;
    preco;
    marca;
    disponivel;

    //métodos
    //construtor
    //no JS o construtor não tem o nome da classe ele chama apenas o constructor
    constructor(nome, preco, marca, disponibilidade) {
        this.nome = nome;
        this.preco = preco;
        this.marca = marca;
        this.disponivel = disponibilidade;
    }

    //método para aplicar o desconto
    desconto () {
        return this.preco*0.1; //10% de desconto
    }
    //mostrar as informações
    toString () {
        return `Produto: ${this.nome},
        Preço: ${this.preco},
        Marca: ${this.marca},
        Disponíveis: ${this.disponivel ? "SIm" : "Não"},
        Desconto: ${this.disponivel ? this.desconto(): ""}`
    }
}

//declaras os objetos
let p1 = new Produto("Headset", 200, "Dragon", true);
let p2 = new Produto("Microfone", 600, "Razer", false);

console.log(p1.toString());
console.log(p2.toString());