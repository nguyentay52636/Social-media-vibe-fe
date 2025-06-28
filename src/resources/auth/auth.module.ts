import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModuleCustom } from 'src/jwt/jwt.module';

@Module({
  imports: [HttpModule, PrismaModule, JwtModuleCustom],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
