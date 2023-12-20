import { IAuthor } from '@/types/author';
import { IFolder } from '@/types/folders';
import { IGenre } from '@/types/genres';

export type IComic = {
  id: string;
  title: string;
  desc: string;
  edition: string | null;
  img: string;
  year: number;
  rating: number | null;
};

export type IComicWithAttributes = IComic & {
  genres: IGenre[];
  authors: IAuthor[];
};

export type IShortComic = Pick<IComic, 'id' | 'title' | 'img'>;

export type IComicWithHisFolders = IComicWithAttributes & {
  folders: IFolder[];
};
