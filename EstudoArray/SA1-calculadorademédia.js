var prompt = require("prompt-sync")();

function calcularMedia(notas) {
  if (notas.length === 0) return 0;

  const somaTotal = notas.reduce((acumulador, notaAtual) => {
    return acumulador + notaAtual;
  }, 0);

  return somaTotal / notas.length;
}

function menuMedia() {
  let notas = [];
  let inserindo = true;

  console.log("\n=== Calculadora de Média ===");

  while (inserindo) {
    let entrada = prompt("Digite uma nota (ou 's' para calcular): ");

    if (entrada.toLowerCase() === "s") {
      inserindo = false;
    } else {
      let nota = Number(entrada);

      if (entrada !== "") {
        notas.push(nota);
        console.log(`Nota ${nota} adicionada.`);
      } else {
        console.log("Por favor, digite um número válido.");
      }
    }
  }

  if (notas.length > 0) {
    const media = calcularMedia(notas);
    console.log("--------------------------");
    console.log(`Notas inseridas: [ ${notas.join(" | ")} ]`);
    console.log(`A média final é: ${media.toFixed(2)}`);
    console.log("--------------------------");
  } else {
    console.log("Nenhuma nota foi registrada.");
  }
}

let continuar = true;
while (continuar) {
  menuMedia();
  let escolha = prompt("Deseja calcular outra média? (1. Sim / 2. Sair): ");
  if (escolha === "2") {
    continuar = false;
    console.log("Encerrando sistema...");
  }
}
