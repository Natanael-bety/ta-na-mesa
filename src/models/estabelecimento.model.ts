import { HasOne, Model, Column, DataType, Table } from 'sequelize-typescript';
import { Categoria } from './categoria.model';
import { Usuario } from './usuario.model';

@Table
export class Estabelecimento extends Model<Estabelecimento> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, defaultValue: '' })
  nome: string;

  @HasOne(() => Usuario)
  Usuario: Usuario;

  @HasOne(() => Categoria)
  categoria: Categoria;
}
