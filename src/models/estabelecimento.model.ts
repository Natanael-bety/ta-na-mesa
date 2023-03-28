import { HasOne, Model } from 'sequelize-typescript';
import { OneToMany } from 'typeorm';
import { Colaborador } from './colaborador.model';
export class Estabelecimento extends Model<Estabelecimento> {
  @HasOne(() => Colaborador)
  colaborador: Colaborador;
}
