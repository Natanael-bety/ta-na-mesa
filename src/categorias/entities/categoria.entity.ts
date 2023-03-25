import { Column, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Categorias',
})
export class Categoria {
  @Column
  private id: number;
  private name: string;
}
