import { HasOne, Model, Column, DataType, Table } from 'sequelize-typescript';
import { ManyToOne } from 'typeorm';
import { Colaborador } from './colaborador.model';
import { Categoria } from './categoria.model';

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

  @HasOne(() => Colaborador)
  colaborador: Colaborador;

  @ManyToOne(() => Categoria)
  categoria: Categoria;
}
