import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { BatchUsersDto } from './dtos/batch-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async batchByUserIds(batchUsersDto: BatchUsersDto) {
    const { ids } = batchUsersDto;

    if (ids.length === 0) {
      return [];
    }

    const users = await this.userRepository.find({
      where: {
        id: In([...new Set(ids)]),
      },
    });

    return users as Omit<User, 'password'>[];
  }

  /**
   * Return user profile without password field, also includes roles and non-duplicate merged permissions
   * @param {string} id - User UUID
   * @returns
   */
  async getProfile(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        roles: {
          role: {
            permissions: {
              permission: true,
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // User without password
    const { roles: userRoles, ...userWithoutPassword } = user as Omit<
      User,
      'password'
    >;
    Reflect.deleteProperty(userWithoutPassword, 'password');

    // Only grab `name` (This is also unique)
    const roles = userRoles.map(({ role }) => role.name);

    // Merge all permissions from roles and remove duplicates
    const permissions = [
      ...new Set(
        userRoles
          .flatMap(({ role }) => role.permissions)
          .map(({ permission }) => permission.key),
      ),
    ];

    return {
      user: userWithoutPassword,
      roles: roles,
      permissions: permissions,
    };
  }
}
