import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/resources/prisma/prisma.service';
import { UserController } from './user.controller';


@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}