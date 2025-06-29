import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/resources/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comments.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  private readonly USER_SELECT = {
    id: true,
    username: true,
    email: true,
    full_name: true,
    avatar: true,
    bio: true,
    created_at: true,
    updated_at: true,
  };

  private readonly USER_SELECT_SIMPLE = {
    id: true,
    username: true,
    full_name: true,
    avatar: true,
  };

  private readonly USER_SELECT_COMMENT = {
    id: true,
    username: true,
    email: true,
    full_name: true,
    avatar: true,
    bio: true,
  };

  private readonly POST_SELECT = {
    id: true,
    content: true,
    user_id: true,
    feeling: true,
    location: true,
    tagged_users: true,
    created_at: true,
    updated_at: true,
    post_media: true,
    _count: {
      select: {
        comments: true,
        post_media: true,
        trending_posts: true,
      },
    },
    users: {
      select: this.USER_SELECT_SIMPLE,
    },
  };

  private readonly COMMENT_MEDIA_SELECT = true;

  private readonly NESTED_COMMENTS_INCLUDE = {
    users: {
      select: this.USER_SELECT_COMMENT,
    },
    comment_media: this.COMMENT_MEDIA_SELECT,
  };

  // Helper method to get the complete include pattern
  private getCommentInclude() {
    return {
      users: {
        select: this.USER_SELECT,
      },
      posts: {
        select: this.POST_SELECT,
      },
      comment_media: this.COMMENT_MEDIA_SELECT,
      comments: {
        include: this.NESTED_COMMENTS_INCLUDE,
      },
    };
  }

  async getAllComments() {
    return this.prisma.comments.findMany({
      include: this.getCommentInclude(),
    });
  }

  async create(createCommentDto: CreateCommentDto) {
    const post = await this.prisma.posts.findUnique({
      where: { id: createCommentDto.post_id },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${createCommentDto.post_id} not found`);
    }

    // Kiểm tra xem user_id có tồn tại
    const user = await this.prisma.users.findUnique({
      where: { id: createCommentDto.user_id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${createCommentDto.user_id} not found`);
    }

    // Kiểm tra parent_id nếu có
    if (createCommentDto.parent_id) {
      const parentComment = await this.prisma.comments.findUnique({
        where: { id: createCommentDto.parent_id },
      });
      if (!parentComment) {
        throw new NotFoundException(`Parent comment with ID ${createCommentDto.parent_id} not found`);
      }
    }

    return this.prisma.comments.create({
      data: {
        content: createCommentDto.content,
        post_id: createCommentDto.post_id,
        user_id: createCommentDto.user_id,
        parent_id: createCommentDto.parent_id,
        comment_media: {
          create: createCommentDto.comment_media?.map((media) => ({
            media_url: media.media_url,
            media_type: media.media_type,
          })),
        },
      },
      include: this.getCommentInclude(),
    });
  }

  async findAll(postId: number) {
    const post = await this.prisma.posts.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    return this.prisma.comments.findMany({
      where: { post_id: postId },
      include: this.getCommentInclude(),
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comments.findUnique({
      where: { id },
      include: this.getCommentInclude(),
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comments.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    await this.prisma.comment_media.deleteMany({ where: { comment_id: id } });

    return this.prisma.comments.update({
      where: { id },
      data: {
        content: updateCommentDto.content,
        comment_media: {
          create: updateCommentDto.comment_media?.map((media) => ({
            media_url: media.media_url,
            media_type: media.media_type,
          })),
        },
      },
      include: this.getCommentInclude(),
    });
  }

  async remove(id: number) {
    const comment = await this.prisma.comments.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Xóa các media liên quan trước
    await this.prisma.comment_media.deleteMany({ where: { comment_id: id } });
    // Xóa các comment con
    await this.prisma.comments.deleteMany({ where: { parent_id: id } });

    return this.prisma.comments.delete({ where: { id } });
  }
}