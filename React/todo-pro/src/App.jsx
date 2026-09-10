import { useState } from "react";

function App() {
  // Estados de Autenticação e Navegação
  const [usuarioAtual, setUsuarioAtual] = useState(""); // Nome do funcionário logado
  const [nomeInput, setNomeInput] = useState(""); // Campo temporário para login

  // Estados Principais da Aplicação
  const [tasks, setTasks] = useState([
    { id: 1, title: "Organizar a mesa do escritório", completed: false, author: "Davi", completedBy: null },
    { id: 2, title: "Responder cliente", completed: true, author: "Davi", completedBy: "Davi" },
    { id: 3, title: "Enviar relatório mensal", completed: false, author: "Davi", completedBy: null }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filtro, setFiltro] = useState("todas"); // 'todas', 'pendentes', 'concluidas'
  const [historico, setHistorico] = useState([
    "Davi concluiu a tarefa: Responder cliente"
  ]);

  // Função de Login Simulado
  function handleLogin(e) {
    e.preventDefault();
    if (nomeInput.trim() === "") return;
    setUsuarioAtual(nomeInput);
    setNomeInput("");
  }

  // Função para Adicionar Tarefa (Registra o autor atual)
  function addTask(e) {
    e.preventDefault();
    if (newTaskTitle.trim() === "") return;

    const novaTarefa = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      author: usuarioAtual,
      completedBy: null
    };

    setTasks((current) => [...current, novaTarefa]);
    setHistorico((current) => [`${usuarioAtual} adicionou a tarefa: "${newTaskTitle}"`, ...current]);
    setNewTaskTitle("");
  }

  // Função para Concluir/Reabrir Tarefa (Registra quem concluiu)
  function toggleTask(taskId) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id === taskId) {
          const novoStatus = !task.completed;
          const responsavelConclusao = novoStatus ? usuarioAtual : null;
          
          // Adiciona ao histórico
          const acao = novoStatus ? "concluiu" : "reabriu";
          setHistorico((h) => [`${usuarioAtual} ${acao} a tarefa: "${task.title}"`, ...h]);

          return { ...task, completed: novoStatus, completedBy: responsavelConclusao };
        }
        return task;
      })
    );
  }

  // Função para Excluir Tarefa
  function removeTask(taskId) {
    const tarefaParaRemover = tasks.find(t => t.id === taskId);
    setTasks((current) => current.filter((task) => task.id !== taskId));
    if (tarefaParaRemover) {
      setHistorico((h) => [`${usuarioAtual} excluiu a tarefa: "${tarefaParaRemover.title}"`, ...h]);
    }
  }

  // Filtragem de Tarefas
  const tarefasFiltradas = tasks.filter((task) => {
    if (filtro === "pendentes") return !task.completed;
    if (filtro === "concluidas") return task.completed;
    return true; // 'todas'
  });

  const pendingCount = tasks.filter((task) => !task.completed).length;

  if (!usuarioAtual) {
    return (
      <main className="login-container">
        <header>
          <h1>ToDo Pro - Acesso</h1>
          <p>Identifique-se para acessar o painel de tarefas da empresa.</p>
        </header>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Digite seu nome" 
            value={nomeInput}
            onChange={(e) => setNomeInput(e.target.value)}
          />
          <button type="submit">Entrar no Sistema</button>
        </form>
      </main>
    );
  }

  return (
    <main>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>ToDo Pro</h1>
          <p>Bem-vindo(a), <strong>{usuarioAtual}</strong>!</p>
        </div>
        <button 
          onClick={() => setUsuarioAtual("")} 
          style={{ backgroundColor: "#95a5a6", padding: "5px 10px", fontSize: "11px" }}
        >
          Sair / Trocar Usuário
        </button>
      </header>

      {/* Seção de Filtros */}
      <section style={{ margin: "15px 0", display: "flex", gap: "8px" }}>
        <button 
          onClick={() => setFiltro("todas")} 
          style={{ backgroundColor: filtro === "todas" ? "#2980b9" : "#bdc3c7" }}
        >
          Todas ({tasks.length})
        </button>
        <button 
          onClick={() => setFiltro("pendentes")} 
          style={{ backgroundColor: filtro === "pendentes" ? "#2980b9" : "#bdc3c7" }}
        >
          Pendentes ({pendingCount})
        </button>
        <button 
          onClick={() => setFiltro("concluidas")} 
          style={{ backgroundColor: filtro === "concluidas" ? "#2980b9" : "#bdc3c7" }}
        >
          Concluídas ({tasks.length - pendingCount})
        </button>
      </section>

      <section>
        <h2>Gerenciamento de Tarefas</h2>
        
        <ul>
          {tarefasFiltradas.length === 0 ? (
            <p style={{ color: "#7f8c8d", fontStyle: "italic" }}>Nenhuma tarefa encontrada nesta categoria.</p>
          ) : (
            tarefasFiltradas.map((task) => (
              <li key={task.id} className={task.completed ? "concluida" : "pendente"}>
                <div>
                  <span>{task.title}</span>
                  <div style={{ fontSize: "11px", color: "#7f8c8d", marginTop: "4px" }}>
                    <span>Criada por: <strong>{task.author}</strong></span>
                    {task.completed && task.completedBy && (
                      <span style={{ marginLeft: "10px" }}>| Concluída por: <strong>{task.completedBy}</strong></span>
                    )}
                  </div>
                </div>
                
                <div className="acoes-tarefa" style={{ display: "flex", gap: "5px" }}>
                  <button type="button" onClick={() => toggleTask(task.id)}>
                    {task.completed ? "Reabrir" : "Concluir"}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => removeTask(task.id)}
                    style={{ backgroundColor: "#e74c3c" }}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Formulário para Nova Tarefa */}
        <form onSubmit={addTask}>
          <input 
            type="text" 
            placeholder="O que precisa ser feito?" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button type="submit">Adicionar</button>
        </form>
      </section>

      {/* Seção de Histórico de Atividades */}
      <section style={{ marginTop: "30px", borderTop: "1px solid #ecf0f1", paddingTop: "15px" }}>
        <h3 style={{ fontSize: "15px", color: "#005ebd" }}>Histórico de Atividades Recentes</h3>
        <ul style={{ maxHeight: "120px", overflowY: "auto", background: "#005ebd", padding: "10px", borderRadius: "4px" }}>
          {historico.map((item, index) => (
            <li key={index} style={{ fontSize: "12px", border: "none", padding: "4px 0", background: "transparent" }}>
              • {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;