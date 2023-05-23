import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Mesa } from './mesa.model';
import { Usuario } from './usuario.model';

@Table({ modelName: 'chamadas' })
export class Chamada extends Model<Chamada> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  chamadoMesa: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  chamadoConta: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  chamadoCozinha: boolean;

  @ForeignKey(() => Mesa)
  @Column({ type: DataType.UUID })
  mesaId: string;

  @BelongsTo(() => Mesa)
  mesa: Mesa;

  @ForeignKey(() => Usuario)
  usuario: Usuario;
}
