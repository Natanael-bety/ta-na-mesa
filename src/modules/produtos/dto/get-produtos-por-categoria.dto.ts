import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/modules/common/validators/pagination.dto';

export class GetProdutosPorCategoria extends PaginationDto {
  @IsString()
  @IsOptional()
  estabelecimentoId?: string;
}
