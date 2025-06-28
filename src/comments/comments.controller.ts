import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comments.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Comment created successfully with full user and post information.',
    type: CommentResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Post, User, or Parent Comment not found.' })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get all comments for a post with full user and post information' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of comments with complete user and post details.',
    type: [CommentResponseDto] 
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findAll(postId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments with full user and post information' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all comments with complete user and post details.',
    type: [CommentResponseDto] 
  })
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID with full user and post information' })
  @ApiResponse({ 
    status: 200, 
    description: 'Comment details with complete user and post information.',
    type: CommentResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Comment updated successfully with full user and post information.',
    type: CommentResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.remove(id);
  }
}