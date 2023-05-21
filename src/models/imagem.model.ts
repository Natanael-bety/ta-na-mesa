import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { Estabelecimento } from './estabelecimento.model';
import { Produto } from './produto.model';

@Table({ modelName: 'Imagens' })
export class Imagem extends Model<Imagem> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  publicId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  version: number;

  @ForeignKey(() => Estabelecimento)
  @Column({ type: DataType.UUID })
  estabelecimentoId: string;

  @BelongsTo(() => Estabelecimento)
  estabelecimento: Estabelecimento;

  @ForeignKey(() => Produto)
  @Column({ type: DataType.UUID })
  produtoId: string;

  @BelongsTo(() => Produto)
  produto: Produto;
}
