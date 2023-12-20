import express from 'express';

import {
  createComic,
  deleteComic,
  getAuthors,
  getComic,
  getComics,
  getGenres,
  updateComic,
  updateComicRating,
} from '@/controllers/comic.controllers';
import { createComicValidation } from '@/lib/validations/comic.validations';
import { validation } from '@/middleware/validation.middleware';

const router = express.Router({ mergeParams: true });

router.get('/', getComics);
router.get('/genres', getGenres);
router.get('/authors', getAuthors);
router.get('/:id', getComic);

router.post('/', createComicValidation, validation, createComic);

router.patch('/:id', updateComic);
router.patch('/rating/:id', updateComicRating);

router.delete('/:id', deleteComic);

export default router;
