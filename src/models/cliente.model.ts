import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Conta } from './conta.model';
@Table({ modelName: 'Clientes' })
export class Cliente extends Model<Cliente> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, defaultValue: '' })
  nome: string;

  @ForeignKey(() => Conta)
  @Column({ type: DataType.UUID })
  contaId: string;
}
