import { Request, Response } from 'express';

import { CustomResponse } from '@/lib/custom-response';
import { serverErrorResponse } from '@/lib/server-error-response';
import { AuthorService } from '@/services/author.service';
import { ComicService } from '@/services/comic.service';
import { GenreService } from '@/services/genre.service';
import { IGetAllComicsQuery } from '@/types/comic.types';

export const getComics = async (req: Request, res: Response): Promise<Response> => {
  const { title = '', page = 1, limit = 9 } = req.query as unknown as IGetAllComicsQuery;

  try {
    const comics = await ComicService.getAll({
      title,
      page: Number(page),
      limit: Number(limit),
    });

    const totalComics = await ComicService.getAllCount({
      title,
    });

    return CustomResponse.ok(res, {
      comics,
      currentPage: Number(page),
      totalPages: Math.ceil(totalComics / Number(limit)),
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while fetching comics on server side',
      error,
    });
  }
};

export const getComic = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicService.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: `comic with id = ${id} does not exist`,
      });
    }

    return CustomResponse.ok(res, existedComic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching comic with id = ${id}`,
      error,
    });
  }
};

export const getGenres = async (_: Request, res: Response): Promise<Response> => {
  try {
    const genres = await GenreService.getAll();

    return CustomResponse.ok(res, genres);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching genres`,
      error,
    });
  }
};

export const getAuthors = async (_: Request, res: Response): Promise<Response> => {
  try {
    const authors = await AuthorService.getAll();

    return CustomResponse.ok(res, authors);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching authors`,
      error,
    });
  }
};

export const createComic = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newComic = await ComicService.create(req.body);

    return CustomResponse.created(res, newComic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error when creating a comic on the server side',
      error,
    });
  }
};

export const updateComic = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicService.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: `comic with id = ${id} does not exist`,
      });
    }

    const updatedComic = await ComicService.update(
      id,
      req.body,
      existedComic.genres,
      existedComic.authors
    );

    return CustomResponse.created(res, updatedComic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error when creating a comic on the server side',
      error,
    });
  }
};

export const updateComicRating = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicService.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: `comic with id = ${id} does not exist`,
      });
    }

    let updatedComic;
    if (existedComic.rating === req.body.rating) {
      updatedComic = await ComicService.updateRating(id, null);
    } else {
      updatedComic = await ComicService.updateRating(id, req.body.rating);
    }

    return CustomResponse.created(res, updatedComic);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error when creating a comic on the server side',
      error,
    });
  }
};

export const deleteComic = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const existedComic = await ComicService.get(id);

    if (!existedComic) {
      return CustomResponse.notFound(res, {
        message: `comic with id = ${id} does not exist`,
      });
    }

    await ComicService.delete(id);

    return CustomResponse.ok(res, null);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when trying to rate a comic`,
      error,
    });
  }
};
