import { FC } from 'react';

import { CreateComicForm } from '@/components/forms/create-comic-form';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { AuthorsService } from '@/services/authors.service';
import { GenresService } from '@/services/genres.service';

const Page: FC = async ({}) => {
  const genres = await GenresService.getAll();
  const authors = await AuthorsService.getAll();

  return (
    <div className='space-y-4'>
      <Breadcrumbs
        segments={[
          {
            title: 'Home',
            href: '/',
          },
          {
            title: 'Create Comic',
            href: `/create-comic`,
          },
        ]}
      />
      <CreateComicForm authors={authors} genres={genres} />
    </div>
  );
};

export default Page;
