// Definição da Interface 'Estudante'
interface Estudante {
  nome: string; 
  notas: number[]; 
}

// Criação da função 'calcularMedia'
function calcularMedia(estudante: Estudante): void {
  let somaDasNotas = 0;

  for (let nota of estudante.notas) {
    somaDasNotas = somaDasNotas + nota;
  }

  let media = somaDasNotas / estudante.notas.length;

  // Verificação de Aprovação
  if (media >= 7) {
    console.log(
      `Aluno(a): ${estudante.nome} | Média: ${media.toFixed(1)} -> Aprovado(a)`,
    );
  } else {
    console.log(
      `Aluno(a): ${estudante.nome} | Média: ${media.toFixed(1)} -> Reprovado(a)`,
    );
  }
}

const aluno1: Estudante = {
  nome: "Davi Martins",
  notas: [10.0, 9.5, 9.0, 8.5],
};

const aluno2: Estudante = {
  nome: "Bruno Li",
  notas: [9.0, 9.0, 8.5, 10.0],
};

// Testa a função com os dois estudantes criados
calcularMedia(aluno1);
calcularMedia(aluno2); 
