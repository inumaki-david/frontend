//Funções de Texto (String) -> Nativas

    const mensagem = "JavaScript é Incrível";

    //Função para contar quantos caracteres tem a variável (string.length)
    console.log(mensagem.length); //21

    //Função para Formatar em Maiúscula e Minúscula (string.toUpperCase, string.toLowerCase)
    console.log(mensagem.toUpperCase()); //JAVASCRIPT É INCRÍVEL
    console.log(mensagem.toLowerCase()); //javascript é incrível

    //Função para Substituir Partes do Texto (string.replace("",""))
    const mensagem2 = mensagem.replace("Java","Type");
    console.log(mensagem2); //TypeScript é incrível

    //Função para Exibir Partes Selecionadas do Texto (string.substring(X); string.substring(X,X); string.slice(-X))
    console.log(mensagem.substring(5)); //exibe apenas os caracteres não selecionados //"cript é Incrível"
    console.log(mensagem.substring(0,5)); //exibe um intervalo selecionado de caracteres //"JavaS"
    console.log(mensagem.slice(-11)); //exibe os últimos caracteres selecionados //" é Incrível"

    //Função para Remover Espaços Antes e Depois do Texto (string.trim)
    console.log(mensagem.trim()); //JavaScript é Incrível

    //Função para Separação da String (string.split)
    const mensagem3 = "Bom Tarde Com Muita Alegria";
    const array = mensagem3.split(" "); //usa o caracter ESPAÇO para separar //[ 'Bom', 'Tarde', 'Com', 'Muita', 'Alegria' ]
    console.log(array);
