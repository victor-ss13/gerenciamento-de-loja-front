import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import {
  AtualizarClienteRequest,
  ClienteResponse,
  CriarClienteRequest,
  FiltroClienteRequest,
  ListarClienteResponse,
  PedidoResumoClienteResponse
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private _httpRequest = inject(HttpRequestService);
  private readonly baseUrl = '/Cliente';

  obterPorId(id: number): Observable<ClienteResponse> {
    return this._httpRequest.get<ClienteResponse>(`${this.baseUrl}/obter-por-id`, { id });
  }

  listar(filtro: FiltroClienteRequest): Observable<ListarClienteResponse> {
    const payload = this.limparPayload(filtro);
    return this._httpRequest.post<ListarClienteResponse>(`${this.baseUrl}/listar`, payload);
  }

  criar(request: CriarClienteRequest): Observable<ClienteResponse> {
    return this._httpRequest.post<ClienteResponse>(`${this.baseUrl}/criar`, request);
  }

  atualizar(request: AtualizarClienteRequest): Observable<ClienteResponse> {
    return this._httpRequest.put<ClienteResponse>(`${this.baseUrl}/atualizar`, request);
  }

  excluir(id: number): Observable<boolean> {
    return this._httpRequest.delete<boolean>(`${this.baseUrl}/excluir`, { params: { id } });
  }

  obterPedidosDoCliente(idCliente: number): Observable<PedidoResumoClienteResponse[]> {
    return this._httpRequest.get<PedidoResumoClienteResponse[]>(`${this.baseUrl}/obter-pedidos`, { idCliente });
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