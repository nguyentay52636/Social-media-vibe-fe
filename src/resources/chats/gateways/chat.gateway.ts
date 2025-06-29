import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from '../chats.service';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from '../dto/send-message.dto';
import { PrismaService } from 'src/resources/prisma/prisma.service';


@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService, private readonly prisma: PrismaService) {}

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.logger.log(`Client connected: ${userId}`);
      await this.chatService.updateUserOnlineStatus(parseInt(userId), true);
      this.server.emit('userStatus', { userId: parseInt(userId), isOnline: true });
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.logger.log(`Client disconnected: ${userId}`);
      await this.chatService.updateUserOnlineStatus(parseInt(userId), false);
      this.server.emit('userStatus', { userId: parseInt(userId), isOnline: false });
    }
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(client: Socket, conversationId: number) {
    client.join(`conversation_${conversationId}`);
    this.logger.log(`User joined conversation: ${conversationId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: SendMessageDto) {
    const message = await this.chatService.createMessage(payload);
    this.server.to(`conversation_${payload.conversationId}`).emit('newMessage', message);

    const participants = await this.chatService.getConversationParticipants(payload.conversationId);
    participants.forEach(participant => {
      if (participant.user_id !== payload.userId) {
        this.server.to(`user_${participant.user_id}`).emit('notification', {
          type: 'message',
          content: `New message from ${payload.userId}`,
          conversationId: payload.conversationId,
        });
      }
    });
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(client: Socket, payload: { messageId: number; userId: number }) {
    const { messageId, userId } = payload;
    await this.chatService.deleteMessage(messageId, userId);
    this.server.to(`conversation_${await this.getConversationIdFromMessage(messageId)}`).emit('messageDeleted', { messageId });
  }

  @SubscribeMessage('editMessage')
  async handleEditMessage(client: Socket, payload: { messageId: number; userId: number; content: string }) {
    const { messageId, userId, content } = payload;
    const updatedMessage = await this.chatService.editMessage(messageId, userId, content);
    this.server.to(`conversation_${await this.getConversationIdFromMessage(messageId)}`).emit('messageEdited', updatedMessage);
  }

  private async getConversationIdFromMessage(messageId: number): Promise<number> {
    const message = await this.prisma.messages.findUnique({ where: { id: messageId }, select: { conversation_id: true } });
    return message?.conversation_id || 0;
  }
}