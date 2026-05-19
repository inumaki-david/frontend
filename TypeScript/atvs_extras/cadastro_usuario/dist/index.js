"use strict";
// Criação da função 'renderizarPerfil'
function renderizarPerfil(usuario) {
    if (usuario.isAdmin === true) {
        console.log(`Usuário Administrador: ${usuario.nome} (${usuario.email})`);
    }
    else {
        console.log(`Usuário Comum: ${usuario.nome} (${usuario.email})`);
    }
}
// Cria um objeto 'admin' que segue as regras da interface 'Usuario'
const admin = {
    id: 1,
    nome: "Davi Martins",
    email: "davi.martins@empresa.com",
    isAdmin: true,
};
// Cria um objeto 'comum' que também segue as regras da interface
const comum = {
    id: 2,
    nome: "Bruno Li",
    email: "bruno.li@email.com",
    isAdmin: false,
};
// Chama a função passando os nossos objetos criados
renderizarPerfil(admin);
renderizarPerfil(comum);
