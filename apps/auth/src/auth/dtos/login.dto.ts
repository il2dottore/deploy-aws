import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123' })
  password!: string;
}
