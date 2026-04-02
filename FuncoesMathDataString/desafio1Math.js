// Desafio: Criar um jogo de adivinhação para um número sorteado

const prompt = require("prompt-sync")();

var continuar = true;

do {
  var numeroSecreto = Math.round(Math.random() * 100); // Sorteia um número de 0 a 100
  var contadorTentativas = 0;
  var acertou = false;

  while (acertou == false) {
    console.log("Tentativas: " + contadorTentativas);
    chute = prompt("Chute um número: ");

    if (chute < numeroSecreto) {
      console.log("\n\nERROU! Seu chute foi menor que o número sorteado!\n\n");
      contadorTentativas++;
    } else if (chute > numeroSecreto) {
      console.log("\n\nERROU! Seu chute foi maior que o número sorteado!\n\n");
      contadorTentativas++;
    } else {
      console.log(
        "\n\nACERTOU! O número sorteado era " + numeroSecreto + "\n\n",
      );
      acertou = true;
    }
  }

  console.log("\n\nDeseja continuar?\n1. Sim\n2. Não\n\n");
  var op = prompt("Escolha: ");

  if (op == 1) {
    numeroSecreto = Math.round(Math.random() * 100); // Sorteia um número de 1 a 100
    contadorTentativas = 0;
    acertou = false;
    continuar = true;
  } else {
    continuar = false;
    console.log("Saindo...");
  }
} while (continuar);
