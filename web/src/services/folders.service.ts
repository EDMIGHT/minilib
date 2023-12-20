import { ICommonFolderSchema } from '@/lib/validations/folder.validations';
import { api } from '@/services/api';
import { IComic } from '@/types/comics';
import { IFolder, IFolderWithComics, IFolderWithShortComics } from '@/types/folders';

export class FoldersService {
  public static async getAll() {
    const { data } = await api.get<IFolderWithShortComics[]>(`/folders`);
    return data;
  }
  public static async get(id: string) {
    const { data } = await api.get<IFolderWithComics>(`/folders/${id}`);
    return data;
  }
  public static async create(payload: ICommonFolderSchema) {
    const { data } = await api.post<IFolder>('/folders', payload);
    return data;
  }
  public static async updateExistingComicInFolder(
    folderId: IFolder['id'],
    comicId: IComic['id']
  ) {
    const { data } = await api.patch<IFolder>(`/folders/${folderId}/${comicId}`);
    return data;
  }
  public static async delete(id: string) {
    const { data } = await api.delete<null>(`/folders/${id}`);
    return data;
  }
}
