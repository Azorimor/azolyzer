import {
  Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, Column,
  ManyToOne, ManyToMany, JoinTable,
} from 'typeorm';
import {
  Guild,
} from './Guild';
import {
  GuildMember,
} from './GuildMember';

@Entity()
/**
 * Entity for all Channel Type Entitys
 */
export abstract class Channel {
  @PrimaryColumn({
    type: 'bigint',
  })
  id!: string;

  @Column()
  name!: string;

  @Column({
    default: false,
  })
  deleted!: boolean;

  @Column({
    type: 'timestamptz',
  })
  channelCreatedAt!: Date;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @ManyToOne((type) => Guild, (guild: Guild) => guild.channels)
  guild!: Guild;

  @ManyToMany((type) => GuildMember, (member: GuildMember) => member.channels)
  @JoinTable()
  members!: GuildMember[]
}
