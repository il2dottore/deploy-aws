import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { BatchUsersDto } from './dtos/requests/batch-users.dto';
import { UserProfileDto } from './dtos/responses/user-profile.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Batch users by user ids',
  })
  @Post()
  @ApiResponse({ type: UserProfileDto })
  batchByUserIds(@Body() batchUsersDto: BatchUsersDto) {
    return this.userService.batchByUserIds(batchUsersDto);
  }
}
