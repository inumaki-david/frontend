import { useState } from "react";

import Header from "./components/Header";
import TarefaForm from "./components/TarefaForm";
import TarefaItem from "./components/TarefaItem";
import TarefaList from "./components/TarefaList";
import { tarefaInicial } from "./data/tarefaMock";
import TarefaFilters from "./components/TarefaFilters";

function App(){

  const [tarefas, setTarefas] = useState(tarefaInicial);

  //estado para os botões
  const [filter, setFilter] = useState("todas");
  // const [termoBusca, setTermoBusca] = useState("");


  //Criando o Cálculo/lógica de Filtragem

  const visibilidadeTarefa = tarefa.filter((tarefa)=>{
    const filtragem = filter === "todas" ? true :
      filter === "completa" ? tarefas.completa : !tarefas.completa;

    return filtragem;
  })

  function handleMudar(id){
    setTarefas((prevTarefas)=> prevTarefas.map((tarefa)=> tarefa.id === id ? {...tarefa, completa: !tarefa.completa }: tarefa));

  }

  function handleRemover(id){
    setTarefas((prevTarefas)=> prevTarefas.filter((tarefa) => tarefa.id !== id));
  }

  //adicionar uma nova tarefa com 
  function handleAdicionar(titulo)  {
    const novaTarefa = {
      id: Date.now().toString(),
      titulo,
      descricao: "Nova Tarefa do Usuário",
      prioridade: "Normal",
      completa: false
    };

    // usando o método adicionar do react(imutabilidade)
    setTarefas((prevTarefas)=> [novaTarefa, ...prevTarefas]);
  }


  return(
    <main className="app-container">
      <Header/>
      <TarefaForm aoAddTarefa={handleAdicionar}/>
      <TarefaFilters currentFilter={filter} aoFiltrar={setFilter} />
      <p className="tarefa-contador">Tarefas Cadastradas: {tarefas.length}</p>
      <TarefaList tarefas={tarefas} />
    </main>
  );
}

export default App;