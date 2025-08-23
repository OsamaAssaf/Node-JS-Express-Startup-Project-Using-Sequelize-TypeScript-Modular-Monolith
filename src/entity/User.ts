import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index } from 'typeorm';

export enum Role {
  ADMIN,
  USER,
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Index({ unique: true })
  @Column({ unique: true })
  declare email: string;

  @Column()
  declare name?: string;

  @Column()
  declare password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  declare role: Role;

  @Column({ default: new Date() })
  declare createdAt: Date;

  @Column({ default: new Date() })
  declare updatedAt?: Date;
}
