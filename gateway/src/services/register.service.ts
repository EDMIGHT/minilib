import { Service } from '@prisma/client';

import prisma from '@/db/prisma';

type ICommonService = Pick<Service, 'name' | 'host' | 'desc'>;

export class RegisterService {
  public static async get(name: Service['name']): Promise<Service | null> {
    return prisma.service.findFirst({
      where: {
        name,
      },
    });
  }
  public static async getAll(): Promise<Service[]> {
    return prisma.service.findMany({
      orderBy: {
        name: 'desc',
      },
    });
  }
  public static async create(data: ICommonService): Promise<Service> {
    return prisma.service.create({
      data,
    });
  }
  public static async update(name: Service['name'], data: ICommonService): Promise<Service> {
    return prisma.service.update({
      where: {
        name,
      },
      data,
    });
  }
}
