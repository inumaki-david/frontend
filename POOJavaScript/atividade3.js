
class ContaBancaria {
    //atributos
    titular;
    saldo;

    constructor(titular, saldoInicial = 0) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    //método que adiciona valor ao saldo
    depositar(valor) {
        if (valor > 0) {
        this.saldo += valor;
        console.log(`Depósito de R$ ${valor} realizado com sucesso!`);
        } else {
        console.log("Erro: O valor do depósito deve ser positivo.");
        }
    }

    //método que remove valor do saldo
    sacar(valor) {
        if (valor <= 0) {
        console.log("Erro: O valor do saque deve ser positivo.");
        } else if (valor > this.saldo) {
        console.log(`Saldo insuficiente! Saldo disponível: R$ ${this.saldo}`);
        } else {
        this.saldo -= valor;
        console.log(`Saque de R$ ${valor} realizado. Novo saldo: R$ ${this.saldo}`);
        }
    }

    //exibir informações
    exibirSaldo() {
        console.log(`Titular: ${this.titular}`);
        console.log(`Saldo Atual: R$ ${this.saldo.toFixed(2)}`);
    }
}

//instancia Obj de Conta Bancaria
const conta = new ContaBancaria("Davi", 500);

conta.exibirSaldo();

conta.depositar(200); //deposita 200 reais
conta.sacar(100); // saca 100 reais
conta.sacar(1000); //tenta sacar 1000 reais

conta.exibirSaldo();
