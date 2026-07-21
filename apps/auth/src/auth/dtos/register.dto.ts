import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John' })
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName!: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @ApiProperty({ minLength: 8, maxLength: 30, example: 'password123' })
  password!: string;
}
