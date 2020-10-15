import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany, OneToOne, JoinColumn,
} from 'typeorm';
import {
  DiscordGuild,
} from './DiscordGuild';
import {
  DiscordUser,
} from './DiscordUser';

@Entity()
/**
 * Entity for the WebUser. This are the users, who are registered to the website.
 */
export class WebUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    type: 'bigint',
    unique: true,
  })
  discordId?: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  avatar?: string | null;

  @Column()
  username?: string;

  @Column()
  tag?: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt?: Date;

  @Column({
    default: 0,
  })
  refreshTokenVersion?: number;

  @Column({
    nullable: true,
  })
  discordAccessToken?: string;

  @Column({
    nullable: true,
  })
  discordRefreshToken?: string;

  @OneToMany((type) => DiscordGuild, (guild: DiscordGuild) => guild.owner)
  ownedGuilds?: DiscordGuild[];

  @OneToOne((type) => DiscordUser)
  @JoinColumn()
  discordUser?: DiscordUser;
}
