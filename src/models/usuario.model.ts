import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BeforeSave,
} from 'sequelize-typescript';
import { USUARIO_TIPO } from 'src/constants/usuario';
import { Estabelecimento } from './estabelecimento.model';
import { Mesa } from './mesa.model';
import { Pedido } from './pedido.model';
import { ContaCliente } from './conta-cliente.model';
import { genSalt, hash } from 'bcrypt';

@Table
export class Usuario extends Model<Usuario> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: { isEmail: true },
    unique: true,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  senha?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  token?: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(USUARIO_TIPO),
    defaultValue: USUARIO_TIPO.CLIENTE,
    allowNull: false,
  })
  tipo: USUARIO_TIPO;

  @HasMany(() => ContaCliente)
  contaClientes: ContaCliente[];

  @ForeignKey(() => Estabelecimento)
  @Column({ type: DataType.UUID, allowNull: true })
  estabelecimentoId: string;

  @BelongsTo(() => Estabelecimento)
  estabelecimento: Estabelecimento;

  @HasMany(() => Mesa)
  mesas: Mesa[];

  @HasMany(() => Pedido)
  pedidos: Pedido[];

  @BeforeSave
  static async normalizePassword(instance: Usuario) {
    if (instance.senha) {
      const salt = await genSalt(10, 'a');
      instance.senha = await hash(instance.senha, salt);
    }
  }

  // const isPasswordCorrectly = await compare(password, user.password);
}
