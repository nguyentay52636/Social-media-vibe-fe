import { ApiProperty } from '@nestjs/swagger';

class UserInfoDto {
  @ApiProperty({ description: 'User ID' })
  id: number;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Email address' })
  email: string;

  @ApiProperty({ description: 'Full name' })
  full_name: string;

  @ApiProperty({ description: 'Avatar URL' })
  avatar: string;

  @ApiProperty({ description: 'User biography' })
  bio: string;

  @ApiProperty({ description: 'Account creation date' })
  created_at: Date;

  @ApiProperty({ description: 'Account update date' })
  updated_at: Date;
}

class PostInfoDto {
  @ApiProperty({ description: 'Post ID' })
  id: number;

  @ApiProperty({ description: 'Post content' })
  content: string;

  @ApiProperty({ description: 'User ID who created the post' })
  user_id: number;

  @ApiProperty({ description: 'Post creation date' })
  created_at: Date;

  @ApiProperty({ description: 'Post update date' })
  updated_at: Date;

  @ApiProperty({ description: 'Post media files' })
  post_media: any[];

  @ApiProperty({ description: 'Post author information', type: UserInfoDto })
  users: UserInfoDto;
}

class CommentMediaDto {
  @ApiProperty({ description: 'Media ID' })
  id: number;

  @ApiProperty({ description: 'Comment ID' })
  comment_id: number;

  @ApiProperty({ description: 'Media URL' })
  media_url: string;

  @ApiProperty({ description: 'Media type' })
  media_type: string;

  @ApiProperty({ description: 'Media creation date' })
  created_at: Date;
}

class ReplyCommentDto {
  @ApiProperty({ description: 'Comment ID' })
  id: number;

  @ApiProperty({ description: 'Comment content' })
  content: string;

  @ApiProperty({ description: 'Comment creation date' })
  created_at: Date;

  @ApiProperty({ description: 'User information', type: UserInfoDto })
  users: UserInfoDto;

  @ApiProperty({ description: 'Comment media', type: [CommentMediaDto] })
  comment_media: CommentMediaDto[];
}

export class CommentResponseDto {
  @ApiProperty({ description: 'Comment ID' })
  id: number;

  @ApiProperty({ description: 'Comment content' })
  content: string;

  @ApiProperty({ description: 'Comment creation date' })
  created_at: Date;

  @ApiProperty({ description: 'Parent comment ID (for replies)' })
  parent_id?: number;

  @ApiProperty({ description: 'User information', type: UserInfoDto })
  users: UserInfoDto;

  @ApiProperty({ description: 'Post information', type: PostInfoDto })
  posts: PostInfoDto;

  @ApiProperty({ description: 'Comment media files', type: [CommentMediaDto] })
  comment_media: CommentMediaDto[];

  @ApiProperty({ description: 'Reply comments', type: [ReplyCommentDto] })
  comments: ReplyCommentDto[];
} 