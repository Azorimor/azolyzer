import {
  Entity, PrimaryColumn, OneToMany, Column,
} from 'typeorm';
import {
  Channel,
} from './Channel';
import {
  GuildMember,
} from './GuildMember';

@Entity()
/**
 * Entity for Discord Guilds
 */
export class DiscordGuild {
  @PrimaryColumn({
    type: 'bigint',
  })
  id!: string;

  @Column()
  publicStats!: boolean;

  @OneToMany((type) => Channel, (channel: Channel) => channel.guild)
  channels!: Channel[];

  @OneToMany((type) => GuildMember, (member:GuildMember) => member.guild)
  members!: GuildMember[];
}
