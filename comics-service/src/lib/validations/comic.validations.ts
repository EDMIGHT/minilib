import { body } from 'express-validator';

export const createComicValidation = [
  body('title')
    .isString()
    .withMessage('title must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('the minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('the maximum title length is 190 characters'),
  body('desc')
    .isString()
    .withMessage('title must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('the minimum title length is 2 characters')
    .isLength({ max: 190 })
    .withMessage('the maximum title length is 190 characters'),
  body('year').isNumeric().withMessage('year must be a number'),
  body('issueNumber').isNumeric().withMessage('issueNumber must be a number').optional(),
  body('rating').isNumeric().withMessage('rating must be a number').optional(),
];
