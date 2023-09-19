import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  DeletedAt,
} from 'sequelize-typescript';
import { Mesa } from './mesa.model';
import { Pedido } from './pedido.model';
import { ContaCliente } from './conta-cliente.model';

@Table({ modelName: 'Contas' })
export class Conta extends Model<Conta> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  valorTotal: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  aberta: boolean;

  @ForeignKey(() => Mesa)
  @Column({ type: DataType.UUID })
  mesaId: string;

  @BelongsTo(() => Mesa)
  mesa: Mesa;

  @HasMany(() => ContaCliente)
  contaClientes: ContaCliente[];

  @HasMany(() => Pedido)
  pedidos: Pedido[];

  @DeletedAt
  deletionDate: Date;
}
