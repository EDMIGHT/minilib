import { IComic } from '@/types/comics';

export type IResponseComicCatalog = {
  comics: IComic[];
  currentPage: number;
  totalPages: number;
};
