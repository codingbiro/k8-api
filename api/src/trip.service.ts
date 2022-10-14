import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Trip, Prisma } from '@prisma/client';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async trip(
    tripWhereUniqueInput: Prisma.TripWhereUniqueInput,
  ): Promise<Trip | null> {
    return this.prisma.trip.findUnique({
      where: tripWhereUniqueInput,
    });
  }

  async trips(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TripWhereUniqueInput;
    where?: Prisma.TripWhereInput;
    orderBy?: Prisma.TripOrderByWithRelationInput;
  }): Promise<Trip[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.trip.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTrip(data: Prisma.TripCreateInput): Promise<Trip> {
    const existing = await this.trips({
      where: {
        AND: [
          { carId: { equals: data.car.connect.id } },
          { route: { equals: data.route } },
          { startPercentage: { equals: Number(data.startPercentage) } },
          { endPercentage: { equals: Number(data.endPercentage) } },
          { noOfPeople: { equals: Number(data.noOfPeople) } },
          { comment: { equals: data.comment } },
          { hidden: { equals: false } },
        ],
      },
    });

    if (existing.length) {
      throw new HttpException('Trip already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.trip.create({
      data,
    });
  }

  async updateTrip(params: {
    where: Prisma.TripWhereUniqueInput;
    data: Prisma.TripUpdateInput;
  }): Promise<Trip> {
    const { where, data } = params;

    return this.prisma.trip.update({
      data,
      where,
    });
  }

  async deleteTrip(where: Prisma.TripWhereUniqueInput): Promise<Trip> {
    return this.prisma.trip.delete({
      where,
    });
  }
}
