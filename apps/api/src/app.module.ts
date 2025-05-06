import { Controller, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IncidentModule } from './incident/incident.module';
import { RentalModule } from './rental/rental.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [UserModule, AuthModule, IncidentModule, RentalModule, PaymentModule, NotificationModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
