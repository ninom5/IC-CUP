import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ReviewModule } from './review/review.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    VehicleModule,
    ReviewModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
