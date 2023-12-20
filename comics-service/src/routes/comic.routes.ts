import express from 'express';

import {
  createComic,
  deleteComic,
  getComic,
  getComics,
  updateComic,
} from '@/controllers/comic.controllers';
import { createComicValidation } from '@/lib/validations/comic.validations';
import { validation } from '@/middleware/validation.middleware';

const router = express.Router({ mergeParams: true });

router.get('/', getComics);
router.get('/:id', getComic);

router.post('/', createComicValidation, validation, createComic);

router.patch('/:id', updateComic);

router.delete('/:id', deleteComic);

export default router;
