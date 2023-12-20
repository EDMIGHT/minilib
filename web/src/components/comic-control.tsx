'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ComicsService } from '@/services/comics.service';
import { FoldersService } from '@/services/folders.service';
import { IComicWithHisFolders } from '@/types/comics';
import { IFolderWithShortComics } from '@/types/folders';

type ComicControlProps = {
  id: string;
  allFolders: IFolderWithShortComics[];
  comicFolders: IComicWithHisFolders['folders'];
};

export const ComicControl: FC<ComicControlProps> = ({ id, allFolders, comicFolders }) => {
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
  const updateFolderContent = (folderId: ComicControlProps['allFolders'][number]['id']) => {
    startTransition(async () => {
      try {
        await FoldersService.updateExistingComicInFolder(folderId, id);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Update error', {
          description: 'An error occurred when adding/removing a comic from the collection',
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Collections</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {allFolders.map(({ id, title }) => (
                  <DropdownMenuCheckboxItem
                    key={id}
                    checked={!!comicFolders.find((comicFolder) => comicFolder.id === id)}
                    onCheckedChange={() => updateFolderContent(id)}
                  >
                    {title}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
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
