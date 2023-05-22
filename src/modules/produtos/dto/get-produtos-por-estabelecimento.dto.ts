import { IsString } from 'class-validator';
import { PaginationDto } from 'src/modules/common/validators/pagination.dto';

export class GetProdutosPorEstabelecimento extends PaginationDto {
  @IsString()
  categoriaId?: string;
}
