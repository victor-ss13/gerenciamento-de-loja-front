import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import {
  AdicionarItemRequest,
  AdicionarPagamentoRequest,
  AtualizarPedidoRequest,
  AtualizarQuantidadeItemRequest,
  CriarPedidoRequest,
  FiltroPedidoRequest,
  ListarPedidoResponse,
  PedidoResponse,
  RemoverItemRequest
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private _httpRequest = inject(HttpRequestService);
  // O Controller chama-se PedidosController (plural), portanto a rota é /api/Pedidos
  private readonly baseUrl = '/Pedidos'; 

  // --- CRUD Pedido ---
  obterPorId(id: number): Observable<PedidoResponse> {
    return this._httpRequest.get<PedidoResponse>(`${this.baseUrl}/obter-por-id`, { id });
  }

  listar(filtro: FiltroPedidoRequest): Observable<ListarPedidoResponse> {
    const payload = this.limparPayload(filtro);
    return this._httpRequest.post<ListarPedidoResponse>(`${this.baseUrl}/listar`, payload);
  }

  criar(request: CriarPedidoRequest): Observable<PedidoResponse> {
    return this._httpRequest.post<PedidoResponse>(`${this.baseUrl}/criar`, request);
  }

  atualizar(request: AtualizarPedidoRequest): Observable<PedidoResponse> {
    return this._httpRequest.put<PedidoResponse>(`${this.baseUrl}/atualizar`, request);
  }

  excluir(id: number): Observable<boolean> {
    return this._httpRequest.delete<boolean>(`${this.baseUrl}/excluir`, { params: { id } });
  }

  // --- Itens do Pedido ---
  adicionarItem(request: AdicionarItemRequest): Observable<boolean> {
    return this._httpRequest.post<boolean>(`${this.baseUrl}/adicionar-item`, request);
  }

  removerItem(request: RemoverItemRequest): Observable<boolean> {
    return this._httpRequest.post<boolean>(`${this.baseUrl}/remover-item`, request);
  }

  atualizarQuantidadeItem(request: AtualizarQuantidadeItemRequest): Observable<boolean> {
    return this._httpRequest.put<boolean>(`${this.baseUrl}/atualizar-quantidade-item`, request);
  }

  // --- Pagamentos ---
  adicionarPagamento(request: AdicionarPagamentoRequest): Observable<boolean> {
    return this._httpRequest.post<boolean>(`${this.baseUrl}/adicionar-pagamento`, request);
  }

  // --- Consultas ---
  obterValorTotal(idPedido: number): Observable<number> {
    return this._httpRequest.get<number>(`${this.baseUrl}/obter-valor-total`, { idPedido });
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