'use client';

import * as z from 'zod';

export const commonFolderSchema = z.object({
  title: z
    .string()
    .min(2, 'title must be more than 2 characters')
    .max(190, 'title must be no more than 190 characters'),
});

export type ICommonFolderSchema = z.infer<typeof commonFolderSchema>;
