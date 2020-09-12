import {
  Entity, PrimaryColumn, OneToMany, Column, ManyToOne,
} from 'typeorm';
import {
  Channel,
} from './Channel';
import {
  GuildMember,
} from './GuildMember';
import {
  DiscordUser,
} from './DiscordUser';

@Entity()
/**
 * Entity for Discord Guilds
 */
export class DiscordGuild {
  @PrimaryColumn({
    type: 'bigint',
  })
  id?: string;

  @Column({
    default: false,
  })
  publicStats?: boolean;

  @OneToMany((type) => Channel, (channel: Channel) => channel.guild)
  channels?: Channel[];

  @OneToMany((type) => GuildMember, (member:GuildMember) => member.guild)
  members?: GuildMember[];
  // TODO remove comment later after this line is new and needs to be adjusted in the code
  @Column({
    default: true,
  })
  deleted?: boolean;

  @Column({
    nullable: true,
    type: 'character varying',
  })
  banner?: string | null;

  @Column({
    nullable: true,
    type: 'character varying',
  })
  description?: string | null;

  @Column({
    type: 'timestamptz',
  })
  joinedAt?: Date;

  @Column()
  mfaLevel?: number;

  @Column()
  name?: string;

  @ManyToOne((type) => DiscordUser, (member: DiscordUser) => member.ownedGuilds)
  owner?: DiscordUser;

  @Column({
    default: false,
  })
  partnered?: boolean;

  @Column({
    default: false,
  })
  verified?: boolean;

  // @Column() // somehow not available in the guild even if said in doc.
  // preferredLocale?: string;

  // TODO Presences column with own presence entity
  // TODO also display roles in some sort later on and different channels (afk, ...)
  @Column()
  region?: string;

  @Column({
    nullable: true,
    type: 'character varying',
  })
  icon?: string | null;
}
