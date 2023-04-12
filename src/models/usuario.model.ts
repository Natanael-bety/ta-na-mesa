import {
  Model,
  Table,
  Column,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { COLABORADOR } from 'src/constants/colaborador';
import { Conta } from './conta.model';
import { Estabelecimento } from './estabelecimento.model';
import { Mesa } from './mesa.model';
import { Pedido } from './pedido.model';

@Table
export class Usuario extends Model<Usuario> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, defaultValue: '' })
  nome: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
    validate: { isEmail: true },
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  token: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(COLABORADOR),
    defaultValue: COLABORADOR.ADMIN,
    allowNull: false,
  })
  tipo: COLABORADOR;

  @ForeignKey(() => Conta)
  @Column({ type: DataType.UUID })
  contaId: string;

  @BelongsTo(() => Conta)
  Conta: Conta;

  @ForeignKey(() => Estabelecimento)
  @Column({ type: DataType.UUID })
  estabelecimentoId: string;

  @BelongsTo(() => Estabelecimento)
  Estabelecimento: Estabelecimento;

  @HasOne(() => Mesa)
  Mesa: Mesa;

  @HasOne(() => Pedido)
  Pedido: Pedido;
}
