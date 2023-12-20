import { IPaginationArg } from '@/types/common.types';

export type IGetAllComicsQuery = IPaginationArg & {
  title?: string;
};
