import {
  Entity, PrimaryColumn, Column, OneToMany,
} from 'typeorm';
import {
  DiscordMessage,
} from './DiscordMessage';

@Entity()
/**
 * Entity for all text channels of discord. Also the dm channel is included here.
 */
export class TextChannel {
  @PrimaryColumn({
    type: 'bigint',
  })
  id!: string;

  @OneToMany((type) => DiscordMessage, (message: DiscordMessage) => message.channel)
  messages!: DiscordMessage[]
}
