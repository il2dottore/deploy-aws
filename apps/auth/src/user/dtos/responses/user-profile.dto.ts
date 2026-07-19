import { User } from '../../../entities/user.entity';

export class UserProfileDto {
  // Probably this doesn't appear on Swagger since `Omit` is strictly a compile-time feature
  user!: Omit<User, 'password'>;
  roles!: string[];
  permissions!: string[];
}
