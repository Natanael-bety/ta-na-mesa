import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
  HasMany,
  Sequelize,
  DeletedAt,
  HasOne,
} from 'sequelize-typescript';
import { MESA_STATUS } from 'src/constants/mesa';
import { Estabelecimento } from './estabelecimento.model';
import { Conta } from './conta.model';
import { Usuario } from './usuario.model';
import { Chamada } from './chamada.model';
import { timeStamp } from 'console';
import { Pedido } from './pedido.model';

@Table({ modelName: 'Mesas' })
export class Mesa extends Model<Mesa> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  numero: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  chamarGarcom: boolean;

  @Column({
    type: DataType.ENUM,
    values: Object.values(MESA_STATUS),
    defaultValue: MESA_STATUS.LIVRE,
  })
  status: MESA_STATUS;

  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @ForeignKey(() => Estabelecimento)
  @Column({ type: DataType.UUID })
  estabelecimentoId: string;

  @BelongsTo(() => Estabelecimento)
  estabelecimento: Estabelecimento;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID, allowNull: true })
  usuarioId: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @HasMany(() => Conta)
  contas: Conta[];

  @HasMany(() => Chamada)
  chamadas: Chamada[];

  @HasMany(() => Pedido)
  pedidos: Pedido[];

  @DeletedAt
  deletionDate: Date;
}
