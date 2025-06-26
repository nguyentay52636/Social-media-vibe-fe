import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class PrivacySettingsDto {
  @ApiProperty({ description: 'User ID' })
  @IsInt()
  user_id: number;

  @ApiProperty({ description: 'Profile visibility', required: false })
  @IsString()
  @IsOptional()
  profile_visibility?: string;

  @ApiProperty({ description: 'Post visibility', required: false })
  @IsString()
  @IsOptional()
  post_visibility?: string;

  @ApiProperty({ description: 'Friend list visibility', required: false })
  @IsString()
  @IsOptional()
  friend_list_visibility?: string;

  @ApiProperty({ description: 'Online status visibility', required: false })
  @IsBoolean()
  @IsOptional()
  online_status?: boolean;

  @ApiProperty({ description: 'Contact visibility', required: false })
  @IsString()
  @IsOptional()
  contact_visibility?: string;

  @ApiProperty({ description: 'Related user', type: () => UserDto })
  users: UserDto;
}