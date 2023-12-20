import { PlusIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

import { ComicsSection } from '@/components/comics-section';
import { ComicsService } from '@/services/comics.service';
import { IPagination } from '@/types/request';

type PageProps = {
  searchParams: IPagination;
};

export const metadata: Metadata = {
  title: 'Library',
};

export const Page: FC<PageProps> = async ({ searchParams: { page, limit } }) => {
  const catalog = await ComicsService.getAll({ page, limit });

  return (
    <div className='space-y-4 py-4'>
      <div className='flex items-center justify-between gap-2 px-2'>
        <div>
          <h1 className='text-2xl font-bold md:text-3xl'>Comic Library</h1>
          <p className='text-base text-muted-foreground sm:text-lg'>
            All available comics in the application
          </p>
        </div>
        <Link href='/create-comic' className='group'>
          <PlusIcon className='h-10 w-10  stroke-0 transition group-hover:brightness-50' />
        </Link>
      </div>
      <ComicsSection {...catalog} />
    </div>
  );
};

export default Page;
