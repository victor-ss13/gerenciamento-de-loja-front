import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import {
  AtualizarItemPedidoRequest,
  CriarItemPedidoRequest,
  FiltroItemPedidoRequest,
  ItemPedidoResponse,
  ListarItemPedidoResponse
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemPedidoService {
  private _httpRequest = inject(HttpRequestService);
  private readonly baseUrl = '/ItemPedido';

  obterPorId(id: number): Observable<ItemPedidoResponse> {
    return this._httpRequest.get<ItemPedidoResponse>(`${this.baseUrl}/obter-por-id`, { id });
  }

  listar(filtro: FiltroItemPedidoRequest): Observable<ListarItemPedidoResponse> {
    const payload = this.limparPayload(filtro);
    return this._httpRequest.post<ListarItemPedidoResponse>(`${this.baseUrl}/listar`, payload);
  }

  criar(request: CriarItemPedidoRequest): Observable<ItemPedidoResponse> {
    return this._httpRequest.post<ItemPedidoResponse>(`${this.baseUrl}/criar`, request);
  }

  atualizar(request: AtualizarItemPedidoRequest): Observable<ItemPedidoResponse> {
    return this._httpRequest.put<ItemPedidoResponse>(`${this.baseUrl}/atualizar`, request);
  }

  // Endpoint específico onde parâmetros vão na Query String, não no corpo
  atualizarQuantidade(idItem: number, novaQuantidade: number): Observable<boolean> {
    return this._httpRequest.put<boolean>(
      `${this.baseUrl}/atualizar-quantidade?idItem=${idItem}&novaQuantidade=${novaQuantidade}`, 
      {}
    );
  }

  excluir(id: number): Observable<boolean> {
    return this._httpRequest.delete<boolean>(`${this.baseUrl}/excluir`, { params: { id } });
  }

  listarPorPedido(idPedido: number): Observable<ItemPedidoResponse[]> {
    return this._httpRequest.get<ItemPedidoResponse[]>(`${this.baseUrl}/listar-por-pedido`, { idPedido });
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