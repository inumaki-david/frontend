//Funções de Data e Hora

    const agora = new Date();

    //Exibe Data e Horário Atual
    console.log(agora);

    //imprime a hora em formato de string
    console.log(agora.toDateString());

    //imprime a data em formato local
    console.log(agora.toLocaleDateString());

    //getters
    console.log(agora.getFullYear());

    //operadores de Data e hora

    let data1 = new Date("2026-02-10");
    let data2 = new Date("2026-12-18");

    let diferenca = data2 - data1;

    //calcular os dias para a formatura
    console.log((diferenca / 1000) * 60 * 60 * 24);
