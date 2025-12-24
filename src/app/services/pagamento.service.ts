import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import {
  AtualizarPagamentoRequest,
  CriarPagamentoRequest,
  FiltroPagamentoRequest,
  ListarPagamentoResponse,
  PagamentoResponse
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private _httpRequest = inject(HttpRequestService);
  private readonly baseUrl = '/Pagamento';

  obterPorId(id: number): Observable<PagamentoResponse> {
    return this._httpRequest.get<PagamentoResponse>(`${this.baseUrl}/obter-por-id`, { id });
  }

  listar(filtro: FiltroPagamentoRequest): Observable<ListarPagamentoResponse> {
    const payload = this.limparPayload(filtro);
    return this._httpRequest.post<ListarPagamentoResponse>(`${this.baseUrl}/listar`, payload);
  }

  criar(request: CriarPagamentoRequest): Observable<PagamentoResponse> {
    return this._httpRequest.post<PagamentoResponse>(`${this.baseUrl}/criar`, request);
  }

  atualizar(request: AtualizarPagamentoRequest): Observable<PagamentoResponse> {
    return this._httpRequest.put<PagamentoResponse>(`${this.baseUrl}/atualizar`, request);
  }

  excluir(id: number): Observable<boolean> {
    return this._httpRequest.delete<boolean>(`${this.baseUrl}/excluir`, { params: { id } });
  }

  listarPorPedido(idPedido: number): Observable<PagamentoResponse[]> {
    return this._httpRequest.get<PagamentoResponse[]>(`${this.baseUrl}/listar-por-pedido`, { idPedido });
  }

  obterTotalPagoPorPedido(idPedido: number): Observable<number> {
    return this._httpRequest.get<number>(`${this.baseUrl}/obter-total-pago`, { idPedido });
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