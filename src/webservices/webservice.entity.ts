import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('Webservice')
export class Webservice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  url: string;

  @Column('int')
  latency: number;

  @Column('boolean', { default: false })
  isAvailable: boolean;

  @Column('varchar', { default: null })
  unavailableFrom: string;

  @Column('varchar', { default: null })
  unavailableTo: string;

  @ManyToMany(() => User, (user) => user.webservices)
  users: User[];
}
