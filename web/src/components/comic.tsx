import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IComic } from '@/types/comics';

export const Comic: FC<IComic> = ({ id, title, img, desc }) => {
  return (
    <Link href={`/${id}`}>
      <Card className='h-full overflow-hidden transition-colors hover:bg-muted/50'>
        <AspectRatio ratio={3 / 2}>
          <Image
            src={img}
            alt={title}
            className='rounded-t-md border-b object-cover'
            sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
            fill
            loading='lazy'
          />
        </AspectRatio>
        <CardHeader className='space-y-2'>
          <CardTitle className='line-clamp-1'>{title}</CardTitle>
          <CardDescription className='line-clamp-2'>{desc}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
