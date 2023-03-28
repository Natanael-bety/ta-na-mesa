import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { CARGO } from '../constants/colaborador';
import { Usuario } from './usuario.model';
import { Estabelecimento } from './estabelecimento.model';

@Table({ modelName: 'Colaboradores' })
export class Colaborador extends Model<Colaborador> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(CARGO),
    defaultValue: CARGO,
  })
  cargo: CARGO;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID })
  usuarioId: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @ForeignKey(() => Estabelecimento)
  @Column({ type: DataType.UUID })
  estabelecimentoId: string;

  @BelongsTo(() => Estabelecimento)
  estabelecimento: Estabelecimento;
}
