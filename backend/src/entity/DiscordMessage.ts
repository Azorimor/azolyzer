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
  id!: number;

  @ManyToOne((type) => DiscordUser, (user: DiscordUser) => user.messages)
  author!: number;

  @Column()
  channel!: number;

  @Column()
  guild!: number;

  @Column()
  member!: number;
}
