import {
  Model,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasOne,
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

  @Column({ type: DataType.STRING, defaultValue: '' })
  nome: string;

  @Column({ type: DataType.STRING, defaultValue: '' })
  imagem: string;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  estoque: number;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  preco: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  descricao: string;

  @ForeignKey(() => Categoria)
  @Column({ type: DataType.UUID })
  categoriaId: string;

  @BelongsTo(() => Categoria)
  Categoria: Categoria;

  @HasOne(() => PedidoProduto)
  PedidoProduto: PedidoProduto;
}
