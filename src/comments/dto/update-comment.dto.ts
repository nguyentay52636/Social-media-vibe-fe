import { IsString, IsOptional, MinLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CommentMediaDto {
  @ApiProperty({ description: 'URL of the media' })
  @IsString()
  @MinLength(1)
  media_url: string;

  @ApiProperty({ description: 'Type of media (e.g., image, video)', default: 'image' })
  @IsString()
  media_type: string;
}

export class UpdateCommentDto {
  @ApiProperty({ description: 'Updated content of the comment', default: '' })
  @IsString()
  @MinLength(1, { message: 'Content must not be empty' })
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Updated list of media associated with the comment' })
  @IsArray()
  @IsOptional()
  comment_media?: CommentMediaDto[];
}

