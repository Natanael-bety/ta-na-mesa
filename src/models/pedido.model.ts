import {
  Model,
  Table,
  Column,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { SITUACAO } from '../constants/pedido';
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

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  numero: number;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  hPedido: number;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  hPronto: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(SITUACAO),
    defaultValue: SITUACAO.PRONTO,
    allowNull: false,
  })
  status: SITUACAO;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  ValorTotal: number;

  @HasOne(() => PedidoProduto)
  PedidoProduto: PedidoProduto;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID })
  usuarioId: string;

  @BelongsTo(() => Usuario)
  Usuario: Usuario;

  @ForeignKey(() => Conta)
  @Column({ type: DataType.UUID })
  contaId: string;

  @BelongsTo(() => Conta)
  Conta: Conta;
}
