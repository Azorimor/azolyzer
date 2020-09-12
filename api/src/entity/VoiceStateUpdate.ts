import {
  Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne,
} from 'typeorm';
import {
  GuildMember,
} from './GuildMember';

/**
 * Enum for all actions, which can be logged if a user interacts with a discord voice channel.
 */
export enum VoiceStateUpdateAction {
  JOIN = 'join',
  LEAVE = 'leave',
  MUTE = 'mute',
  UNMUTE = 'unmute',
}

@Entity()
/**
 * Entity for storing data about users joining/leaving a discord voice channel.
 */
export class VoiceStateUpdate {
  @PrimaryGeneratedColumn('rowid')
  id!: number;

  @Column({
    type: 'enum',
    enum: VoiceStateUpdateAction,
  })
  action!: VoiceStateUpdateAction;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @ManyToOne((type) => GuildMember, (member: GuildMember) => member.voices)
  user!: GuildMember;
}
