'use client';

import { StarFilledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { FC, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';
import { IComic } from '@/types/comics';

type ComicRatingControlProps = {
  id: IComic['id'];
  rating: IComic['rating'] | null;
};

export const ComicRatingControl: FC<ComicRatingControlProps> = ({ id, rating }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isExistRating = !!rating;
  const ratingsValue = Array.from({ length: 10 - 1 + 1 }, (_, index) => index + 1);

  const handleUpdateRating = (newValue: number) => {
    startTransition(async () => {
      try {
        await ComicsService.updateRating(id, newValue);
        router.refresh();
        setOpen(false);
      } catch (error) {
        toast.success('Error', {
          description: 'Error when deleting collection',
        });
      }
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={isPending}
          className={cn(
            'flex h-full gap-1 px-3',
            isExistRating
              ? buttonVariants({ variant: 'default' })
              : buttonVariants({ variant: 'ghost' })
          )}
        >
          {isExistRating && `${rating}`}
          <StarFilledIcon
            className={cn(
              'h-5 w-5',
              isExistRating ? 'fill-primary-foreground' : 'fill-primary-foreground'
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[65px] bg-card p-0 text-card-foreground'>
        <ul className='flex flex-col  gap-1'>
          {ratingsValue.map((v) => (
            <li key={v}>
              <button
                onClick={() => handleUpdateRating(v)}
                className={cn(
                  'w-full cursor-pointer rounded px-2 py-1 text-center text-sm outline-none',
                  v === rating
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary focus:bg-secondary'
                )}
              >
                {v}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
