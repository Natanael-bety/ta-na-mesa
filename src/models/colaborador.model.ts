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
    defaultValue: CARGO.ADMIN,
  })
  cargo: CARGO;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID })
  usuarioId: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
