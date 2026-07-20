import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty()
  success: boolean;
  data: T;
  @ApiPropertyOptional()
  message?: string;
  @ApiProperty()
  timestamp: string;

  constructor(data: T, message?: string) {
    this.success = true;
    this.data = data;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}

export class ApiErrorDto {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiPropertyOptional({ type: Object })
  errors?: Record<string, string[]>;
  @ApiProperty()
  path: string;
  @ApiProperty()
  timestamp: string;

  constructor(
    statusCode: number,
    message: string,
    path: string,
    errors?: Record<string, string[]>,
  ) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.path = path;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
  }
}
