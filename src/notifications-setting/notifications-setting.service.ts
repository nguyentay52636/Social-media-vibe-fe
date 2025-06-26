import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/resources/prisma/prisma.service';
import { CreateNotificationsSettingsDto } from './dto/create-notifications-settings.dto';
import { UpdateNotificationsSettingsDto } from './dto/update-notifications-settings.dto';
import { NotificationsSettingsDto } from './dto/notifications-setting.dto';

@Injectable()
export class NotificationsSettingsService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationsSettingsDto: CreateNotificationsSettingsDto): Promise<NotificationsSettingsDto> {
    const settings = await this.prisma.notifications_settings.create({
      data: createNotificationsSettingsDto,
      include: { users: true },
    });
    return this.mapToNotificationsSettingsDto(settings);
  }

  async findAll(): Promise<NotificationsSettingsDto[]> {
    const settings = await this.prisma.notifications_settings.findMany({
      include: { users: true },
    });
    return settings.map(this.mapToNotificationsSettingsDto);
  }

  async findOne(user_id: number): Promise<NotificationsSettingsDto> {
    const settings = await this.prisma.notifications_settings.findUnique({
      where: { user_id },
      include: { users: true },
    });
    if (!settings) {
      throw new NotFoundException(`Notifications settings for user ID ${user_id} not found`);
    }
    return this.mapToNotificationsSettingsDto(settings);
  }

  async update(user_id: number, updateNotificationsSettingsDto: UpdateNotificationsSettingsDto): Promise<NotificationsSettingsDto> {
    const settings = await this.prisma.notifications_settings.findUnique({ where: { user_id } });
    if (!settings) {
      throw new NotFoundException(`Notifications settings for user ID ${user_id} not found`);
    }
    const updatedSettings = await this.prisma.notifications_settings.update({
      where: { user_id },
      data: updateNotificationsSettingsDto,
      include: { users: true },
    });
    return this.mapToNotificationsSettingsDto(updatedSettings);
  }

  async remove(user_id: number): Promise<void> {
    const settings = await this.prisma.notifications_settings.findUnique({ where: { user_id } });
    if (!settings) {
      throw new NotFoundException(`Notifications settings for user ID ${user_id} not found`);
    }
    await this.prisma.notifications_settings.delete({ where: { user_id } });
  }

  private mapToNotificationsSettingsDto(settings: any): NotificationsSettingsDto {
    return {
      user_id: settings.user_id,
      likes: settings.likes,
      comments: settings.comments,
      messages: settings.messages,
      friend_requests: settings.friend_requests,
      events: settings.events,
      users: {
        id: settings.users.id,
        full_name: settings.users.full_name,
        username: settings.users.username,
        email: settings.users.email,
        last_seen: settings.users.last_seen,
        join_date: settings.users.join_date,
        created_at: settings.users.created_at,
        updated_at: settings.users.updated_at,
        email_verified_at: settings.users.email_verified_at,
      },
    };
  }
}