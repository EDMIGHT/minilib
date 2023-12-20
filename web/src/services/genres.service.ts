import { api } from '@/services/api';
import { IGenre } from '@/types/genres';

export class GenresService {
  public static async getAll() {
    const { data } = await api.get<IGenre[]>(`/comics/genres`);
    return data;
  }
}
