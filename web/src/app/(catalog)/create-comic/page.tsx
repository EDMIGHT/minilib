import { FC } from 'react';

import { CreateComicForm } from '@/components/forms/create-comic-form';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

const Page: FC = ({}) => {
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
      <CreateComicForm />
    </div>
  );
};

export default Page;
