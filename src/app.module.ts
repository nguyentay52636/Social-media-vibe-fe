import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './resources/prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { PrivacySettingsService } from './privacy-settings/privacy-settings.service';
import { PrivacySettingsModule } from './privacy-settings/privacy-settings.module';
import { UserModule } from './user/user.module';
import { NotificationsSettingModule } from './notifications-setting/notifications-setting.module';
import { ModuleService } from './controller/module/module.service';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [PrismaModule, RolesModule, PrivacySettingsModule, UserModule, NotificationsSettingModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, PrivacySettingsService, ModuleService, JwtService],
})
export class AppModule {}
