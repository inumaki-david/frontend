"use strict";
// Criação da função 'calcularMedia'
function calcularMedia(estudante) {
    let somaDasNotas = 0;
    for (let nota of estudante.notas) {
        somaDasNotas = somaDasNotas + nota;
    }
    let media = somaDasNotas / estudante.notas.length;
    // Verificação de Aprovação
    if (media >= 7) {
        console.log(`Aluno(a): ${estudante.nome} | Média: ${media.toFixed(1)} -> Aprovado(a)`);
    }
    else {
        console.log(`Aluno(a): ${estudante.nome} | Média: ${media.toFixed(1)} -> Reprovado(a)`);
    }
}
// Cria um objeto de teste para um aluno com notas boas
const alunoSucesso = {
    nome: "Davi Martins",
    notas: [10.0, 9.5, 9.0, 8.5],
};
// Cria um objeto de teste para um aluno que precisa de ajuda
const alunoDificuldade = {
    nome: "Bruno Li",
    notas: [9.0, 9.0, 8.5, 10.0],
};
// Testa a função com os dois estudantes criados
calcularMedia(alunoSucesso);
calcularMedia(alunoDificuldade);
