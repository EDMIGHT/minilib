import { notFound } from 'next/navigation';
import { FC } from 'react';

import { EditComicForm } from '@/components/forms/edit-comic-form';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    id: string;
  };
};

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const comic = await ComicsService.get(id);

  if (!comic) {
    return notFound();
  }

  const { id: comicId, title } = comic;

  return (
    <div className='space-y-4'>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title,
            href: `/${comicId}`,
          },
          {
            title: 'edit',
            href: `/${comicId}/edit`,
          },
        ]}
      />
      <EditComicForm {...comic} />
    </div>
  );
};

export default Page;
