import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaga } from '../model/vaga.model';

@Injectable({
  providedIn: 'root',
})
export class Api {
  //atributo
  //endereço de conexão da api
  private apiUrl = 'http://localhost:3007/vagas'; //caminho da API

  constructor(private http: HttpClient) {}

  //métodos de Conexão da API (GET, POST, PUT, DELETE)

  //get - read
  getVagas(): Observable<Vaga[]> {
    //Observable => permite conexões assincronas com a API
    return this.http.get<Vaga[]>(this.apiUrl); // conecta na api e retorna o conteúdo no vetor de Vagas
  }

  //post - create
  cadastrarVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.apiUrl, vaga);
  }

  atualizarVaga(id: any, vaga: Vaga): Observable<Vaga> {
    const UrlAtualizado = `${this.apiUrl}/${id}`;
    return this.http.put<Vaga>(UrlAtualizado, vaga);
  }

  removerVaga(id: any): Observable<void> {
    const urlDeletar = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(urlDeletar);
  }
}
