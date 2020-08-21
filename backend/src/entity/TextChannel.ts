import {
  Entity, PrimaryColumn, Column, OneToMany,
} from 'typeorm';
import {
  DiscordMessage,
} from './DiscordMessage';
import {
  Channel,
} from './Channel';

@Entity()
/**
 * Entity for all text channels of discord. Also the dm channel is included here.
 */
export class TextChannel extends Channel {
  @OneToMany((type) => DiscordMessage, (message: DiscordMessage) => message.channel)
  messages!: DiscordMessage[]
}
