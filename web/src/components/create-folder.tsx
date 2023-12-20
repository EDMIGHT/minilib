'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { FC, useState } from 'react';

import { CreateFolderForm } from '@/components/forms/create-folder-form';
import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export const CreateFolder: FC = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex cursor-pointer justify-center gap-2 border border-dashed border-border p-6'
          )}
        >
          <PlusIcon /> Create your own collection
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
          <DialogDescription>A collection to help you organize your comics</DialogDescription>
        </DialogHeader>
        <CreateFolderForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};
