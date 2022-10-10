import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Car, Prisma } from '@prisma/client';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async car(
    carWhereUniqueInput: Prisma.CarWhereUniqueInput,
  ): Promise<Car | null> {
    return this.prisma.car.findUnique({
      where: carWhereUniqueInput,
    });
  }

  async cars(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CarWhereUniqueInput;
    where?: Prisma.CarWhereInput;
    orderBy?: Prisma.CarOrderByWithRelationInput;
  }): Promise<Car[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.car.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCar(data: Prisma.CarCreateInput): Promise<Car> {
    const existing = await this.cars({
      where: {
        AND: [
          { model: { equals: data.model } },
          { brand: { equals: data.brand } },
        ],
      },
    });

    if (existing.length) {
      throw new HttpException('Car already exists', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.car.create({
      data,
    });
  }

  async updateCar(params: {
    where: Prisma.CarWhereUniqueInput;
    data: Prisma.CarUpdateInput;
  }): Promise<Car> {
    const { where, data } = params;
    return this.prisma.car.update({
      data,
      where,
    });
  }

  async deleteCar(where: Prisma.CarWhereUniqueInput): Promise<Car> {
    return this.prisma.car.delete({
      where,
    });
  }
}
