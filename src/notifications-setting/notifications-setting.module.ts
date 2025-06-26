import { Module } from '@nestjs/common';
import { NotificationsSettingsService } from './notifications-setting.service';
import { NotificationsSettingsController } from './notifications-setting.controller';
import { PrismaModule } from '../resources/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsSettingsController],
  providers: [NotificationsSettingsService],
})
export class NotificationsSettingModule {}