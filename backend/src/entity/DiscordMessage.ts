import {
  Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {
  DiscordUser,
} from './DiscordUser';
import {
  TextChannel,
} from './TextChannel';

@Entity()
/**
 * The Entity for all messages which are seen by the bot.
 */
export class DiscordMessage {
  @PrimaryColumn()
  id!: string;

  @ManyToOne((type) => DiscordUser, (user: DiscordUser) => user.messages)
  author!: DiscordUser;

  @ManyToOne((type) => TextChannel, (channel: TextChannel) => channel.messages)
  channel!: TextChannel;

  // Redundant information. Gets saved in Channel Entity for DMChannel, GuildChannel, ...
  // @Column({
  //   nullable: true,
  // })
  // guild!: string;

  // @Column()
  // member!: string;

  @Column({
    type: 'timestamptz',
  })
  messageCreatedAt!: Date;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;
}
