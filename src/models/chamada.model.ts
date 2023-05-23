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
import { CHAMADA } from 'src/constants/chamada';

@Table({ modelName: 'chamadas' })
export class Chamada extends Model<Chamada> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.ENUM, values: Object.values(CHAMADA), defaultValue: CHAMADA.CHAMADA_MESA })
  chamada: CHAMADA;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  chamadoResolvida: boolean;

  @ForeignKey(() => Mesa)
  @Column({ type: DataType.UUID })
  mesaId: string;

  @BelongsTo(() => Mesa)
  mesa: Mesa;

  @ForeignKey(() => Usuario)
  usuario: Usuario;
}
