import { ApiProperty } from '@nestjs/swagger';

export class ParticipantSchema {
  @ApiProperty({ default: '' })
  conversation_id: number;

  @ApiProperty({ default: '' })
  user_id: number;

  @ApiProperty({ default: '' })
  role: string;

  @ApiProperty({ default: '' })
  joined_at: string;

  @ApiProperty({ default: '', nullable: true })
  left_at: string | null;
}

export class UserSchema {
  @ApiProperty({ default: '' })
  id: number;

  @ApiProperty({ default: '' })
  full_name: string;

  @ApiProperty({ default: '', nullable: true })
  avatar: string | null;
}

export class MessageMediaSchema {
  @ApiProperty({ default: '' })
  id: number;

  @ApiProperty({ default: '' })
  media_url: string;

  @ApiProperty({ default: '' })
  media_type: string;

  @ApiProperty({ default: '', nullable: true })
  file_name: string | null;

  @ApiProperty({ default: '', nullable: true })
  file_size: string | null;
}

export class ConversationSchema {
  @ApiProperty({ default: '' })
  id: number;

  @ApiProperty({ default: '' })
  type: string;

  @ApiProperty({ default: '', nullable: true })
  name: string | null;

  @ApiProperty({ default: '' })
  created_by: number;

  @ApiProperty({ default: '', nullable: true })
  last_message_id: number | null;

  @ApiProperty({ default: '' })
  is_active: boolean;

  @ApiProperty({ default: '' })
  created_at: string;

  @ApiProperty({ default: '' })
  updated_at: string;

  @ApiProperty({ type: [ParticipantSchema] })
  conversation_participants: ParticipantSchema[];
}

export class MessageSchema {
  @ApiProperty({ default: '' })
  id: number;

  @ApiProperty({ default: '' })
  conversation_id: number;

  @ApiProperty({ default: '' })
  user_id: number;

  @ApiProperty({ default: '', nullable: true })
  content: string | null;

  @ApiProperty({ default: '' })
  timestamp: string;

  @ApiProperty({ default: '' })
  is_read: boolean;

  @ApiProperty({ default: '', nullable: true })
  delivered_at: string | null;

  @ApiProperty({ default: '' })
  is_deleted: boolean;

  @ApiProperty({ type: [MessageMediaSchema] })
  message_media: MessageMediaSchema[];

  @ApiProperty({ type: UserSchema })
  users: UserSchema;
}