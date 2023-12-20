import { Comic, Folder } from '@prisma/client';

import prisma from '@/db/prisma';

type IFolderWithComics = Folder & {
  comics: Comic[];
};
type IAllFolderWithComics = Folder & {
  comics: Pick<Comic, 'id' | 'title' | 'img'>[];
};
type IUpdateFolderContentArg = {
  id: string;
  prevComics: { id: string }[];
  newComics: { id: string }[];
};

export class FolderService {
  public static async get(id: string): Promise<IFolderWithComics | null> {
    return prisma.folder.findFirst({
      where: {
        id,
      },
      include: {
        comics: {
          include: {
            genres: true,
            authors: true,
          },
        },
      },
    });
  }
  public static async getWithComics(id: string): Promise<IFolderWithComics | null> {
    return prisma.folder.findFirst({
      where: {
        id,
      },
      include: {
        comics: true,
      },
    });
  }
  public static async getAll(): Promise<IAllFolderWithComics[]> {
    return prisma.folder.findMany({
      orderBy: {
        title: 'desc',
      },
      include: {
        comics: {
          select: {
            id: true,
            title: true,
            img: true,
          },
        },
      },
    });
  }
  public static async create(data: Pick<Folder, 'title'>): Promise<Folder> {
    return prisma.folder.create({
      data,
    });
  }
  public static async updateContent({
    id,
    newComics,
    prevComics,
  }: IUpdateFolderContentArg): Promise<Folder> {
    return prisma.folder.update({
      where: {
        id,
      },
      data: {
        comics: {
          disconnect: prevComics,
          connect: newComics,
        },
      },
    });
  }
  public static async delete(id: Folder['id']): Promise<Folder> {
    return prisma.folder.delete({
      where: {
        id,
      },
    });
  }
}
