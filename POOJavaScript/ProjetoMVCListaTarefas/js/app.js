//adicionar os imports

import {TarefaController} from "./controller/TarefaController.js";
import {TarefaModel} from "./model/TarefaModel.js";
import {TarefaView} from "./view/TarefaView.js";

const model = new TarefaModel();
const view = new TarefaView();
const controller = new TarefaController(model, view);

controller.init(); //inicia o sistema