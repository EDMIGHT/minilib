import { Genre } from '@prisma/client';

import prisma from '@/db/prisma';

export class GenreService {
  public static getAll(): Promise<Genre[]> {
    return prisma.genre.findMany();
  }
}
