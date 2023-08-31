import { Injectable } from '@nestjs/common';
import { CreatePedidoProdutoDto } from './dto/create-pedido-produto.dto';
import { UpdatePedidoProdutoDto } from './dto/update-pedido-produto.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PedidoProduto } from 'src/models/pedido-produto.model';
import { PedidoService } from '../pedido/pedido.service';
import { ProdutosService } from '../produtos/produto.service';
import { Pedido } from 'src/models/pedido.model';
import { Produto } from 'src/models/produto.model';

@Injectable()
export class PedidoProdutoService {
  constructor(
    @InjectModel(PedidoProduto)
    private readonly pedidoProdutoModel: typeof PedidoProduto,
    private readonly pedidoService: PedidoService,
    private readonly produtoService: ProdutosService,
  ) {}
   async create(
    produtoId: string,
    pedidoId: string,
    createPedidoProdutoDto: CreatePedidoProdutoDto,
  ) {
    const pedido: Pedido = await this.pedidoService.findOne(pedidoId);
    const produto: Produto = await this.produtoService.getById(produtoId);
    try{
      const pedidoProdutoNovo = {...createPedidoProdutoDto};

      const pedidoProdutoCriado = await this.pedidoProdutoModel.create(pedidoProdutoNovo, produtoId: produto.id, pedidoId: pedido.id)
    }
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
