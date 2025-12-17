export interface CriarClienteRequest {
  nome: string;
  email?: string;
  telefone?: string;
}

export interface AtualizarClienteRequest {
  idCliente: number;
  nome: string;
  email?: string;
  telefone?: string;
}

export interface FiltroClienteRequest {
  idCliente?: number;
  nome?: string;
  apenasComPedidos?: boolean;
  apenasSemPedidos?: boolean;
}

export interface PedidoResumoClienteResponse {
  idPedido: number;
  data: string; // ISO 8601 format
  valorTotal: number;
  estaQuitado: boolean;
  situacao: string;
}

export interface ClienteResponse {
  idCliente: number;
  nome: string;
  email?: string;
  telefone?: string;
  situacao: string;
  quantidadePedidos: number;
  valorTotalPedidos: number;
  pedidos: PedidoResumoClienteResponse[];
}

export interface ListarClienteResponse {
  lista: ClienteResponse[];
}