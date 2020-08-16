import {
  Entity, Column, OneToMany, PrimaryColumn,
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
  id!: string;

  // @Column()
  // discordid!: number;

  @Column()
  avatarURL!: string;

  @Column()
  createdAt!: Date;

  @Column({
    nullable: true,
  })
  locale!: string;

  // @Column() can be status, playing, ...
  // presence!: string;

  @Column()
  username!: string;

  @Column()
  tag!: string;

  @OneToMany((type) => DiscordMessage, (message: DiscordMessage) => message.author)
  messages!: DiscordMessage[];
}
