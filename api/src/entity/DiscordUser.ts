import {
  Entity, Column, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import {
  GuildMember,
} from './GuildMember';

@Entity()
/**
 * Entity for an Discord User.
 */
export class DiscordUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    type: 'bigint',
    unique: true,
  })
  discordSecretId?: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  accountCreatedAt?: Date;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt?: Date;

  @OneToMany((type) => GuildMember, (member:GuildMember) => member.user)
  guildmembers?: GuildMember;

  @Column({
    default: false,
  })
  bot?: boolean;
}
