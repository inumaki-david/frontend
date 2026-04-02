//calculadora simples em JavaScript
//usar o prompt
var prompt = require("prompt-sync")(); //import da biblioteca

//funções de cálculo

//soma
function soma(a, b) {
  return a + b;
}
//sub
function sub(a, b) {
  return a - b;
}
//multi
function multi(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

//menu
function menu() {
  let operacao;
  let numero1;
  let numero2;
  let resultado;
  console.log("===Calculadora Simples===");
  console.log("| 1. Soma                ");
  console.log("| 2. Subtração           ");
  console.log("| 3. Multiplicação       ");
  console.log("| 4. Divisão             ");
  console.log("=========================");
  console.log("===Escolha a Operação====");
  operacao = prompt();
  numero1 = Number(prompt("Digite o 1º Número: ")); //recebe o nº1
  numero2 = Number(prompt("Digite o 2º Número: ")); //recebe o nº 2
  //switch case
  switch (operacao) {
    case "1":
      resultado = soma(numero1, numero2);
      console.log("Resultado >> " + resultado);
      break;
    case "2":
      resultado = sub(numero1, numero2);
      console.log("Resultado >> " + resultado);
      break;
    case "3":
      resultado = multi(numero1, numero2);
      console.log("Resultado >> " + resultado);
      break;
    case "4":
      if (num2 == 0) {
        console.log("ERRO: Não é possível dividir por ZERO!");
        resultado = null
      } else {
        resultado = div(numero1, numero2);
        console.log(">> Resultado: " + resultado);
      }
      break;
    default:
      console.log("ERRO: Escolha uma opção válida!")
      break;
    //fim do switch
  }
}

//não chamei a função MENU, então chamar a função em um loop WHILE
var continuar = true;
while(continuar) {
  menu()
  let escolha = prompt("1. Continuar // 2. Sair\n");
  if (escolha == 2) {
    continuar = false;
    console.log("Saindo...")
  }
}
