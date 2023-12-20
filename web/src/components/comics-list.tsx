import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { AttributesList } from '@/components/attributes-list';
import { AuthorsList } from '@/components/authors-list';
import { Card, CardTitle } from '@/components/ui/card';
import { IComicWithAttributes } from '@/types/comics';

type IComicsListProps = {
  comics: IComicWithAttributes[];
};

export const ComicsList: FC<IComicsListProps> = ({ comics }) => {
  return (
    <ul className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
      {comics.map(({ id, title, img, desc, genres, authors }) => (
        <li key={id}>
          <Card className='flex gap-2 p-2'>
            <Link href={`/${id}`} className='hover:opacity-80'>
              <div className='h-[170px] w-[110px] xl:h-[200px] xl:w-[140px]'>
                <Image
                  src={img}
                  alt={title}
                  width={140}
                  height={200}
                  className='h-full w-full shrink-0 overflow-hidden rounded-md object-cover object-center'
                />
              </div>
            </Link>
            <div className='flex flex-1 flex-col gap-1 py-1'>
              <Link href={`/${id}`}>
                <CardTitle className='text-lg hover:opacity-80 xl:text-xl'>{title}</CardTitle>
              </Link>
              <AttributesList items={genres.slice(0, 5)} />
              <p className='line-clamp-3 text-sm leading-relaxed xl:text-base'>{desc}</p>
              <AuthorsList authors={authors} className='mt-auto' />
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};
