import { Request, Response } from 'express';

import { CustomResponse } from '@/lib/custom-response';
import { serverErrorResponse } from '@/lib/server-error-response';
import { FolderService } from '@/services/folder.service';

export const getFolders = async (_: Request, res: Response): Promise<Response> => {
  try {
    const folders = await FolderService.getAll();

    return CustomResponse.ok(res, folders);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while fetching folders on server side',
      error,
    });
  }
};

export const getFolder = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedFolder = await FolderService.get(id);

    if (!existedFolder) {
      return CustomResponse.notFound(res, {
        message: `folder with id = ${id} does not exist`,
      });
    }

    return CustomResponse.ok(res, existedFolder);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching folder with id = ${id}`,
      error,
    });
  }
};

export const createFolder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newFolder = await FolderService.create(req.body);

    return CustomResponse.created(res, newFolder);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error when creating a folder on the server side',
      error,
    });
  }
};

export const updateFolderContent = async (req: Request, res: Response): Promise<Response> => {
  const { folderId, comicId } = req.params;

  try {
    const existedFolder = await FolderService.get(folderId);

    if (!existedFolder) {
      return CustomResponse.notFound(res, {
        message: 'folder does not exist',
      });
    }

    let newFolderComics;

    if (existedFolder.comics.some((com) => com.id === comicId)) {
      newFolderComics = existedFolder.comics.filter((comic) => comic.id !== comicId);
    } else {
      newFolderComics = [...existedFolder.comics, { id: comicId }];
    }

    const updatedFolder = await FolderService.updateContent({
      id: folderId,
      prevComics: existedFolder.comics,
      newComics: newFolderComics,
    });

    return CustomResponse.ok(res, updatedFolder);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error changing folder`,
      error,
    });
  }
};

export const deleteFolder = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedFolder = await FolderService.get(id);

    if (!existedFolder) {
      return CustomResponse.notFound(res, {
        message: `folder with id = ${id} does not exist`,
      });
    }

    await FolderService.delete(id);

    return CustomResponse.ok(res, null);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when trying to delete a folder`,
      error,
    });
  }
};
