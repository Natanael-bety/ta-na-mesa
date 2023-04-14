import {
  Model,
  Table,
  Column,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { STATUS_PEDIDO } from '../constants/pedido';
import { PedidoProduto } from './pedido-produto.model';
import { Usuario } from './usuario.model';
import { Conta } from './conta.model';

@Table({ modelName: 'Pedidos' })
export class Pedido extends Model<Pedido> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.NUMBER, defaultValue: 1 })
  numero: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(STATUS_PEDIDO),
    defaultValue: STATUS_PEDIDO.PRONTO,
    allowNull: false,
  })
  status: STATUS_PEDIDO;

  @Column({
    type: DataType.NUMBER,
    defaultValue: 0,
  })
  valorTotal: number;

  @Column({ type: DataType.DATE, allowNull: true })
  canceladoEm: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  aceitoEm: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  preparandoEm: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  prontoEm: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  entegueEm: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  alteradoEm: Date;

  @HasMany(() => PedidoProduto)
  pedidoProdutos: PedidoProduto[];

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID })
  usuarioId: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @ForeignKey(() => Conta)
  @Column({ type: DataType.UUID })
  contaId: string;

  @BelongsTo(() => Conta)
  conta: Conta;
}
