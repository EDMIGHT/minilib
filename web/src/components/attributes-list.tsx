'use client';

import { FC, HTMLAttributes } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Item = {
  id: string;
  name: string;
};

type AttributesListProps = HTMLAttributes<HTMLUListElement> & {
  items: Item[];
  activeGenres?: string[];
  onClickItem?: (genre: Item) => void;
  emptyText?: string;
};

export const AttributesList: FC<AttributesListProps> = ({
  items,
  onClickItem,
  activeGenres,
  className,
  emptyText = 'empty',
  ...rest
}) => {
  return (
    <>
      {items.length > 0 ? (
        <ul {...rest} className={cn('flex flex-wrap gap-1', className)}>
          {items.map((genre) => (
            <li key={genre.id}>
              <Badge
                onClick={() => onClickItem && onClickItem(genre)}
                className='cursor-pointer capitalize'
                variant={
                  activeGenres?.some((activeGen) => activeGen === genre.id)
                    ? 'outline'
                    : 'default'
                }
              >
                <h4>{genre.name}</h4>
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <h4 className='text-base text-muted-foreground'>{emptyText}</h4>
      )}
    </>
  );
};
