import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Pedido } from './pedido.model';
import { Produto } from './produto.model';

@Table({ modelName: 'pedidos-produtos' })
export class PedidoProduto extends Model<PedidoProduto> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  quantidade: number;

  @Column({ type: DataType.NUMBER, allowNull: true })
  novaQuantidade: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  observacao: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  precoUnitario: number;

  @ForeignKey(() => Pedido)
  @Column({ type: DataType.UUID })
  pedidoId: string;

  @BelongsTo(() => Pedido)
  pedido: Pedido;

  @ForeignKey(() => Produto)
  @Column({ type: DataType.UUID })
  produtoId: string;

  @BelongsTo(() => Produto)
  produto: Produto;
}
