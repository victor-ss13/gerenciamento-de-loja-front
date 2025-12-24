import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import {
  AdicionarEstoqueProdutoRequest,
  AtualizarEstoqueProdutoRequest,
  AtualizarPrecoProdutoRequest,
  AtualizarProdutoRequest,
  CriarProdutoRequest,
  FiltroProdutoRequest,
  ListarProdutoResponse,
  ProdutoResponse,
  RemoverEstoqueProdutoRequest
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private _httpRequest = inject(HttpRequestService);
  private readonly baseUrl = '/Produto';

  // --- CRUD ---
  obterPorId(id: number): Observable<ProdutoResponse> {
    return this._httpRequest.get<ProdutoResponse>(`${this.baseUrl}/obter-por-id`, { id });
  }

  listar(filtro: FiltroProdutoRequest): Observable<ListarProdutoResponse> {
    const payload = this.limparPayload(filtro);
    return this._httpRequest.post<ListarProdutoResponse>(`${this.baseUrl}/listar`, payload);
  }

  criar(request: CriarProdutoRequest): Observable<ProdutoResponse> {
    return this._httpRequest.post<ProdutoResponse>(`${this.baseUrl}/criar`, request);
  }

  atualizar(request: AtualizarProdutoRequest): Observable<ProdutoResponse> {
    return this._httpRequest.put<ProdutoResponse>(`${this.baseUrl}/atualizar`, request);
  }

  excluir(id: number): Observable<boolean> {
    return this._httpRequest.delete<boolean>(`${this.baseUrl}/excluir`, { params: { id } });
  }

  // --- Gerenciamento de Preço e Estoque ---
  atualizarPreco(request: AtualizarPrecoProdutoRequest): Observable<boolean> {
    return this._httpRequest.put<boolean>(`${this.baseUrl}/atualizar-preco`, request);
  }

  adicionarEstoque(request: AdicionarEstoqueProdutoRequest): Observable<boolean> {
    return this._httpRequest.put<boolean>(`${this.baseUrl}/adicionar-estoque`, request);
  }

  removerEstoque(request: RemoverEstoqueProdutoRequest): Observable<boolean> {
    return this._httpRequest.put<boolean>(`${this.baseUrl}/remover-estoque`, request);
  }

  atualizarEstoque(request: AtualizarEstoqueProdutoRequest): Observable<boolean> {
    return this._httpRequest.put<boolean>(`${this.baseUrl}/atualizar-estoque`, request);
  }

  // --- Consultas ---
  verificarEstoqueDisponivel(idProduto: number, quantidade: number): Observable<boolean> {
    return this._httpRequest.get<boolean>(`${this.baseUrl}/verificar-estoque`, { idProduto, quantidade });
  }

  listarPorCategoria(idCategoria: number): Observable<ProdutoResponse[]> {
    return this._httpRequest.get<ProdutoResponse[]>(`${this.baseUrl}/listar-por-categoria`, { idCategoria });
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