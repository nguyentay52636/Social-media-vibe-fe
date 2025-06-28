import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceCustom } from 'src/jwt/jwt.service';
import { UserRegisterDto } from './dto/UserRegister.dto';
import { UserLoginDto } from './dto/UserLogin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()   
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly jwtCustom: JwtServiceCustom,
    ) {}

    async register(userDto: UserRegisterDto) {
        const { email, username, full_name, password } = userDto;

        // Check if user already exists
        const existingUser = await this.prisma.users.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            throw new BadRequestException('Email or username already exists');
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = await this.prisma.users.create({
            data: {
                email,
                username,
                full_name,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const payload = { sub: user.id, username: user.username };
        const accessToken = await this.jwt.signAsync(payload);

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                full_name: user.full_name,
            },
            accessToken,
        };
    }

    async login(loginDto: UserLoginDto) {
        const { username, password } = loginDto;

        // Find user by email
        const user = await this.prisma.users.findUnique({
            where: { username },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const payload = { sub: user.id, username: user.username };
        const accessToken = await this.jwt.signAsync(payload);

        return {
            user: {
                id: user.id,
                email: user.email,
                password: user.password,
                username: user.username,
                full_name: user.full_name,
            },
            accessToken,
        };
    }
}