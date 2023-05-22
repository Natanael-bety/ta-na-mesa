import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
  BeforeDestroy,
} from 'sequelize-typescript';
import { Estabelecimento } from './estabelecimento.model';
import { Produto } from './produto.model';
import { v2 } from 'cloudinary';

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

  @BeforeDestroy
  static async deleteImageAtCdn(instance: Imagem) {
    if (instance.publicId) {
      v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      v2.uploader.destroy(instance.publicId);
    }
  }
}
