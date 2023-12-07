import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { ComicControl } from '@/components/comic-control';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const comic = await ComicsService.get(id);

  if (!comic) {
    return {};
  }

  return {
    title: comic.title,
    description: comic.desc,
  };
}

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const comic = await ComicsService.get(id);

  if (!comic) {
    return notFound();
  }

  const { id: comicId, img, title, desc, year, rating, issueNumber, edition } = comic;

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
        ]}
      />
      <div className='relative flex flex-col gap-8 md:flex-row md:gap-16'>
        <div className='relative aspect-square w-full min-w-0 md:max-w-[50vw]'>
          <Image
            role='group'
            aria-roledescription='slide'
            src={img}
            alt={title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw'
            className='rounded-md object-cover'
            priority
          />
        </div>
        <div className='flex w-full flex-col gap-4  p-2'>
          <ComicControl id={id} />
          <h1 className='text-2xl font-bold md:text-3xl'>{title}</h1>
          <p className='text-base text-muted-foreground sm:text-lg'>{desc}</p>
          <Separator />
          <p className='text-xl'>
            <span className='font-semibold'>Year:</span> {year}
          </p>
          <p className='text-xl'>
            <span className='font-semibold'>Rating:</span> {rating || 'not found'}
          </p>
          <p className='text-xl'>
            <span className='font-semibold'>Issue number:</span> {issueNumber || 'not found'}
          </p>
          <p className='text-xl'>
            <span className='font-semibold'>Edition:</span> {edition || 'not found'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
