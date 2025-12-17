import { ItemPedidoResponse } from './item-pedido.models';
import { PagamentoResponse } from './pagamento.models';

export interface CriarPedidoRequest {
  idCliente: number;
}

export interface AtualizarPedidoRequest {
  idPedido: number;
  idCliente: number;
}

export interface FiltroPedidoRequest {
  idPedido?: number;
  idCliente?: number;
  dataInicio?: string; // ISO 8601 format
  dataFim?: string; // ISO 8601 format
  valorTotalMinimo?: number;
  valorTotalMaximo?: number;
  apenasQuitados?: boolean;
  apenasPendentes?: boolean;
}

export interface AdicionarItemRequest {
  idPedido: number;
  idProduto: number;
  quantidade: number;
  preco: number;
}

export interface AtualizarQuantidadeItemRequest {
  idPedido: number;
  idItemPedido: number;
  novaQuantidade: number;
}

export interface RemoverItemRequest {
  idPedido: number;
  idItemPedido: number;
}

export interface AdicionarPagamentoRequest {
  idPedido: number;
  valor: number;
  metodo: string;
}

export interface PedidoResponse {
  idPedido: number;
  data: string; // ISO 8601 format
  idCliente: number;
  cliente: string;
  situacao: string;
  valorTotal: number;
  valorPago: number;
  valorPendente: number;
  estaQuitado: boolean;
  quantidadeItens: number;
  itens: ItemPedidoResponse[];
  pagamentos: PagamentoResponse[];
}

export interface ListarPedidoResponse {
  lista: PedidoResponse[];
}