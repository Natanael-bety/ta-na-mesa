export interface CreateImagemDto {
  url: string;
  publicId: string;
  version: number;
  produtoId?: string;
  estabelecimentoId?: string;
}
