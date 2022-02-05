import { Webservice } from 'src/webservices/webservice.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { unique: true })
  telegram_id: number;

  @Column('varchar', { default: null, unique: true })
  mail: string;

  @ManyToMany(() => Webservice, (webservice) => webservice.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'webserviceId' },
  })
  webservices: Webservice[];
}
