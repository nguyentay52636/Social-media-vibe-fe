import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/resources/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prisma.users.create({
      data: createUserDto,
      include: {
        roles: true,
        privacy_settings: true,
        notifications_settings: true,
      },
    });
    return this.mapToUserDto(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.users.findMany({
      include: {
        roles: true,
        privacy_settings: true,
        notifications_settings: true,
      },
    });
    return users.map(this.mapToUserDto);
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: {
        roles: true,
        privacy_settings: true,
        notifications_settings: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapToUserDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
      include: {
        roles: true,
        privacy_settings: true,
        notifications_settings: true,
      },
    });
    return this.mapToUserDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.prisma.users.delete({ where: { id } });
  }

  private mapToUserDto(user: any): UserDto {
    return {
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      password: user.password,
      role_id: user.role_id,
      avatar: user.avatar,
      cover_photo: user.cover_photo,
      bio: user.bio,
      location: user.location,
      workplace: user.workplace,
      education: user.education,
      birth_date: user.birth_date,
      gender: user.gender,
      relationship_status: user.relationship_status,
      is_online: user.is_online,
      interests: user.interests,
      last_seen: user.last_seen,
      website: user.website,
      join_date: user.join_date,
      created_at: user.created_at,
      updated_at: user.updated_at,
      is_active: user.is_active,
      email_verified_at: user.email_verified_at,
      roles: user.roles ? {
        id: user.roles.id,
        name: user.roles.name,
        description: user.roles.description,
        created_at: user.roles.created_at,
      } : undefined,
      privacy_settings: user.privacy_settings ? {
        ...user.privacy_settings
      } : undefined,
      notifications_settings: user.notifications_settings ? {
        ...user.notifications_settings
      } : undefined,
    };
  }
}