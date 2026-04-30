import { QuitandaModel } from './model/QuitandaModel.js';
import { QuitandaView } from './view/QuitandaView.js';
import { QuitandaController } from './controller/QuitandaController.js';

// Inicializa a arquitetura MVC instanciando e conectando as camadas
const app = new QuitandaController(new QuitandaModel(), new QuitandaView());

// Gerenciamento dinâmico de Tema (Dark/Light Mode)
const btnTema = document.getElementById('btn-tema');
const body = document.body;

if (btnTema) {
    btnTema.addEventListener('click', () => {
        body.classList.toggle("tema-claro"); // O método toggle inverte o estado da classe automaticamente (adiciona ou remove)
      
        // Adapta o texto do botão para refletir a próxima ação disponível ao usuário
        if (body.classList.contains("tema-claro")) {
            btnTema.textContent = "Mudar para Tema Escuro";
        } else {
            btnTema.textContent = "Mudar para Tema Claro";
        }
    });
}