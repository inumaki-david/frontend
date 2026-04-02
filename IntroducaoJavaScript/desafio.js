//desafio 1

var idade = 16;

if (idade < 18) {
  console.log("Menor de Idade");
} else if (idade < 60) {
  console.log("Adulto");
} else {
  console.log("Idoso");
}

//desafio 2 - tabuada do 5

let num = 5;
for (let i = 0; i <= 20; i++) {
  console.log("5 x " + i + "= " + i * num);
}

//desafio 3

for (let i = 1; i <= 20; i++) {
  //imprimir nº pares
  let resto = i % 2; //pega o resto da divisão
  if (resto == 0) {
    console.log(i);
  }
}
