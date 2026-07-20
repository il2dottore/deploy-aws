import { ApiProperty } from '@nestjs/swagger';

export class BatchUsersDto {
  @ApiProperty({ type: [String], example: ['id-1', 'id-2'] })
  ids!: string[];
}
