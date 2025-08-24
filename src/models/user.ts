import {
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Table
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Index({ unique: true })
  @Column({ unique: true })
  declare email: string;

  @Column
  declare name?: string;

  @Column
  declare password: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.USER,
  })
  declare role: Role;

  toJSON() {
    const values = { ...this.get() };

    delete values.password;
    return values;
  }
}

export default User;
