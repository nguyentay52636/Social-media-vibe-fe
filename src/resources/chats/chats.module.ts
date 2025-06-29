import { Module } from '@nestjs/common';
import { ChatController } from './chats.controller';
import { ChatGateway } from './gateways/chat.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { ChatService } from './chats.service';

@Module({
  providers: [ChatService, ChatGateway, PrismaService],
  controllers: [ChatController],
})
export class ChatModule {}