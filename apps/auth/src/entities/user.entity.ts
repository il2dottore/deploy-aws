import { BaseEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: false, unique: true, length: 255 })
  email!: string;

  @Column({ nullable: false, length: 255 })
  firstName!: string;

  @Column({ nullable: false, length: 255 })
  lastName!: string;

  @Column({ nullable: false, type: 'text' })
  password!: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  roles!: UserRole[];
}
