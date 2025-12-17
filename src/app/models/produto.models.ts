export interface CriarProdutoRequest {
  nome: string;
  preco: number;
  estoque: number;
  idCategoria: number;
}

export interface AtualizarProdutoRequest {
  idProduto: number;
  nome: string;
  preco: number;
  estoque: number;
  idCategoria: number;
}

export interface FiltroProdutoRequest {
  idProduto?: number;
  nome?: string;
  idCategoria?: number;
  precoMinimo?: number;
  precoMaximo?: number;
  estoqueMinimo?: number;
  estoqueMaximo?: number;
  apenasComEstoque?: boolean;
  apenasSemEstoque?: boolean;
}

export interface AtualizarPrecoProdutoRequest {
  idProduto: number;
  novoPreco: number;
}

export interface AdicionarEstoqueProdutoRequest {
  idProduto: number;
  quantidade: number;
}

export interface RemoverEstoqueProdutoRequest {
  idProduto: number;
  quantidade: number;
}

export interface AtualizarEstoqueProdutoRequest {
  idProduto: number;
  novoEstoque: number;
}

export interface ProdutoResponse {
  idProduto: number;
  nome: string;
  preco: number;
  estoque: number;
  idCategoria: number;
  categoria: string;
  situacao: string;
  temEstoque: boolean;
}

export interface ListarProdutoResponse {
  lista: ProdutoResponse[];
}