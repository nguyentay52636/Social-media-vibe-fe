import { IsString, IsOptional, IsEmail,IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterDto { 
    @ApiProperty({ default: '' })
    @IsEmail()
    @IsNotEmpty()
    email?: string;
    @ApiProperty({ default: '' })
    @IsString()
    @IsNotEmpty()
    username?: string;
    @ApiProperty({ default: '' })
    @IsString()
    @IsNotEmpty()
    full_name?: string;
    @ApiProperty({ default: '' })
    @IsString()
    @IsNotEmpty()
    password?: string;

} 