import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentsService } from '../comments.service';
import { CreateCommentDto } from '../dto/create-comments.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class CommentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('CommentsGateway');

  constructor(private readonly commentsService: CommentsService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createComment')
  async handleCreateComment(client: Socket, payload: CreateCommentDto) {
    try {
      const comment = await this.commentsService.create(payload);
      this.server.to(`post_${payload.post_id}`).emit('newComment', comment);
      return comment;
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('getComments')
  async handleGetComments(client: Socket, postId: number) {
    try {
      const comments = await this.commentsService.findAll(postId);
      client.emit('comments', comments);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('updateComment')
  async handleUpdateComment(client: Socket, payload: { id: number; data: UpdateCommentDto }) {
    try {
      const comment = await this.commentsService.update(payload.id, payload.data);
      this.server.to(`post_${comment.post_id}`).emit('updatedComment', comment);
      return comment;
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(client: Socket, payload: { id: number; postId: number }) {
    try {
      await this.commentsService.remove(payload.id);
      this.server.to(`post_${payload.postId}`).emit('deletedComment', { id: payload.id });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('joinPost')
  handleJoinPost(client: Socket, postId: number) {
    client.join(`post_${postId}`);
    this.logger.log(`Client ${client.id} joined post_${postId}`);
  }

  @SubscribeMessage('leavePost')
  handleLeavePost(client: Socket, postId: number) {
    client.leave(`post_${postId}`);
    this.logger.log(`Client ${client.id} left post_${postId}`);
  }
}