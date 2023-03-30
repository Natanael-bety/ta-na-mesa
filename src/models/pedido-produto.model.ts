import { Column, Table, Model, DataType } from 'sequelize-typescript';

@Table({ modelName: 'pedidos-produtos' })
export class PedidoProduto extends Model<PedidoProduto> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.NUMBER, defaultValue: '' })
  quantidade: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  observacao: string;
}
