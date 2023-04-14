import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';
import { Categoria } from './categoria.model';
import { Usuario } from './usuario.model';
import { Mesa } from './mesa.model';
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

  @Column({ type: DataType.STRING, allowNull: false })
  immagem: string;

  @Column({ type: DataType.STRING, defaultValue: '' })
  descricao: string;

  @HasMany(() => Usuario)
  usuarios: Usuario[];

  @HasMany(() => Categoria)
  categorias: Categoria[];

  @HasMany(() => Mesa)
  mesas: Mesa[];
}
