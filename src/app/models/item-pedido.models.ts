export interface CriarItemPedidoRequest {
  idPedido: number;
  idProduto: number;
  quantidade: number;
  preco: number;
}

export interface AtualizarItemPedidoRequest {
  idItemPedido: number;
  idPedido: number;
  idProduto: number;
  quantidade: number;
  preco: number;
}

export interface FiltroItemPedidoRequest {
  // Vazio no backend
}

export interface ItemPedidoResponse {
  idItemPedido: number;
  idPedido: number;
  pedido: string;
  idProduto: number;
  produto: string;
  quantidade: number;
  preco: number;
}

export interface ListarItemPedidoResponse {
  lista: ItemPedidoResponse[];
}