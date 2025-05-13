import { Controller, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ReviewModule } from './review/review.module';
import { LocationModule } from './location/location.module';
import { IncidentModule } from './incident/incident.module';
import { RentalModule } from './rental/rental.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { VehicleAvailabilityModule } from './vehicle-availability/vehicle-availability.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    IncidentModule, 
    RentalModule, 
    PaymentModule, 
    NotificationModule, 
    CloudinaryModule, 
    VehicleModule, 
    ReviewModule, 
    LocationModule, VehicleAvailabilityModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
