//declaração de um array
let array = []; //array dinâmico

//tipos de array 
let arrayNumerico = [1,2,3,4,5,6,7,8,9];
let arrayTexto = ["Sapato","Chinelo","Tamanco"];
let arrayMisto = [1,"José",true];

//tamanho de um array (length)
console.log(arrayNumerico.length); //9

//acessar a posição de um array
console.log(arrayTexto[1]); //chinelo

//adicionar elementos no array
// -> array.push (no final do array) -> array.unshift (no começo do array)
arrayTexto.push("Tênis");
console.log(arrayTexto);
arrayTexto.unshift("Sandália");
console.log(arrayTexto);

//substituir o valor de um elemento
arrayTexto[2] = "Crocs";
console.log(arrayTexto);

//remover elementos no array
// -> array.pop (no final do array) -> array.shift (no começo do texto)
arrayTexto.pop();
console.log(arrayTexto);
arrayTexto.shift();
console.log(arrayTexto);

//Laços de Repetição

//percorrer um array com FOR
for(let i=0; i<arrayNumerico.length; i++){
    console.log([`indice[${i}] = ${arrayNumerico[i]}`]); //formato moderno de incluir texto em JS
}

//forEach (para cada elemento do array) //só pode ser usada em um array
arrayMisto.forEach(e => {
    console.log(e);
})

// Métodos úteis de Arrays

//indexOf
console.log(arrayNumerico.indexOf(5)); //4
console.log(arrayNumerico.indexOf(10)); //-1 (elemento inexistente)

//Splice
arrayMisto.splice(2,1); //remove o elemento do indíce 2, por uma única vez
console.log(arrayMisto);
