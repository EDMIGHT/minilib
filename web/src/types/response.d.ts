import { IComicWithAttributes } from '@/types/comics';

export type IResponseComicCatalog = {
  comics: IComicWithAttributes[];
  currentPage: number;
  totalPages: number;
};
