import { faker } from '@faker-js/faker';
import { Author, Comic, Genre } from '@prisma/client';

import prisma from '@/db/prisma';
import { IPaginationArg } from '@/types/common.types';

type IComicsArgs = {
  title?: Comic['title'];
};
type ComicProperties = Pick<Comic, 'title' | 'desc' | 'year' | 'edition' | 'rating'> & {
  genres: string[];
  authors: string[];
};

type IGetAllComicsArgs = IPaginationArg & IComicsArgs;

type IComicWithAttributes = Comic & {
  genres: Genre[];
  authors: Author[];
};

export class ComicService {
  public static async get(id: string): Promise<IComicWithAttributes | null> {
    return prisma.comic.findFirst({
      where: {
        id,
      },
      include: {
        folders: true,
        genres: true,
        authors: true,
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
      include: {
        genres: true,
        authors: true,
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
  public static async create({ genres, authors, ...data }: ComicProperties): Promise<Comic> {
    const authorsConnect = authors && authors.map((authorId) => ({ id: authorId }));
    const genresConnect = genres && genres.map((genreId) => ({ id: genreId }));

    return prisma.comic.create({
      data: {
        ...data,
        img: faker.image.urlPicsumPhotos(),
        authors: {
          connect: authorsConnect,
        },
        genres: {
          connect: genresConnect,
        },
      },
    });
  }
  public static async update(
    id: Comic['id'],
    { authors, genres, ...data }: ComicProperties,
    existedGenres: Genre[],
    existedAuthors: Author[]
  ): Promise<Comic> {
    const authorsConnect = authors && authors.map((authorId) => ({ id: authorId }));
    const genresConnect = genres && genres.map((genreId) => ({ id: genreId }));

    return prisma.comic.update({
      where: {
        id,
      },
      data: {
        ...data,
        authors: {
          disconnect: existedAuthors.map(({ id }) => ({ id })),
          connect: authorsConnect,
        },
        genres: {
          disconnect: existedGenres.map(({ id }) => ({ id })),
          connect: genresConnect,
        },
      },
    });
  }
  public static async updateRating(id: Comic['id'], rating: Comic['rating']): Promise<Comic> {
    return prisma.comic.update({
      where: {
        id,
      },
      data: {
        rating,
      },
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
