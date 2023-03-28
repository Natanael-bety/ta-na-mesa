import { Injectable } from '@nestjs/common';
import { CreatePedidoProdutoDto } from './dto/create-pedido-produto.dto';
import { UpdatePedidoProdutoDto } from './dto/update-pedido-produto.dto';

@Injectable()
export class PedidoProdutoService {
  create(createPedidoProdutoDto: CreatePedidoProdutoDto) {
    return 'This action adds a new pedidoProduto';
  }

  findAll() {
    return `This action returns all pedidoProduto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedidoProduto`;
  }

  update(id: number, updatePedidoProdutoDto: UpdatePedidoProdutoDto) {
    return `This action updates a #${id} pedidoProduto`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidoProduto`;
  }
}
