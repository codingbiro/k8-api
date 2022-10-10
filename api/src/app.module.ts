import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarService } from './car.service';
import { PrismaService } from './prisma.service';
import { TripService } from './trip.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CarService, PrismaService, TripService],
})
export class AppModule {}
