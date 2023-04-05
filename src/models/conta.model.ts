import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Cliente } from './cliente.model';
import { Mesa } from './mesa.model';

@Table({ modelName: 'Contas' })
export class Conta extends Model<Conta> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  valorTotal: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: '' })
  aberto: boolean;

  @ForeignKey(() => Mesa)
  @Column({ type: DataType.UUID })
  mesaId: string;

  @BelongsTo(() => Mesa)
  Mesa: Mesa;

  @HasOne(() => Cliente)
  Cliente: Cliente;
}
