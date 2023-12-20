import { api } from '@/services/api';
import { IAuthor } from '@/types/author';

export class AuthorsService {
  public static async getAll() {
    const { data } = await api.get<IAuthor[]>(`/comics/authors`);
    return data;
  }
}
