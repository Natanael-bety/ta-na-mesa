import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { Conta } from './conta.model';
import { Usuario } from './usuario.model';

@Table
export class ContaCliente extends Model<ContaCliente> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Conta)
  @Column({ type: DataType.UUID })
  contaId: string;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID })
  usuarioId: string;

  @BelongsTo(() => Conta)
  conta: Conta;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
