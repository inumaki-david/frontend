//Formulário de cadastro de nova tarefas com semantica de acessibilidade

function TarefaForm({ aoAddTarefa }) {
    function handleSubmit(e){
        e.preventDefault();
        //Simular a criação de Tarefa
        aoAddTarefa("Nova Tarefa Adicionada");
    }

    return(
        <form className="tarefa-form" onSubmit={handleSubmit}>
            <label htmlFor="">Titulo da Tarefa</label>
            <div className="input-group">
                <input
                    id="tarefa-titulo" 
                    type="text" 
                    placeholder="Ex.: Revisar Documentação"
                    required
                />
                <button type="submit" className="btn-primario">Adicionar</button>
            </div>
        </form>
    );
}

export default TarefaForm;