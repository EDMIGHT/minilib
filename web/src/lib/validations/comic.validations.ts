'use client';

import * as z from 'zod';

export const commonComicSchema = z.object({
  title: z
    .string()
    .min(2, 'title must be more than 2 characters')
    .max(190, 'title must be no more than 190 characters'),
  edition: z
    .string()
    .min(2, 'edition must be more than 2 characters')
    .max(190, 'edition must be no more than 190 characters'),
  desc: z
    .string()
    .min(2, 'description must be more than 2 characters')
    .max(190, 'description must be no more than 190 characters'),
  year: z.number().min(1900, 'must not be older than 1900').max(2024, 'the year is incorrect'),
  issueNumber: z.number().min(0, 'issue number must be positive').optional(),
  rating: z
    .number()
    .min(0, 'the rating cannot be less than 0')
    .max(10, 'the rating cannot be more than 10')
    .optional(),
  genres: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one genre',
  }),
  authors: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one author',
  }),
});

export type ICommonComicSchema = z.infer<typeof commonComicSchema>;
