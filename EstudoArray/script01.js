//Operações Avançadas de Array

let valores = [10,20,30,40,50];

// map -> Criação de Novos Valores de um Array
let valoresDobro = valores.map(x => x * 2);
console.log(valoresDobro); //[20,40,60,80,100]

// filter -> Filtragem de Dados de um Array
let valoresFilter = valores.filter(x => x > 25);
console.log(valoresFilter); //[30,40,50]

// reduce -> Transforma um Array em uma Variável Simples
let valoresSoma = valores.reduce((soma,e)=>soma+e);
console.log(valoresSoma);

// sort -> Ordenação de um Array
let valoresAleatorio = [7,4,2,9,1,5,8,6,3];
console.log(valoresAleatorio);
let valoresOrdenado = valoresAleatorio.sort();
console.log(valoresOrdenado);