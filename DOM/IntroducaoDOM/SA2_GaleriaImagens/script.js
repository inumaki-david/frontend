//galeria de imagens Dinâmicas com DOM

let uploadInput = document.getElementById("upload");
let btnAdd = document.getElementById("addImagem");
let galeria = document.querySelector(".galeria");
let carrossel = document.querySelector(".carrossel");

//vetor para as imagens
let imagens = []; //array-vetor

//adicionar imagens no vetor

btnAdd.addEventListener("click", ()=>{
    let imagemURL = uploadInput.value.trim(); //pega o endereço da imagens no input
    if(imagemURL ==="") return; // se a condição for verdadeira interrompe o código
    //parte de baixo do código continua se a condição acima for falsa
    imagens.push(imagemURL);
    atualizarGaleria(); //atualiza a imagem na galeria
    atualizarCarrossel();//ataualiza a imagem no carrossel
    uploadInput.value = "";//limpa o campo do input
});

//atualizar Galeria de Imagens
function atualizarGaleria(){
    galeria.innerHTML = ""; //limpar a galeria de imagens
    //adicionar todas aas imagens na galeria
    imagens.forEach(//percorrer
        (imagem, index)=>{
            let div = document.createElement("div"); //criando uma div
            div.classList.add("imagemContainer");
            let img = document.createElement("img");//criando uma img
            img.src = imagem; //add url da imagem
            let btnRemove = document.createElement("button");//criando um btn
            btnRemove.innerText = "X";//add X no botão
            btnRemove.classList.add("remove");
            //adicionar um evento para o btnRemove
            btnRemove.addEventListener("click", ()=>{
                imagens.splice(index,1); //remove a imagem do vetor
                atualizarGaleria(); //recursão
                atualizarCarrossel();
            });
            //appendChild
            div.appendChild(img);//img a div
            div.appendChild(btnRemove); // btn a div
            galeria.appendChild(div); // div a galeria
        }
    );
}

//função para atualizar as imagens no carrossel

let intervalo; // Variável para controlar o timer

function atualizarCarrossel() {
    carrossel.innerHTML = "";
    
    imagens.forEach(imagem => {
        let img = document.createElement("img");
        img.src = imagem;
        // Definimos que cada imagem ocupa exatamente a largura do container pai
        img.style.width = `${100 / imagens.length}%`; 
        carrossel.appendChild(img);
    });

    // Ajusta a largura total da div interna para caber todas as imagens lado a lado
    carrossel.style.width = `${imagens.length * 100}%`;
    carrossel.style.transform = `translateX(0)`; // Reseta a posição ao atualizar
    
    iniciarCarrossel();
}

function iniciarCarrossel() {
    // Limpa o intervalo anterior para não acumular execuções
    clearInterval(intervalo); 
    
    if (imagens.length <= 1) return; // Não precisa rodar se tiver 0 ou 1 imagem

    let index = 0;
    intervalo = setInterval(() => {
        index = (index + 1) % imagens.length;
        // Transição suave de 0.5s
        carrossel.style.transition = "transform 0.5s ease-in-out"; 
        // Move exatamente uma "casa" (100% dividido pelo total de imagens)
        carrossel.style.transform = `translateX(-${index * (100 / imagens.length)}%)`;
    }, 3000); // 3 segundos é um tempo mais confortável para visualização
}



