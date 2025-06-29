import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createConversation(dto: CreateConversationDto) {
    const { userIds, type, name } = dto;
    const conversation = await this.prisma.conversations.create({
      data: {
        type,
        name,
        created_by: userIds[0],
        conversation_participants: {
          create: userIds.map(userId => ({
            user_id: userId,
            role: userId === userIds[0] ? 'admin' : 'member',
          })),
        },
      },
      include: { conversation_participants: true },
    });
    return conversation;
  }
  async addParticipant(conversationId: number, userId: number, addedBy: number) {
    const conversation = await this.prisma.conversations.findUnique({ where: { id: conversationId } });
    if (!conversation || conversation.created_by !== addedBy) {
      throw new Error('Unauthorized');
    }
    return this.prisma.conversation_participants.create({
      data: { conversation_id: conversationId, user_id: userId, role: 'member' },
    });
    
  }
  async removeParticipant(conversationId: number, userId: number, removedBy: number) {
    const conversation = await this.prisma.conversations.findUnique({ where: { id: conversationId } });
    if (!conversation || conversation.created_by !== removedBy) {
      throw new Error('Unauthorized');
    }
    return this.prisma.conversation_participants.delete({
      where: { conversation_id_user_id: { conversation_id: conversationId, user_id: userId } },
    });
  }
  async getConversations(userId: number) {
    return this.prisma.conversation_participants.findMany({
      where: { user_id: userId, conversations: { is_active: true } },
      include: {
        conversations: {
          include: {
            messages_messages_conversation_idToconversations: { take: 1, orderBy: { timestamp: 'desc' } },
            conversation_participants: { include: { users: true } },
          },
        },
      },
    });
  }

  async createMessage(dto: SendMessageDto) {
    const { conversationId, userId, content, media } = dto;
    const message = await this.prisma.messages.create({
      data: {
        conversation_id: conversationId,
        user_id: userId,
        content,
        message_media: media
          ? {
              create: {
                media_url: media.url,
                media_type: media.type,
                file_name: media.fileName,
                file_size: media.fileSize,
              },
            }
          : undefined,
      },
      include: { message_media: true, users: true },
    });
  
    await this.prisma.conversations.update({
      where: { id: conversationId },
      data: { last_message_id: message.id, updated_at: new Date() },
    });
  
    return message;
  }
  async deleteMessage(messageId: number, userId: number) {
    const message = await this.prisma.messages.findUnique({
      where: { id: messageId },
      include: { users: true },
    });

    if (!message || message.user_id !== userId) {
      throw new Error('Unauthorized or message not found');
    }

    return this.prisma.messages.update({
      where: { id: messageId },
      data: { is_deleted: true },
    });
  }
  async editMessage(messageId: number, userId: number, content: string) {
    const message = await this.prisma.messages.findUnique({
      where: { id: messageId },
      include: { users: true },
    });

    if (!message || message.user_id !== userId || message.is_deleted) {
      throw new Error('Unauthorized or message not found/deleted');
    }

    return this.prisma.messages.update({
      where: { id: messageId },
      data: { content },
      include: { users: true },
    });
  }

  async getConversationMessages(conversationId: number, take: number = 20, skip: number = 0) {
    return this.prisma.messages.findMany({
      where: { conversation_id: conversationId, is_deleted: false },
      include: { message_media: true, users: true },
      orderBy: { timestamp: 'desc' },
      take,
      skip,
    });
  }

  async getConversationParticipants(conversationId: number) {
    return this.prisma.conversation_participants.findMany({
      where: { conversation_id: conversationId },
      include: { users: true },
    });
  }

  async updateUserOnlineStatus(userId: number, isOnline: boolean) {
    await this.prisma.users.update({
      where: { id: userId },
      data: { is_online: isOnline, last_seen: new Date() },
    });
  }

  async markMessageAsRead(messageId: number) {
    return this.prisma.messages.update({
      where: { id: messageId },
      data: { is_read: true, delivered_at: new Date() },
    });
  }

}