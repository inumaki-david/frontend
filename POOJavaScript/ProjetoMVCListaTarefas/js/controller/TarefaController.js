//classe controller para realizar a interação entre o Model e o View

export class TarefaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    //função que roda no início do sistema
    init() {
        //evento para adicionar tarefas 
        this.view.addTarefaBtn.addEventListener("click", () => this.addTarefa());
        this.updateView();
    }

    //função para adicionar tarefas
    addTarefa() {
        const titulo = this.view.getTarefaInputValue(); //pega o valor do input

        if(titulo === ""){
            //mandar mensagem de erro
            this.view.showMensagem("O título da tarefa não pode ser vazio");
            return; //interrompe a função
        }

        //constinuo escrevendo a função
        this.view.clearMensagem(); //limpa a mensagem de erro
        this.model.addTarefa(titulo); //adiciona o título da tarefa no model
        this.view.clearInput(); //limpa o input
        this.updateView(); //atualzia o view
    }

    //função para mudar a tarefa para concluída ou não concluída
    atualizarTarefa(id) {
        this.model.atualizarTarefa(id); //atualizar a tarefa no model
        this.updateView(); //atualiza o view
    }

    //função para remover a tarefa
    removerTarefa(id) {
        this.model.removerTarefa(id); //remove a tarefa no model
        this.updateView();
    }

    //função para renderizar e atualizar a lista de tarefas no view
    updateView() {
        this.view.renderTarefa(
            this.model.getTarefas(),
            (id) => this.atualizarTarefa(id),
            (id) => this.removerTarefa(id)
        );
    }
}