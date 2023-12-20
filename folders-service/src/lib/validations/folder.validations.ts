import { body } from 'express-validator';

export const createFolderValidations = [
  body('title')
    .isString()
    .withMessage('title must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('the minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('the maximum title length is 190 characters'),
];
