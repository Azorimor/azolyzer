import {
  Entity, Column, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {
  GuildMember,
} from './GuildMember';
import {
  DiscordGuild,
} from './DiscordGuild';

@Entity()
/**
 * Entity for an Discord User.
 */
export class DiscordUser {
  @PrimaryColumn({
    type: 'bigint',
  })
  id?: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  avatar?: string | null;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  accountCreatedAt?: Date;

  @Column({
    nullable: true,
  })
  locale?: string;

  @Column()
  username?: string;

  @Column()
  tag?: string;

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
    default: 0,
  })
  refreshTokenVersion?: number;

  @Column({
    nullable: true,
  })
  discordAccessToken?: string;

  @Column({
    nullable: true,
  })
  discordRefreshToken?: string;

  @Column({
    default: false,
  })
  bot?: boolean;

  @OneToMany((type) => DiscordGuild, (guild: DiscordGuild) => guild.owner)
  ownedGuilds?: DiscordGuild[];
}
