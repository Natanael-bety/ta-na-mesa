import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Mesa } from './mesa.model';
import { Usuario } from './usuario.model';
import { Pedido } from './pedido.model';

@Table({ modelName: 'Contas' })
export class Conta extends Model<Conta> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  valorTotal: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: '' })
  aberto: boolean;

  @ForeignKey(() => Mesa)
  @Column({ type: DataType.UUID })
  mesaId: string;

  @BelongsTo(() => Mesa)
  Mesa: Mesa;

  @HasOne(() => Usuario)
  Usuario: Usuario;

  @HasOne(() => Pedido)
  Pedido: Pedido;
}
