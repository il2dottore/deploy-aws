import { BaseEntity } from '@app/common';
import { Entity, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('user_roles')
export class UserRole extends BaseEntity {
  @ManyToOne(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  role!: Role;
}
