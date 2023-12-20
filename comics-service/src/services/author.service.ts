import { Author } from '@prisma/client';

import prisma from '@/db/prisma';

export class AuthorService {
  public static getAll(): Promise<Author[]> {
    return prisma.author.findMany();
  }
  public static create(data: Pick<Author, 'name'>): Promise<Author> {
    return prisma.genre.create({
      data,
    });
  }
}
