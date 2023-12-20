'use client';

import { ColorWheelIcon, TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { FC, useTransition } from 'react';
import { toast } from 'sonner';

import { FoldersService } from '@/services/folders.service';

type FolderDeleteBtnProps = {
  id: string;
};

export const FolderDeleteBtn: FC<FolderDeleteBtnProps> = ({ id }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await FoldersService.delete(id);
        router.refresh();
      } catch (error) {
        toast.success('Error', {
          description: 'Error when deleting collection',
        });
      }
    });
  };

  return isPending ? (
    <ColorWheelIcon className='h-6 w-6 animate-spin' />
  ) : (
    <TrashIcon
      onClick={() => handleDelete()}
      className='h-6 w-6 cursor-pointer text-destructive hover:text-primary'
    />
  );
};
