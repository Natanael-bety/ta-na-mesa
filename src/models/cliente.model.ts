import { Model, Table, Column, DataType } from 'sequelize-typescript';
@Table({ modelName: 'clientes' })
export class Cliente extends Model<Cliente> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, defaultValue: '' })
  nome: string;
}
