import { BaseEntity } from '@app/common';
import { Entity, ManyToOne } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity('role_permissions')
export class RolePermission extends BaseEntity {
  @ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: 'CASCADE',
  })
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.roles, {
    onDelete: 'CASCADE',
  })
  permission!: Permission;
}
