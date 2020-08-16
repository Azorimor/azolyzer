import {
  Entity, Column, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {
  DiscordMessage,
} from './DiscordMessage';

@Entity()
/**
 * Entity for an Discord User.
 */
export class DiscordUser {
  @PrimaryColumn({
    type: 'bigint',
  })
  id!: string;

  @Column()
  avatarURL!: string;

  @Column({
    type: 'timestamptz',
  })
  accountCreatedAt!: Date;

  @Column({
    nullable: true,
  })
  locale!: string;

  @Column()
  username!: string;

  @Column()
  tag!: string;

  @OneToMany((type) => DiscordMessage, (message: DiscordMessage) => message.author)
  messages!: DiscordMessage[];

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;
}
