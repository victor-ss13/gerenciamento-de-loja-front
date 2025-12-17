export interface CriarPagamentoRequest {
  idPedido: number;
  valor: number;
  metodo: string;
}

export interface AtualizarPagamentoRequest {
  idPagamento: number;
  idPedido: number;
  valor: number;
  metodo: string;
}

export interface FiltroPagamentoRequest {
  idPagamento?: number;
  idPedido?: number;
  valorMinimo?: number;
  valorMaximo?: number;
  dataPagamentoInicio?: string; // ISO 8601 format
  dataPagamentoFim?: string; // ISO 8601 format
  metodo?: string;
}

export interface PagamentoResponse {
  idPagamento: number;
  idPedido: number;
  pedido: string;
  valor: number;
  dataPagamento: string; // ISO 8601 format
  metodo: string;
  situacao: string;
}

export interface ListarPagamentoResponse {
  lista: PagamentoResponse[];
}