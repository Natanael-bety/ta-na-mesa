import {
  Model,
  Column,
  DataType,
  Table,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Categoria } from './categoria.model';
import { Usuario } from './usuario.model';
import { Mesa } from './mesa.model';
import { Imagem } from './imagem.model';
@Table
export class Estabelecimento extends Model<Estabelecimento> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type: DataType.STRING, defaultValue: '' })
  descricao: string;

  @HasMany(() => Usuario)
  usuarios: Usuario[];

  @HasOne(() => Imagem)
  imagem: Imagem;

  @HasMany(() => Categoria)
  categorias: Categoria[];

  @HasMany(() => Mesa)
  mesas: Mesa[];
}
