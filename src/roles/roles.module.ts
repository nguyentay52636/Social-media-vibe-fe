import { Module } from '@nestjs/common';
import { PrismaService } from 'src/resources/prisma/prisma.service';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService, PrismaService]
})
export class RolesModule {}
