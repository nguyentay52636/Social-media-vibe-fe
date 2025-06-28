import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
constructor(readonly prisma: PrismaService,readonly jwt:JwtService) {}
}
