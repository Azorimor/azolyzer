import {
  Entity, Column, PrimaryColumn, ManyToOne,
} from 'typeorm';
import {
  DiscordUser,
} from './DiscordUser';

@Entity()
/**
 * The Entity for all messages which are seen by the bot.
 */
export class DiscordMessage {
  @PrimaryColumn()
  id!: string;

  @ManyToOne((type) => DiscordUser, (user: DiscordUser) => user.messages)
  author!: DiscordUser;

  @Column()
  channel!: string;

  @Column()
  guild!: string;

  @Column()
  member!: string;
}
