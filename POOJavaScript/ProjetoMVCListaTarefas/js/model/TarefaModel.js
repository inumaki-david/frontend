//base da estrutura do aplicativo
//é a classe responsável pela modelagem de dados


//adicionar uma anotação na classe => export
//que essa classe será usada em otras partes do código
export class TarefaModel {
    
    //JS permite colocar atributos diretamente no construtor
    constructor() {
        this.tarefas = []; //cria um vetor para as tarefas
        this.currentId =1; //contador para o id
    }

    //métodos
    
    //adicionar tarefas (create)
    addTarefas(titulo) {
        const newTarefa = {
            id: this.currentId++,
            titulo: titulo,
            completed: false
        };
        this.tarefas.push(newTarefa); //adiciona a tarefa ao vetor
    }
    
    //buscar as tarefas (read)
    getTarefas() {
        return this.tarefas; //retorna o vetor de tarefas
    }
    
    //atualizar as tarefas (update)
    atualizarTarefa(id) {
        const tarefa = this.tarefas.find(tarefa => tarefa.id === id);
        if(tarefa){ //sea tarefa for encontrada
            tarefa.completed = !this.tarefas.completed; //inverter o valor da booelana 
        }
    } 
    
    //remover a tarefa do vetor (delete) 
    removeTarefa(id) {
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id)
    }
}

//Análise: o que feito?
//Um Crud
//Vetor de Tarefas
//ID automático para as tarefas