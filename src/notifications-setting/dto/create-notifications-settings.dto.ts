import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateNotificationsSettingsDto {
  @ApiProperty({ description: 'User ID' })
  @IsInt()
  user_id: number;

  @ApiProperty({ description: 'Likes notification preference', required: false })
  @IsBoolean()
  @IsOptional()
  likes?: boolean;

  @ApiProperty({ description: 'Comments notification preference', required: false })
  @IsBoolean()
  @IsOptional()
  comments?: boolean;

  @ApiProperty({ description: 'Messages notification preference', required: false })
  @IsBoolean()
  @IsOptional()
  messages?: boolean;

  @ApiProperty({ description: 'Friend requests notification preference', required: false })
  @IsBoolean()
  @IsOptional()
  friend_requests?: boolean;

  @ApiProperty({ description: 'Events notification preference', required: false })
  @IsBoolean()
  @IsOptional()
  events?: boolean;
}