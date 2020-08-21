import {
  Entity, OneToMany, PrimaryColumn, ManyToOne, ManyToMany,
} from 'typeorm';
import {
  DiscordMessage,
} from './DiscordMessage';
import {
  VoiceStateUpdate,
} from './VoiceStateUpdate';
import {
  Guild,
} from './Guild';
import {
  DiscordUser,
} from './DiscordUser';
import {
  Channel,
} from './Channel';

@Entity()
/**
 * Entity for Discord Guild Member.
 */
export class GuildMember {
  @PrimaryColumn({
    type: 'bigint',
  })
  @ManyToOne((type) => DiscordUser, (user:DiscordUser) => user.guildmembers)
  user!: DiscordUser;

  @PrimaryColumn({
    type: 'bigint',
  })
  @ManyToOne((type) => Guild, (guild:Guild) => guild.members)
  guild!: Guild;

  @OneToMany((type) => DiscordMessage, (message: DiscordMessage) => message.author)
  messages!: DiscordMessage[];

  @OneToMany((type) => VoiceStateUpdate, (voice: VoiceStateUpdate) => voice.user)
  voices!: VoiceStateUpdate[];

  @ManyToMany((type) => Channel, (channel: Channel) => channel.members)
  channels!: Channel[]
}
