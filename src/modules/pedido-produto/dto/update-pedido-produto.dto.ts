import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoProdutoDto } from './create-pedido-produto.dto';

export class UpdatePedidoProdutoDto extends PartialType(CreatePedidoProdutoDto) {}
