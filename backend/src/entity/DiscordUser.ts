import {
  Entity, Column, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {
  GuildMember,
} from './GuildMember';
import {
  IsEmail,
} from 'class-validator';

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

  @Column()
  @IsEmail()
  email!: string;

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

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @OneToMany((type) => GuildMember, (member:GuildMember) => member.user)
  guildmembers!: GuildMember;
}
