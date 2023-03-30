import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { STATUS } from '../constants/pedido';

@Table({ modelName: 'pedidos' })
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
    values: Object.values(STATUS),
    defaultValue: STATUS,
  })
  status: string;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  ValorTotal: number;
}
