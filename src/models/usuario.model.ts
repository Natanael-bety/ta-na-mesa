import { Model, Table, Column, DataType, HasOne } from 'sequelize-typescript';
import { Colaborador } from './colaborador.model';

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
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha: string;

  @HasOne(() => Colaborador)
  colaborador: Colaborador;
}
