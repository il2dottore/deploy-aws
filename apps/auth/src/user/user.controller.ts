import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { BatchUsersDto } from './dtos/batch-users.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Batch users by user ids',
  })
  @Post()
  batchByUserIds(@Body() batchUsersDto: BatchUsersDto) {
    return this.userService.batchByUserIds(batchUsersDto);
  }
}
