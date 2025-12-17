export interface CriarCategoriaRequest {
  nome: string;
}

export interface AtualizarCategoriaRequest {
  idCategoria: number;
  nome: string;
}

export interface FiltroCategoriaRequest {
  idCategoria?: number;
  nome?: string;
  situacao?: string;
  apenasCategoriasSemProdutos?: boolean;
}

export interface AdicionarProdutoCategoriaRequest {
  idCategoria: number;
  idProduto: number;
}

export interface RemoverProdutoCategoriaRequest {
  idCategoria: number;
  idProduto: number;
}

export interface ProdutoResumoResponse {
  idProduto: number;
  nome: string;
  preco: number;
  estoque: number;
}

export interface CategoriaResponse {
  idCategoria: number;
  nome: string;
  situacao: string;
  quantidadeProdutos: number;
  produtos: ProdutoResumoResponse[];
}

export interface ListarCategoriaResponse {
  lista: CategoriaResponse[];
}