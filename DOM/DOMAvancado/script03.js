//criação de um formulário de contato com validação de campos do formulário

let form = document.createElement("form"); //criação de um formulário html
form.id = "formContato";
let container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);
container.appendChild(form);
container.style.flexDirection = "row-reverse";
//adicionar elementos ao formulário
let inputName = document.createElement("input");
inputName.type = "text";
inputName.placeholder = "Digite seu nome..."
inputName.id = "nome"
form.appendChild(inputName);
let inputEmail = document.createElement("input");
inputEmail.type = "email";
inputEmail.placeholder = "Digite seu email..."
inputEmail.id = "email"
form.appendChild(inputEmail);
let inputMsg = document.createElement("textarea");
inputMsg.id = "info"
inputMsg.placeholder = "Digite sua Mensagem";
form.appendChild(inputMsg);
//criar um botão enviar
let btnEnviar = document.createElement("button");
btnEnviar.type = "submit";
btnEnviar.innerText = "Enviar"
form.appendChild(btnEnviar);
//adicionar um "p" mostrar mensagem de validação do form
let p = document.createElement("p");
p.id = "mensagem";
document.body.appendChild(p);

//evento de validação do formulário
document.getElementById("formContato").addEventListener("submit", (e)=>{
    e.preventDefault();//evita o recarregamento da página
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let info = document.getElementById("info").value;
    let mensagem = document.getElementById("mensagem");

    //condição
    if(nome==="" || email==="" || info===""){
        mensagem.innerText = "Preencha Todos os Campos";
        mensagem.style.color = "red"
    }else{
        mensagem.innerText = "Contato Enviado com Sucesso"
        mensagem.style.color = "green";
        //limpar todos os campos
        inputName.value = "";
        inputEmail.value = "";
        inputMsg.value = "";
    }
});

