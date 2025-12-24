import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import {
  AdicionarProdutoCategoriaRequest,
  AtualizarCategoriaRequest,
  CategoriaResponse,
  CriarCategoriaRequest,
  FiltroCategoriaRequest,
  ListarCategoriaResponse,
  RemoverProdutoCategoriaRequest
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private _httpRequest = inject(HttpRequestService);
  private readonly baseUrl = '/Categoria'; // Rota base do Controller

  obterPorId(id: number): Observable<CategoriaResponse> {
    return this._httpRequest.get<CategoriaResponse>(`${this.baseUrl}/obter-por-id`, { id });
  }

  listar(filtro: FiltroCategoriaRequest): Observable<ListarCategoriaResponse> {
    const payload = this.limparPayload(filtro);
    return this._httpRequest.post<ListarCategoriaResponse>(`${this.baseUrl}/listar`, payload);
  }

  criar(request: CriarCategoriaRequest): Observable<CategoriaResponse> {
    return this._httpRequest.post<CategoriaResponse>(`${this.baseUrl}/criar`, request);
  }

  atualizar(request: AtualizarCategoriaRequest): Observable<CategoriaResponse> {
    return this._httpRequest.put<CategoriaResponse>(`${this.baseUrl}/atualizar`, request);
  }

  excluir(id: number): Observable<boolean> {
    return this._httpRequest.delete<boolean>(`${this.baseUrl}/excluir`, { params: { id } });
  }

  adicionarProduto(request: AdicionarProdutoCategoriaRequest): Observable<boolean> {
    return this._httpRequest.post<boolean>(`${this.baseUrl}/adicionar-produto`, request);
  }

  removerProduto(request: RemoverProdutoCategoriaRequest): Observable<boolean> {
    return this._httpRequest.post<boolean>(`${this.baseUrl}/remover-produto`, request);
  }

  private limparPayload(filtro: any): any {
    const payload = filtro || {};
    Object.keys(payload).forEach((key) => {
      if (payload[key] === '' || payload[key] === undefined) {
        payload[key] = null;
      }
    });
    return payload;
  }
}