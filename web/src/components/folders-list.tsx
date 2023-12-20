import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { FolderDeleteBtn } from '@/components/folder-delete-btn';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IFolderWithShortComics } from '@/types/folders';

type FoldersListProps = {
  folders: IFolderWithShortComics[];
};

export const FoldersList: FC<FoldersListProps> = ({ folders }) => {
  return (
    <ul className='flex flex-col gap-2'>
      {folders.map(({ id, title, comics }) => (
        <li key={id}>
          <Card className='flex flex-col items-start justify-start gap-2 px-4 py-3 transition-colors'>
            <div className='flex w-full justify-between gap-2'>
              <Link href={`/folders/${id}`}>
                <h3 className=' text-xl font-semibold transition-all hover:brightness-75'>
                  {title}
                </h3>
              </Link>
              <FolderDeleteBtn id={id} />
            </div>
            {comics.length > 0 ? (
              <ul className='flex gap-2'>
                {comics.map(({ id, img, title }) => (
                  <li key={id}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={`/${id}`}>
                          <Image
                            src={img}
                            alt={title}
                            width={80}
                            height={96}
                            className='h-24 w-16 overflow-hidden rounded object-cover object-center transition-all hover:brightness-75'
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{title}</TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='text-sm text-muted-foreground'>empty</div>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
};
