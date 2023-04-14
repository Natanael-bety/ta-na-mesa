import {
  Model,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Categoria } from './categoria.model';
import { PedidoProduto } from './pedido-produto.model';

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

  @Column({ type: DataType.STRING, allowNull: true })
  imagem: string;

  @Column({ type: DataType.NUMBER, defaultValue: 0 })
  estoque: number;

  @Column({ type: DataType.NUMBER, allowNull: true })
  preco: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  descricao: string;

  @ForeignKey(() => Categoria)
  @Column({ type: DataType.UUID })
  categoriaId: string;

  @BelongsTo(() => Categoria)
  categoria: Categoria;

  @HasMany(() => PedidoProduto)
  pedidoProdutos: PedidoProduto;
}
