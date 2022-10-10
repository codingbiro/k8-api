import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Car, Trip } from '@prisma/client';
import { AppService } from './app.service';
import { CarService } from './car.service';
import { TripService } from './trip.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly carService: CarService,
    private readonly tripService: TripService,
  ) {}

  @Get('trip/:id')
  async getTripById(@Param('id') id: string): Promise<Trip> {
    return this.tripService.trip({ id: Number(id) });
  }

  @Get('trips')
  async getTrips(): Promise<Trip[]> {
    return this.tripService.trips({
      where: { hidden: false },
    });
  }

  @Get('trips/:searchString')
  async getFilteredTrips(
    @Param('searchString') searchString: string,
  ): Promise<Trip[]> {
    return this.tripService.trips({
      where: {
        OR: [
          {
            route: { contains: searchString },
          },
          {
            comment: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('trip')
  async createTrip(
    @Body()
    data: {
      carId: string;
      route: string;
      startPercentage: string;
      endPercentage: string;
      noOfPeople: string;
      comment: string;
    },
  ): Promise<Trip> {
    return this.tripService.createTrip({
      route: data.route,
      startPercentage: Number(data.startPercentage),
      endPercentage: Number(data.endPercentage),
      noOfPeople: Number(data.noOfPeople),
      comment: data.comment,
      car: {
        connect: { id: Number(data.carId) },
      },
    });
  }

  @Put('trip/:id/hide')
  async hideTrip(@Param('id') id: string): Promise<Trip> {
    return this.tripService.updateTrip({
      where: { id: Number(id) },
      data: { hidden: true },
    });
  }

  @Get('cars')
  async getCars(): Promise<Car[]> {
    return this.carService.cars({});
  }

  @Post('car')
  async createCar(
    @Body() data: { model: string; brand: string },
  ): Promise<Car> {
    return this.carService.createCar(data);
  }

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
