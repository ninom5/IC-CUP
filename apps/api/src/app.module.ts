import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { LocationModule } from './location/location.module';
import { ReviewModule } from './review/review.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { CarModule } from './car/car.module';
import { LocationModule } from './location/location.module';
import { ReviewModule } from './review/review.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ReviewModule } from './review/review.module';
import { LocationModule } from './location/location.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [UserModule, AuthModule, CarModule, VehicleTypeModule, VehicleModule, ReviewModule, LocationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
