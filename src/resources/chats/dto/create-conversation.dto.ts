import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({ description: 'Array of user IDs', example: [1, 2], type: [Number] })
  @IsArray()
  userIds: number[];

  @ApiProperty({ description: 'Type of conversation', example: 'private', enum: ['private', 'group'] })
  @IsString()
  @IsIn(['private', 'group'])
  type: string;

  @ApiProperty({ description: 'Name of the conversation', example: 'Friends Chat', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}