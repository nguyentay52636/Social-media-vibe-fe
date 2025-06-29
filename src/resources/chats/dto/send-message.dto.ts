import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class MediaDto {
  @ApiProperty({ description: 'URL of the media',default: "" })
  @IsString()
  url: string;

  @ApiProperty({ description: 'Type of media',default: "" })
        @IsString()
        type: string;

  @ApiProperty({ description: 'File name',default: "" })
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiProperty({ description: 'File size',default: "" })
  @IsOptional()
  @IsString()
  fileSize?: string;
}

export class SendMessageDto {
  @ApiProperty({ description: 'ID of the conversation',default: 1 })
  @IsNumber()
  conversationId: number;

  @ApiProperty({ description: 'ID of the user',default: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Content of the message', example: 'Hello!', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Media attached', type: MediaDto, required: false })
  @IsOptional()
  media?: MediaDto;
}