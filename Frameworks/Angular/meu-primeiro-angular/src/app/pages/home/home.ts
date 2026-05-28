import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //exemplo de Interpolação (DataBiding)
  //comunicação unidirecional entre TS -> HTML
  //a Interpolação é dada usando {{ elemento }}

  nome: string = 'Davi';

  //Property Binding -> Unidirecional: TS -> HTML
  //manipula propriedade do HTML
  //a Property Binding é usada com [] em volta do elemento
  imgUrl: string = "https://ovicio.com.br/wp-content/uploads/2024/09/20240904-jujutsu-kaisen-satoru-gojo-ovicio.webp";

  botaoDesabilitado: boolean = false;

  //Class e Style Binding
  classeAlerta: string = "alert-success";

}
