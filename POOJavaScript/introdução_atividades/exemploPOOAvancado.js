//Estudos Avançados em POO em JS

//criação de uma classe
class Pessoa {
  //abstract class somente funcionar no TypeScript
  //atributos
  #nome;
  #idade;
  #cpf;

  //constructor
  constructor(nome, idade, cpf) {
    this.#nome = nome;
    this.#idade = idade;
    this.#cpf = cpf;
  }

  //getters and setters publics
  getNome() {
    //pega o valor do atributo privado
    return this.#nome;
  }

  getIdade() {
    return this.#idade;
  }

  getCpf() {
    return this.#cpf;
  }

  setNome(nome) {
    this.#nome = nome;
  }

  setIdade(idade) {
    this.#idade = idade;
  }

  //método de acesso
  exibirInfo() {
    console.log(
      `Nome: ${this.#nome}\nIdade: ${this.#idade}\nCPF: ${this.#cpf}`,
    );
  }
}

//instanciar Obj de Pessoas
let pessoa1 = new Pessoa("Davi", 17, "537.653.1980-80");
let pessoa2 = new Pessoa("Rodrigo", 18, "987.654.321-00");

pessoa1.exibirInfo();
pessoa2.exibirInfo();

//alterar a idade da pessoa 2
pessoa1.exibirInfo();
pessoa2.setIdade(19);

//herança em POO (extends)

class Funcionario extends Pessoa {
    //funcionario herda as características de Pessoa
    //novos atributos para funcionario
    #cargo;
    #salario;

    //constructor
    constructor(nome, idade, cpf, cargo, salario) {
        super(nome, idade, cpf); //chama os atributos da superclasse
        this.#cargo;
        this.#salario;
    }

    //métodos que estão faltando
    getCargo () {
        return this.#cargo;
    }

    getSalario () {
        return this.#salario;
    }

    setCargo (cargo) {
        this.#cargo = cargo;
    }

    setSalario (novoSalario) {
        this.#salario = novoSalario;
    }

    //método de acesso
    exibirInfo () { //polimorfismo
        super.exibirInfo();
        console.log(`Cargo: ${this.#cargo}\nSalaário: ${this.#salario}`);
    }
}

//instanciar Obj de Funcionario
let funcionario1 = new Funcionario("Evelyn", 17, "111.222.333-64", "Motorista de Aplicativo", 1200);

funcionario1.exibirInfo();
funcionario1.setSalario(2500);
funcionario1.exibirInfo();
