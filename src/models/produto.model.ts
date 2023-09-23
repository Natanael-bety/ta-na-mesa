import {
  Model,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasMany,
  HasOne,
  DeletedAt,
} from 'sequelize-typescript';
import { Categoria } from './categoria.model';
import { PedidoProduto } from './pedido-produto.model';
import { Imagem } from './imagem.model';
import { Estabelecimento } from './estabelecimento.model';

@Table({ modelName: 'Produtos' })
export class Produto extends Model<Produto> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  estoque: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  preco: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  descricao: string;

  @ForeignKey(() => Estabelecimento)
  @Column({ type: DataType.UUID })
  estabelecimentoId: string;

  @BelongsTo(() => Estabelecimento)
  estabelecimento: Estabelecimento;

  @ForeignKey(() => Categoria)
  @Column({ type: DataType.UUID })
  categoriaId: string;

  @BelongsTo(() => Categoria)
  categoria: Categoria;

  @HasMany(() => PedidoProduto)
  pedidoProdutos: PedidoProduto;

  @HasOne(() => Imagem)
  imagem: Imagem;

  @DeletedAt
  deletionDate: Date;
}
