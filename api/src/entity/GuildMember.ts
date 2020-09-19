import {
  Entity, OneToMany, PrimaryColumn, ManyToOne, ManyToMany, Column, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import {
  VoiceStateUpdate,
} from './VoiceStateUpdate';
import {
  DiscordGuild,
} from './DiscordGuild';
import {
  DiscordUser,
} from './DiscordUser';
import {
  Channel,
} from './Channel';

@Entity()
@Unique(['user', 'guild'])
/**
 * Entity for Discord Guild Member.
 */
export class GuildMember {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne((type) => DiscordUser, (user:DiscordUser) => user.guildmembers)
  user?: DiscordUser;

  @ManyToOne((type) => DiscordGuild, (guild:DiscordGuild) => guild.members)
  guild?: DiscordGuild;

  @Column()
  displayName?: string;

  // @OneToMany((type) => DiscordMessage, (message: DiscordMessage) => message.author)
  // messages!: DiscordMessage[];

  @OneToMany((type) => VoiceStateUpdate, (voice: VoiceStateUpdate) => voice.user)
  voices?: VoiceStateUpdate[];

  @ManyToMany((type) => Channel, (channel: Channel) => channel.members)
  channels?: Channel[]
}
