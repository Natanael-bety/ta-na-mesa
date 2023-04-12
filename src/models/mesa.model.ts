import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { STATUS } from 'src/constants/mesa';
import { Estabelecimento } from './estabelecimento.model';
import { Conta } from './conta.model';
import { Usuario } from './usuario.model';

@Table({ modelName: 'Mesas' })
export class Mesa extends Model<Mesa> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  numero: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: '' })
  chamarGarcom: boolean;

  @Column({
    type: DataType.ENUM,
    values: Object.values(STATUS),
    defaultValue: STATUS.LIVRE,
    allowNull: false,
  })
  status: STATUS;

  @ForeignKey(() => Estabelecimento)
  @Column({ type: DataType.UUID })
  estabelecimentoId: string;

  @BelongsTo(() => Estabelecimento)
  estabelecimento: Estabelecimento;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID })
  colaboradorId: string;

  @BelongsTo(() => Usuario)
  Usuario: Usuario;

  @HasOne(() => Conta)
  Conta: Conta;
}
