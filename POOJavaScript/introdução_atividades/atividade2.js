
class Veiculo {
    //atributos
    marca;
    modelo;
    ano;

    constructor(marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    exibirInfo() {
        return `Veículo: ${this.marca} ${this.modelo}, Ano: ${this.ano}`;
    }
}

class Carro extends Veiculo {
    //novo atributo
    quantidadePortas;

    constructor(marca, modelo, ano, quantidadePortas) {
        super(marca, modelo, ano);
        this.quantidadePortas = quantidadePortas;
    }

    exibirInfo() {
        return `${super.exibirInfo()}, Portas: ${this.quantidadePortas}`;
    }
}

//instacia Obj de Veiculo
const veiculo1 = new Veiculo("Volkswagen", "T-Cross", 2022);
console.log(veiculo1.exibirInfo());

//Instancia Obj de Carro
const veiculo2 = new Carro("Toyota", "Corolla", 2024, 4);
console.log(veiculo2.exibirInfo());
