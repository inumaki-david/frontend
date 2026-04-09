//classe para organização da interface da aplicação

export class TarefaView {
    constructor() {
        this.tarefaInput = document.getElementById("tarefaInput"); //entrada de dados da nova tarefa
        this.addTarefaBtn = document.getElementById("addTarefaBtn"); //botão para enviar tarefa
        this.listaTarefas = document.getElementById("listaTarefas"); //ul lista de tarefas
        this.mensagem = document.getElementById("mensagem"); //p para mensagem
    }

    //métodos

    //pegar a tarefa do input
    getTarefaInputValue() {
        return this.tarefaInput.value.trim();
    }

    //limpar o valor do input
    clearInput() {
        this.tarefaInput.value = "";
    }

    //manda mensagem para o usuário no parágrafo
    showMensagem() {
        this.mensagem.textContent = texto;
    }

    clearMensagem() {
        this.mensagem.textContent = "";
    }

    //renderizar a lista de tarefas
}