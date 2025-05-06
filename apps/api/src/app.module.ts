import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IncidentModule } from './incident/incident.module';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [UserModule, AuthModule, IncidentModule, RentalModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
