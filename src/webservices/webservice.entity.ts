import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '1', description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Google', description: 'Name' })
  @Column('varchar')
  name: string;

  @ApiProperty({ example: 'https://www.google.com', description: 'URL' })
  @Column('varchar')
  url: string;

  @ApiProperty({
    example: '400',
    description: 'Maximum allowable latency value in ms',
  })
  @Column('int')
  latency: number;

  @ApiProperty({ example: 'true', description: 'Current status' })
  @Column('boolean', { default: false })
  isAvailable: boolean;
  @ApiProperty({
    example: '2022-01-01 23:50:00',
    description: 'Last time become unavailable',
  })
  @Column('varchar', { default: null })
  unavailableFrom: string;

  @ApiProperty({
    example: '2022-01-02 01:15:00',
    description: 'Last time become available',
  })
  @Column('varchar', { default: null })
  unavailableTo: string;

  @ManyToMany(() => User, (user) => user.webservices)
  users: User[];
}
