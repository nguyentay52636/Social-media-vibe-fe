import { IsInt, IsString, IsOptional, MinLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CommentMediaDto {
  @ApiProperty({ description: 'URL of the media' })
  @IsString()
  @MinLength(1)
  media_url: string;

  @ApiProperty({ description: 'Type of media (e.g., image, video)',default: 'image' })
  @IsString()
  media_type: string;
}

export class CreateCommentDto {
@ApiProperty({ default: '' }) 
 @IsString()
  @MinLength(1, { message: 'Content must not be empty' })
  content: string;

  @ApiProperty({ description: 'ID of the post being commented on' })
  @IsInt()
  post_id: number;

  @ApiProperty({ description: 'ID of the user creating the comment' })
  @IsInt()
  user_id: number;

  @ApiProperty({ description: 'ID of the parent comment (for replies)' })
  @IsInt()
  @IsOptional()
  parent_id?: number;

  @ApiProperty({ description: 'List of media associated with the comment' })
  @IsArray()
  @IsOptional()
  comment_media?: CommentMediaDto[];
}