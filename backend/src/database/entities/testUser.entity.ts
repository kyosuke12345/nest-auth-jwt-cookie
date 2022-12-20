import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const MAX_LENGTH = {
  EMAIL: 80,
  PASSWORD: 60,
  FIRST_NAME: 50,
  LAST_NAME: 50,
} as const;

@Entity('test_user')
export class TestUser {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'email', length: MAX_LENGTH.EMAIL, unique: true })
  readonly email: string;

  @Column({ name: 'password', length: MAX_LENGTH.PASSWORD })
  readonly password: string;

  @Column({ name: 'first_name', length: MAX_LENGTH.FIRST_NAME })
  firstName: string;

  @Column({ name: 'last_name', length: MAX_LENGTH.LAST_NAME })
  lastName: string;
}
