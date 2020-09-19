import {
  Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {
  TextChannel,
} from './TextChannel';
import {
  GuildMember,
} from './GuildMember';

@Entity()
/**
 * The Entity for all messages which are seen by the bot.
 */
export class DiscordMessage {
  @PrimaryColumn()
  id!: string;

  @ManyToOne((type) => GuildMember) // , (member: GuildMember) => member.messages
  author!: GuildMember;

  @ManyToOne((type) => TextChannel, (channel: TextChannel) => channel.messages)
  channel!: TextChannel;

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
