'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useTransition } from 'react';

import { ComicsList } from '@/components/comics-list';
import { Pagination } from '@/components/pagination';
import { IResponseComicCatalog } from '@/types/response';

export const ComicsSection: FC<IResponseComicCatalog> = ({
  comics,
  totalPages,
  currentPage,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams()!;
  const [isPending, startTransition] = useTransition();

  const createPaginationQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  return (
    <section className='space-y-2'>
      <ComicsList comics={comics} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isBlocked={isPending}
          className='justify-center'
          customHandlePageChange={(newPage) =>
            startTransition(() => {
              router.push(pathname + '?' + createPaginationQueryString('page', newPage));
            })
          }
        />
      )}
    </section>
  );
};
