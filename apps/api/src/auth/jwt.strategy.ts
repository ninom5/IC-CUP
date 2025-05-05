import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  isSuspended: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) throw new ForbiddenException('User does not exist');

      return {
        id: user.id,
        role: user.role,
        email: user.email,
        isSuspended: user.isSuspended,
      };
    } catch (error) {
      throw new error() instanceof ForbiddenException
        ? error
        : new InternalServerErrorException(
            `Error getting user data from token: ${error}`,
          );
    }
  }
}
