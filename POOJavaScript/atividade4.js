
class Funcionario {
    //atributos
    nome;
    salario;
    cargo;

    //constructor
    constructor(nome, salario, cargo) {
        this.nome = nome;
        this.salario = salario;
        this.cargo = cargo;
    }

    //método para aplicar o aumento
    aumentarSalario(percentual) {
        if (percentual > 0) {
        const valorDoAumento = this.salario * (percentual / 100);
        this.salario += valorDoAumento;

        console.log(`Salário de ${this.nome} aumentado em ${percentual}%.`,);
        } else {
        console.log("Erro: O percentual de aumento deve ser maior que zero.");
        }
    }

    //exibir informações
    exibirInfo() {console.log(`Nome: ${this.nome}
    Cargo: ${this.cargo}
    Salário: R$ ${this.salario.toFixed(2)}`);
    }
}

//instancia Obj de Funcionario
const funcionario1 = new Funcionario("Davi", 3000.0, "Astronauta",);

funcionario1.exibirInfo();
funcionario1.aumentarSalario(15); //aumento de 15%

funcionario1.exibirInfo();
