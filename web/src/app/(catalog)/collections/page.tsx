import { Metadata } from 'next';
import { FC } from 'react';

import { CreateFolder } from '@/components/create-folder';
import { FoldersList } from '@/components/folders-list';
import { FoldersService } from '@/services/folders.service';

export const metadata: Metadata = {
  title: 'Collections',
};

const Page: FC = async ({}) => {
  const folders = await FoldersService.getAll();
  return (
    <div className='space-y-4 py-4'>
      <div className='px-2'>
        <h1 className='text-2xl font-bold md:text-3xl'>Collections</h1>
        <p className='text-base text-muted-foreground sm:text-lg'>
          All of your available collections
        </p>
      </div>

      <FoldersList folders={folders} />
      <CreateFolder />
    </div>
  );
};

export default Page;
