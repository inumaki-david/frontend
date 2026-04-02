// Estudo de DOM Avançado
// Adicionar elementos com DOM em Páginas HTML

//contruir um header com DOM
let header = document.createElement("header"); //criação de uma tag <header>

//estilização do header
header.style.backgroundColor = "#1E90FF";
header.style.height = "8vh";

//adicionar o header como elemento filho do body
document.body.appendChild(header);
document.body.style.margin = "0"; //retira a margem padrão do body

//adicionar elementos ao header
let divNav = document.createElement("div");

//configurando o display da div
divNav.style.display = "flex";
divNav.style.justifyContent = "space-around";
divNav.style.color = "aliceblue";
divNav.style.height = "100%";
divNav.style.alignItems = "center";
divNav.style.fontSize = "5vh";
divNav.style.fontFamily = "montserrat";

//adicionar a div ao header
header.appendChild(divNav);

//adicionar itens a nav
let itensNav = ["Index", "Produtos", "Contato"];

//percorrer o vetor
itensNav.forEach((e) => {
  let item = document.createElement("a");
  item.innerHTML = e;
  item.href = e.toLowerCase() + ".html"; //cria o link de navegação
  item.style.textDecoration = "none";
  item.style.color = "inherit";
  divNav.appendChild(item); //adiciona o item a divNav
});

// //criar o elemento footer
// let footer = document.createElement("footer");

// //configurando o footer
// footer.style.backgroundColor = "#333"; // Um cinza escuro
// footer.style.color = "white";
// footer.style.height = "6vh";
// footer.style.display = "flex";
// footer.style.justifyContent = "center";
// footer.style.alignItems = "center";
// footer.style.fontFamily = "montserrat, sans-serif";
// footer.style.position = "fixed"; // Mantém o footer no fundo da página
// footer.style.bottom = "0";
// footer.style.width = "100%";

// //adicionar conteúdo ao footer
// let textoFooter = document.createElement("p");
// textoFooter.textContent = "© 2026 - Todos os direitos reservados";
// textoFooter.style.margin = "0";
// textoFooter.style.fontSize = "2vh";

// //montar a estrutura
// footer.appendChild(textoFooter); // Coloca o texto dentro do footer
// document.body.appendChild(footer); // Coloca o footer no final do corpo da página

//footer
let footer = document.createElement("footer");
footer.style.backgroundColor = "#1E90FF";
footer.style.height = "5vh";
footer.style.width = "100%";
footer.style.position = "fixed";
footer.style.bottom = "0";
let paragrafoFooter = document.createElement("p");
paragrafoFooter.innerHTML = "Copyright &copy; 2026 - Todos os direitos reservados.";
paragrafoFooter.style.color = "aliceblue";
paragrafoFooter.style.textAlign = "center";
paragrafoFooter.style.lineHeight = "5vh";
footer.appendChild(paragrafoFooter);
document.body.appendChild(footer);