import { Model } from 'sequelize';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Estabelecimento } from './estabelecimento.model';

@Table({ modelName: 'categorias' })
export class Categoria extends Model<Categoria> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, defaultValue: '' })
  name: string;

  @ForeignKey(() => Estabelecimento)
  @Column({ type: DataType.UUID })
  estabelecimentoId: string;
}
