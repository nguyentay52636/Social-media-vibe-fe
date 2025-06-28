import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './resources/prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { PrivacySettingsService } from './privacy-settings/privacy-settings.service';
import { PrivacySettingsModule } from './privacy-settings/privacy-settings.module';
import { UserModule } from './user/user.module';
import { NotificationsSettingModule } from './notifications-setting/notifications-setting.module';
import { ModuleService } from './controller/module/module.service';
import { JwtServiceCustom } from './jwt/jwt.service';
import { JwtModuleCustom } from './jwt/jwt.module';
import { AuthModule } from './resources/auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, RolesModule, PrivacySettingsModule, UserModule, NotificationsSettingModule, JwtModuleCustom, AuthModule, CommentsModule,CommentsModule],
  controllers: [AppController],
  providers: [AppService, PrivacySettingsService, ModuleService, JwtServiceCustom],
})
export class AppModule {}
