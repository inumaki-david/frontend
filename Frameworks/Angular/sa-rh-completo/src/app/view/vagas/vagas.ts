import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../service/api';
import { Vaga } from '../../model/vaga.model';

@Component({
  standalone: true,
  selector: 'app-vagas',
  imports: [CommonModule],
  templateUrl: './vagas.html',
  styleUrls: ['./vagas.scss'],
})
export class Vagas implements OnInit {
  public vagas: Vaga[] = [];

  constructor(private _apiService: Api) {}

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas(): void {
    this._apiService.getVagas().subscribe((retornaVagas) => {
      this.vagas = retornaVagas.map((e) => new Vaga(e.id, e.nome, e.foto, e.descricao, e.salario));
    });
  }
}
