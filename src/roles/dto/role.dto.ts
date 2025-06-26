import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

export class RoleDto {
  @ApiProperty({ description: 'Unique identifier of the role' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Role name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Role description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @IsDateString()
  created_at: Date;

  @ApiProperty({ description: 'Related users', type: () => [UserDto], required: false })
  @IsOptional()
  users?: UserDto[];
}