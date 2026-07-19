import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@app/common';
import { RolePermission } from './role-permission.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ unique: true })
  key!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  roles!: RolePermission[];
}
