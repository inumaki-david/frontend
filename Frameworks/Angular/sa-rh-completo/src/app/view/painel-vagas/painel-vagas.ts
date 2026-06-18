import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../service/api';
import { Vaga } from '../../model/vaga.model';

@Component({
  standalone: true,
  selector: 'app-painel-vagas',
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-vagas.html',
  styleUrls: ['./painel-vagas.scss'],
})
export class PainelVagas implements OnInit {
  public vagas: Vaga[] = [];
  public vaga: Vaga = new Vaga(0, '', '', '', 0);

  constructor(private _apiService: Api) {}

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas(): void {
    this._apiService.getVagas().subscribe((resposta) => {
      this.vagas = resposta.map((e) => new Vaga(e.id, e.nome, e.foto, e.descricao, e.salario));
    });
  }

  listarVagaUnica(vaga: Vaga) {
    this.vaga = vaga;
  }

  cadastrarVaga(): void {
    if (!this.vaga.nome || !this.vaga.descricao || !this.vaga.foto || this.vaga.salario <= 0) {
      alert('Preencha todos os campos para cadastrar a vaga');
      return;
    }

    this._apiService.cadastrarVaga(this.vaga).subscribe(() => {
      this.vaga = new Vaga(0, '', '', '', 0);
      this.listarVagas();
      alert('Vaga cadastrada com sucesso');
    });
  }

  atualizarVaga(id: number | string): void {
    this._apiService.atualizarVaga(id, this.vaga).subscribe(() => {
      this.vaga = new Vaga(0, '', '', '', 0);
      this.listarVagas();
      alert('Vaga atualizada com sucesso');
    });
  }

  excluirVaga(id: number | string): void {
    this._apiService.removerVaga(id).subscribe(() => {
      this.vaga = new Vaga(0, '', '', '', 0);
      this.listarVagas();
      alert('Vaga excluída com sucesso');
    });
  }
}
