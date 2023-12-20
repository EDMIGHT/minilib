import { notFound } from 'next/navigation';
import { FC } from 'react';

import { ComicsList } from '@/components/comics-list';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { FoldersService } from '@/services/folders.service';

type PageProps = {
  params: {
    id: string;
  };
};

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const folder = await FoldersService.get(id);

  if (!folder) {
    return notFound();
  }

  const { id: folderId, title, comics } = folder;

  return (
    <div className='space-y-4'>
      <Breadcrumbs
        segments={[
          {
            title: 'Collections',
            href: '/collections',
          },
          {
            title,
            href: `/folders/${folderId}`,
          },
        ]}
      />
      <h1 className='px-2 text-2xl font-bold md:text-3xl'>Collection &quot;{title}&quot;</h1>
      <ComicsList comics={comics} />
    </div>
  );
};

export default Page;
