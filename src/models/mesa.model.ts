import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { STATUS } from 'src/constants/pedido';
import { Estabelecimento } from './estabelecimento.model';
import { Colaborador } from './colaborador.model';
import { HasOne } from 'sequelize-typescript';
import { Conta } from './conta.model';

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

  @ForeignKey(() => Colaborador)
  @Column({ type: DataType.UUID })
  colaboradorId: string;

  @BelongsTo(() => Colaborador)
  colaborador: Colaborador;

  @HasOne(() => Conta)
  Conta: Conta;
}
