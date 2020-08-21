import {
  Entity, Column,
} from 'typeorm';
import {
  Channel,
} from './Channel';

@Entity()
/**
 * Entity for Discords Voice channels.
 */
export class VoiceChannel extends Channel {
  @Column()
  userlimit!: number;
}
