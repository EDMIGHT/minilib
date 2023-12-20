import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { IAuthor } from '@/types/author';

type AuthorsListProps = HTMLAttributes<HTMLParagraphElement> & {
  authors: IAuthor[];
};

export const AuthorsList: FC<AuthorsListProps> = ({ authors, className, ...rest }) => {
  const authorsNames = authors.map(({ name }) => name);

  return (
    <p {...rest} className={cn('truncate font-medium italic', className)}>
      {authorsNames.join(', ')}
    </p>
  );
};
