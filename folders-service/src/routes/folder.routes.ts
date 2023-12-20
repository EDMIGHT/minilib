import express from 'express';

import {
  createFolder,
  deleteFolder,
  getFolder,
  getFolders,
  updateFolderContent,
} from '@/controllers/folder.controllers';
import { createFolderValidations } from '@/lib/validations/folder.validations';
import { validation } from '@/middleware/validation.middleware';

const router = express.Router({ mergeParams: true });

router.get('/', getFolders);
router.get('/:id', getFolder);

router.post('/', createFolderValidations, validation, createFolder);

router.patch('/:folderId/:comicId', updateFolderContent);

router.delete('/:id', deleteFolder);

export default router;
