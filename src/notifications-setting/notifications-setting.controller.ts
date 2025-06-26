import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { CreateNotificationsSettingsDto } from './dto/create-notifications-settings.dto';
import { UpdateNotificationsSettingsDto } from './dto/update-notifications-settings.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { NotificationsSettingsDto } from './dto/notifications-setting.dto';
import { NotificationsSettingsService } from './notifications-setting.service';

@ApiTags('notifications-settings')
@Controller('notifications-settings')
export class NotificationsSettingsController {
  constructor(private readonly notificationsSettingsService: NotificationsSettingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create notifications settings' })
  @ApiResponse({ status: 201, description: 'Settings created successfully', type: NotificationsSettingsDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createNotificationsSettingsDto: CreateNotificationsSettingsDto): Promise<NotificationsSettingsDto> {
    return this.notificationsSettingsService.create(createNotificationsSettingsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications settings' })
  @ApiResponse({ status: 200, description: 'List of all notifications settings', type: [NotificationsSettingsDto] })
  async findAll(): Promise<NotificationsSettingsDto[]> {
    return this.notificationsSettingsService.findAll();
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'Get notifications settings by user ID' })
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Settings found', type: NotificationsSettingsDto })
  @ApiResponse({ status: 404, description: 'Settings not found' })
  async findOne(@Param('user_id', ParseIntPipe) user_id: number): Promise<NotificationsSettingsDto> {
    return this.notificationsSettingsService.findOne(user_id);
  }

  @Patch(':user_id')
  @ApiOperation({ summary: 'Update notifications settings by user ID' })
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Settings updated successfully', type: NotificationsSettingsDto })
  @ApiResponse({ status: 404, description: 'Settings not found' })
  async update(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() updateNotificationsSettingsDto: UpdateNotificationsSettingsDto,
  ): Promise<NotificationsSettingsDto> {
    return this.notificationsSettingsService.update(user_id, updateNotificationsSettingsDto);
  }

  @Delete(':user_id')
  @ApiOperation({ summary: 'Delete notifications settings by user ID' })
  @ApiParam({ name: 'user_id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Settings deleted successfully' })
  @ApiResponse({ status: 404, description: 'Settings not found' })
  async remove(@Param('user_id', ParseIntPipe) user_id: number): Promise<void> {
    return this.notificationsSettingsService.remove(user_id);
  }
}