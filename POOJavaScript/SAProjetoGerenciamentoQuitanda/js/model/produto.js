export class Produto {
    // O constructor define os atributos básicos que todo produto deve possuir ao ser criado
    constructor(id, name, category, price, quantity) {
        this.id = id;             // Identificador único do produto
        this.name = name;         // Nome do produto (ex: Toddynho)
        this.category = category; // Grupo ao qual pertence (ex: Bebidas)
        this.price = price;       // Valor unitário de venda
        this.quantity = quantity; // Quantidade disponível inicialmente no estoque
    }
}