//criando elementos para a página index

//clonando Elemento com DOM
let card = document.createElement("div");
card.classList.add("card"); //adiciona a classe card ao meu div = div.card <div class="card">

//criar um container para adicionar os cards
let container = document.createElement("div");
container.classList.add("container"); //adiciona a class container ao div

//criar um botão para clonar elementos 
let btnClonar = document.createElement("button");
btnClonar.innerText = "Clonar"; //adiciona texto ao botão
btnClonar.id = "btnClonar"; //adiciona um id ao botão

//adicionar elemento a página
document.body.appendChild(btnClonar);
document.body.appendChild(container); //add container ao ody
container.appendChild(card); //add card ao container

//adicionar um evento ao botão
btnClonar.addEventListener("click", ()=>{
    let clonar = card.cloneNode(true); //clonar o obj Card
    container.appendChild(clonar); //add clone ao container
})

//criar uma chave para darkmode
let chave = document.createElement("input");
chave.type = "checkbox"; //muda o tipo do input
chave.id = "darkMode";
document.body.appendChild(chave); //add chave ao body

//criar o evento para modo Claro e modo Escuro
chave.addEventListener("change", ()=>{
    //adicionando ou removendo a classe darkMode ao Body
    document.body.classList.toggle("darkMode");
})