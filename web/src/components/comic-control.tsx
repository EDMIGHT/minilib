'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ComicsService } from '@/services/comics.service';

type ComicControlProps = {
  id: string;
};

export const ComicControl: FC<ComicControlProps> = ({ id }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const deleteFolder = () => {
    startTransition(async () => {
      try {
        await ComicsService.delete(id);

        toast.success('Successfully deleted', {
          description: `Comic successfully deleted`,
        });

        router.push('/');
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while deleting comics', {
          description: 'For detailed information, go to the console',
        });
      }
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' disabled={isPending} className='ml-auto'>
          <DotsHorizontalIcon className='h-7 w-7' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='font-medium'>
        <DropdownMenuGroup>
          <Link href={`/${id}/edit`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => deleteFolder()}
            disabled={isPending}
            className='text-destructive'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
