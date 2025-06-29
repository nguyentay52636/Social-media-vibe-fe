
// import {
//     Injectable,
//     CanActivate,
//     ExecutionContext,
//     UnauthorizedException,
//     ForbiddenException,
//   } from '@nestjs/common';
//   import { Observable } from 'rxjs';
//   import { PrismaService } from '../prisma/prisma.service';
//   import { JwtService } from '@nestjs/jwt';
//   import { Request as RequestExpress } from 'express';
//   import { IDecodedAccecssTokenType } from '../interfaces/interfaces.global';
// import { users } from 'generated/prisma';

  
//   interface RequestNewType extends RequestExpress {
//     decodedAccessToken?: IDecodedAccecssTokenType;
//     userData?: users;
//   }
//   @Injectable()
//   export class JwtTokenVerifyGuard implements CanActivate {
//     constructor(
//       private readonly prismaService: PrismaService,
//       private readonly jwt: JwtService,
//     ) {}
  
//     canActivate(
//       context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {
//       const request = context.switchToHttp().getRequest() as RequestNewType;
  
//       const accessToken = this.extractToken(request);
  
//       if (!accessToken) {
//         throw new UnauthorizedException('Access token is missing');
//       }
  
//       let decodedAccessToken: IDecodedAccecssTokenType;
//       try {
//         decodedAccessToken = this.jwt.verify(accessToken);
//         decodedAccessToken.originalToken = accessToken;
//         request.decodedAccessToken = decodedAccessToken;
//       } catch (error) {
//         throw new UnauthorizedException('Invalid access token');
//       }
  
//       return this.validateTokenKeyMatch({
//         accessToken,
//         decodedAccessToken,
//         request,
//       });
//     }
  
//     private extractToken(request: RequestNewType): string | null {
//       const token = request.headers['accesstoken'] as string;
//       return token ? token.replace('Bearer ', '') : null;
//     }
  
//     private async validateTokenKeyMatch({
//       accessToken,
//       decodedAccessToken,
//       request,
//     }: {
//       decodedAccessToken: IDecodedAccecssTokenType;
//       accessToken: string;
//       request: RequestNewType;
//     }): Promise<boolean> {
//       if (!decodedAccessToken.userId || !decodedAccessToken.username)
//         throw new UnauthorizedException(
//           'Invalid access token or has been modified',
//         );
  
//       const [user, userSession] = await Promise.all([
//         this.prismaService.user.findUnique({
//           where: {
//             id: decodedAccessToken.userId,
//             username: decodedAccessToken.username,
//           },
//         }),
//         this.prismaService.userSession.findFirst({
//           where: { token: accessToken },
//         }),
//       ]);
  
//       if (!userSession) {
//         throw new UnauthorizedException('Invalid login session');
//       }
  
//       if (!user || !user.refreshToken) {
//         throw new UnauthorizedException('User not found or has been deleted');
//       }
//       if (user.isBanned) throw new ForbiddenException('User has been banned');
  
//       request.userData = user
//       return true;
//     }
//   }
  