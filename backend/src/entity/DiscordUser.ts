import {
  Entity, PrimaryColumn, Column, OneToMany,
} from 'typeorm';
import {
  DiscordMessage,
} from './DiscordMessage';

@Entity()
/**
 * Entity for an Discord User.
 */
export class DiscordUser {
  @PrimaryColumn()
  id!: number;

  @Column()
  avatarURL!: string;

  @Column()
  createdAt!: Date;

  @Column()
  locale!: string;

  @Column()
  presence!: string;

  @Column()
  username!: string;

  @Column()
  tag!: string;

  @OneToMany((type) => DiscordMessage, (message: DiscordMessage) => message.author)
  messages!: DiscordMessage[];
}
