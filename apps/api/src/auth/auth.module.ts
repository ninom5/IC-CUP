import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
