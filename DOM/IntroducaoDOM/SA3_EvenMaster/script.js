const formulario = document.getElementById("formulario"); //pega o id do furmulario
const lista = document.getElementById("listaConvidados"); //pega o id da lista de convidados
const btnDark = document.getElementById("btnDark"); //pega o id do botão modo escuro
const msgErro = document.getElementById("msgErro"); //pega o id da mensagem de erro

//adiciona o evento modo escuro quando o botão é clicado
btnDark.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

//adiciona o evento de limpar os campos quando ESC é clicado
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    formulario.reset(); //apaga todos os dados digitados nos campos do formulário de uma vez
    msgErro.style.display = "none"; //quando limpar, a mensagem de erro também desapareça da tela
  }
});

//evento de enviar o formulário
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); //impede o recarregamento da página

  //vetor para guardar as informações do formulário
  const dados = {
    nome: document.getElementById("nome").value, //pega o texto digitado no nome
    email: document.getElementById("email").value, //pega o email digitado
    empresa: document.getElementById("empresa").value, //pega a empresa digitado
    cargo: document.getElementById("cargo").value, //pega o cargo digitado
    telefone: document.getElementById("telefone").value, //pega o telefone digitado
  };

  //pega os valores do vetor e verifica se algum está vazio
  if (Object.values(dados).some((valor) => valor === "")) {
    msgErro.style.display = "block"; //se tiver algum valor vazio, exibe a mensagem de erro
    return;
  }
  //continua se não houver valores vazios
  msgErro.style.display = "none"; //esconde a mensagem de erro
  adicionarNaLista(dados); //chama a função para adicionar o convidado na lista
  formulario.reset(); //limpa os campos para cadastrar o próximo
});

//função para criar o card usando DOM
function adicionarNaLista(convidado) {
  const li = document.createElement("li"); //cria um elemento de lista
  li.className = "card-convidado"; //recebe a classe para estilização

  //define e exibe o conteúdo de cada item da lista
  li.innerHTML = `
        <div>
            <strong>${convidado.nome}</strong> (${convidado.cargo}) - ${convidado.empresa} <br>
            <small>${convidado.email} | ${convidado.telefone}</small>
        </div>
        <button class="btn-remover">Remover</button>`;

  //evento de excluir o item da lista quando clicado
  li.querySelector(".btn-remover").addEventListener("click", () => {
    li.remove(); //quando clicado, o próprio elemento <li> se remove da página
  });

  lista.appendChild(li); //pega o <li> pronto e o coloca dentro da nossa lista
}
