import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Produtos } from './pages/produtos/produtos';
import { Contato } from './pages/contato/contato';

export const routes: Routes = [
  //criar as rotas de navegação
  {path: "home", component: Home},
  {path: "produtos", component: Produtos},
  {path: "contato", component: Contato},
  {path: "", component: Home}
];
