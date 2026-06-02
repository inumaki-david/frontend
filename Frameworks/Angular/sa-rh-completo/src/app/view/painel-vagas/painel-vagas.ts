import { Component } from '@angular/core';
import { Vaga } from '../../model/vaga.model';
import { Api } from '../../service/api';

@Component({
  selector: 'app-painel-vagas',
  imports: [],
  templateUrl: './painel-vagas.html',
  styleUrl: './painel-vagas.scss',
})
export class PainelVagas {
  //terminar de fazer o crud

  public vaga: Vaga = new Vaga(0, '', '', '', 0); //interpolação de dados do formulário
  //limpar dados do formulário

  public vagas: Vaga[] = [];
  //armazenar as informações da API

  constructor(private _apiService: Api) {} //estabelece a conexão quando abrir a página

  ngOnInit(): void {
    this.listarVagas();
  }

  // método para Listar as Vagas (Controller)
  listarVagas(): void {
    this._apiService.getVagas().subscribe((retornaVagas) => {
      this.vagas = retornaVagas.map((e) => {
        return new Vaga(e.id, e.nome, e.foto, e.descricao, e.salario);
      }); // armazena o conteúdo retornado da API no vetor de vagas
    });
  }

  //cadastrar vaga
  cadastrarVaga(): void {
    this._apiService.cadastrarVaga(this.vaga).subscribe(
      () => {
        this.vaga = new Vaga (0, "", "", "", 0);
        this.listarVagaUnica(); //atualizar a vaga com as informações do formulário
        alert("Vaga cadastrada com sucesso.");
      } (erro) => {console.error("Exception: ", erro)}
    );
  }

  listarVagaUnica(vaga: Vaga) {
    this.vaga = vaga;
  }

}
