'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ColorWheelIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { commonFolderSchema, ICommonFolderSchema } from '@/lib/validations/folder.validations';
import { FoldersService } from '@/services/folders.service';

type ICreateFolderFormProps = {
  onSuccess: () => void;
};

export const CreateFolderForm: FC<ICreateFolderFormProps> = ({ onSuccess }) => {
  const form = useForm<ICommonFolderSchema>({
    resolver: zodResolver(commonFolderSchema),
    defaultValues: {
      title: '',
    },
  });
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onSubmit = ({ title }: ICommonFolderSchema) => {
    startTransition(async () => {
      try {
        await FoldersService.create({ title });
        router.refresh();
        form.reset();
        onSuccess();
      } catch (error) {
        console.error(error);
        toast.error('Creation Error', {
          description: `Collection named "${title}" could not be created`,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='collection title..' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type='submit' className='ml-auto'>
          Create {isPending && <ColorWheelIcon className='h-5 w-5 animate-spin pl-2' />}
        </Button>
      </form>
    </Form>
  );
};
