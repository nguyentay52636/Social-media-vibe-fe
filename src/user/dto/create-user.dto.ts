import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsInt, IsDateString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user', required: false })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty({ description: 'Unique username', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'User email address', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Password hash', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ description: 'Role ID', required: false })
  @IsInt()
  @IsOptional()
  role_id?: number;

  @ApiProperty({ description: 'Avatar URL', required: false })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: 'Cover photo URL', required: false })
  @IsString()
  @IsOptional()
  cover_photo?: string;

  @ApiProperty({ description: 'User biography', required: false })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ description: 'User location', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: 'Workplace', required: false })
  @IsString()
  @IsOptional()
  workplace?: string;

  @ApiProperty({ description: 'Education', required: false })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiProperty({ description: 'Birth date', required: false })
  @IsDateString()
  @IsOptional()
  birth_date?: Date;

  @ApiProperty({ description: 'Gender', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ description: 'Relationship status', required: false })
  @IsString()
  @IsOptional()
  relationship_status?: string;

  @ApiProperty({ description: 'Online status', required: false })
  @IsBoolean()
  @IsOptional()
  is_online?: boolean;

  @ApiProperty({ description: 'Interests', required: false })
  @IsString()
  @IsOptional()
  interests?: string;

  @ApiProperty({ description: 'Website URL', required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: 'Account active status', required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}