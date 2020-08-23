import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, PrimaryColumn,
} from 'typeorm';
import {
  DiscordUser,
} from './DiscordUser';

@Entity()
/**
 * Entity for storing authentication information about the web users.
 */
export class Session {
  @Column()
  id!: string;

  @Column()
  @Index()
  accessToken!: string;

  @Column()
  refreshToken!: string;

  @OneToOne((type) => DiscordUser)
  @JoinColumn()
  @PrimaryColumn({
    type: 'bigint',
  })
  user!: DiscordUser;
}
