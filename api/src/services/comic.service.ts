import { faker } from '@faker-js/faker';
import { Comic } from '@prisma/client';

import prisma from '@/db/prisma';
import { IPaginationArg } from '@/types/common.types';

type IComicsArgs = {
  title?: Comic['title'];
};
type ComicProperties = Pick<
  Comic,
  'title' | 'desc' | 'year' | 'edition' | 'issueNumber' | 'rating'
>;

type IGetAllComicsArgs = IPaginationArg & IComicsArgs;

export class ComicService {
  public static async get(id: string): Promise<Comic | null> {
    return prisma.comic.findFirst({
      where: {
        id,
      },
    });
  }
  public static async getAll({ title, page, limit }: IGetAllComicsArgs): Promise<Comic[]> {
    const offset = (page - 1) * limit;

    return prisma.comic.findMany({
      skip: offset,
      take: limit,
      where: {
        title: {
          startsWith: title,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  public static async getAllCount({ title }: IComicsArgs): Promise<number> {
    return prisma.comic.count({
      where: {
        title: {
          startsWith: title,
        },
      },
    });
  }
  public static async create(data: ComicProperties): Promise<Comic> {
    return prisma.comic.create({
      data: {
        ...data,
        img: faker.image.urlPicsumPhotos(),
      },
    });
  }
  public static async update(id: Comic['id'], data: ComicProperties): Promise<Comic> {
    return prisma.comic.update({
      where: {
        id,
      },
      data,
    });
  }
  public static async delete(id: Comic['id']): Promise<Comic> {
    return prisma.comic.delete({
      where: {
        id,
      },
    });
  }
}
