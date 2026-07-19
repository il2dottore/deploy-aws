import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@app/common';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true })
  name!: string; // USER | MODERATOR | ADMIN

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, {
    cascade: true,
  })
  permissions!: RolePermission[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  users!: UserRole[];
}
