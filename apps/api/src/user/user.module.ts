import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,

      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
