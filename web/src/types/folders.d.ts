import { IComic, IComicWithAttributes, IShortComic } from '@/types/comics';

export type IFolder = {
  id: string;
  title: string;
  updatedAt: string;
};

export type IFolderWithShortComics = IFolder & {
  comics: IShortComic[];
};

export type IFolderWithComics = IFolder & {
  comics: IComicWithAttributes[];
};
