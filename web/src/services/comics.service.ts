import { ICommonComicSchema } from '@/lib/validations/comic.validations';
import { api } from '@/services/api';
import { IComic, IComicWithHisFolders } from '@/types/comics';
import { IPagination } from '@/types/request';
import { IResponseComicCatalog } from '@/types/response';

export class ComicsService {
  public static async getAll({ page = 1, limit = 12 }: IPagination) {
    const { data } = await api.get<IResponseComicCatalog>(
      `/comics?page=${page}&limit=${limit}`
    );
    return data;
  }
  public static async get(id: string) {
    const { data } = await api.get<IComicWithHisFolders>(`/comics/${id}`);
    return data;
  }
  public static async create(payload: ICommonComicSchema) {
    const { data } = await api.post<IComic>('/comics', payload);
    return data;
  }
  public static async update(id: string, payload: ICommonComicSchema) {
    const { data } = await api.patch<IComic>(`/comics/${id}`, payload);
    return data;
  }
  public static async updateRating(id: string, rating: number) {
    const { data } = await api.patch<IComic>(`/comics/rating/${id}`, {
      rating,
    });
    return data;
  }
  public static async delete(id: string) {
    const { data } = await api.delete<null>(`/comics/${id}`);
    return data;
  }
}
