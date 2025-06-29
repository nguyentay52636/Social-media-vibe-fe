import { Controller, Get, Post, Body, Param, Query, HttpCode, Patch, Delete } from '@nestjs/common';
import { ChatService } from './chats.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('conversations')
  @ApiOperation({ summary: 'Create a new conversation' })
  @ApiResponse({ status: 201, description: 'Conversation created successfully' })
  async createConversation(@Body() dto: CreateConversationDto) {
    return this.chatService.createConversation(dto);
  }
  @Post('conversations/:conversationId/participants')
  @ApiOperation({ summary: 'Add a participant to a conversation' })
  @ApiResponse({ status: 200, description: 'Participant added successfully' })
  @ApiResponse({ status: 403, description: 'Unauthorized to add participant' })
  async addParticipant(
    @Param('conversationId') conversationId: string,
    @Query('userId') userId: string,
    @Query('addedBy') addedBy: string,
  ) {
    return this.chatService.addParticipant(parseInt(conversationId), parseInt(userId), parseInt(addedBy));
  }

  @Get('conversations/:userId')
  @ApiOperation({ summary: 'Get all conversations for a user' })
  @ApiResponse({ status: 200, description: 'List of conversations' })
  async getConversations(@Param('userId') userId: string) {
    return this.chatService.getConversations(parseInt(userId));
  }

  @Get('messages/:conversationId')
  @ApiOperation({ summary: 'Get messages in a conversation' })
  @ApiQuery({ name: 'take', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
  @ApiResponse({ status: 200, description: 'List of messages in the conversation' })
  async getMessages(
    @Param('conversationId') conversationId: string,
    @Query('take') take: string = '20',
    @Query('skip') skip: string = '0',
  ) {
    return this.chatService.getConversationMessages(parseInt(conversationId), parseInt(take), parseInt(skip));
  }

  @Post('messages/:messageId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiResponse({ status: 200, description: 'Message marked as read' })
  async markMessageAsRead(@Param('messageId') messageId: string) {
    return this.chatService.markMessageAsRead(parseInt(messageId));
  }

  @Delete('messages/:messageId')
  @ApiOperation({ summary: 'Delete a message (soft delete)' })
  @ApiResponse({ status: 200, description: 'Message deleted successfully' })
  @ApiResponse({ status: 403, description: 'Unauthorized to delete message' })
  async deleteMessage(@Param('messageId') messageId: string, @Query('userId') userId: string) {
    return this.chatService.deleteMessage(parseInt(messageId), parseInt(userId));
  }

  @Patch('messages/:messageId')
  @ApiOperation({ summary: 'Edit a message content' })
  @ApiResponse({ status: 200, description: 'Message updated successfully' })
  @ApiResponse({ status: 403, description: 'Unauthorized to edit message' })
  async editMessage(
    @Param('messageId') messageId: string,
    @Query('userId') userId: string,
    @Body('content') content: string,
  ) {
    return this.chatService.editMessage(parseInt(messageId), parseInt(userId), content);
  }

  @Post('messages')
  @ApiOperation({ summary: 'Send a message to a conversation' })
  @ApiResponse({ status: 200, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async sendMessage(@Body() dto: SendMessageDto) {
    return this.chatService.createMessage(dto);
  }
  
  @Delete('conversations/:conversationId/participants/:userId')
@ApiOperation({ summary: 'Remove a participant from a conversation' })
@ApiResponse({ status: 200, description: 'Participant removed successfully' })
@ApiResponse({ status: 403, description: 'Unauthorized to remove participant' })
async removeParticipant(
  @Param('conversationId') conversationId: string,
  @Param('userId') userId: string,
  @Query('removedBy') removedBy: string,
) {
  return this.chatService.removeParticipant(parseInt(conversationId), parseInt(userId), parseInt(removedBy));
}
}