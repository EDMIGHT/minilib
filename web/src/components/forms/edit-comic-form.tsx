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
  UncontrolledFormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { commonComicSchema, ICommonComicSchema } from '@/lib/validations/comic.validations';
import { ComicsService } from '@/services/comics.service';
import { IComic } from '@/types/comics';

type IEditComicForm = Pick<
  IComic,
  'id' | 'title' | 'desc' | 'year' | 'edition' | 'rating' | 'issueNumber'
>;

export const EditComicForm: FC<IEditComicForm> = ({
  id,
  title,
  desc,
  edition,
  issueNumber,
  rating,
  year,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ICommonComicSchema>({
    resolver: zodResolver(commonComicSchema),
    defaultValues: {
      title,
      desc,
      year,
      edition: edition || '',
      rating: rating || 0,
      issueNumber: issueNumber || 0,
    },
  });

  const onSubmit = (data: ICommonComicSchema) => {
    startTransition(async () => {
      try {
        const comic = await ComicsService.update(id, data);

        toast.success('Successfully changed', {
          description: `Comic "${comic.title}" successfully changed`,
        });

        form.reset();
        router.push('/');
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while changing comics', {
          description: 'For detailed information, go to the console',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='title..' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='edition'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edition</FormLabel>
              <FormControl>
                <Input placeholder='edition..' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='desc'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='description..' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
          <FormItem>
            <FormLabel
              isRequired
              className={cn(!!form.formState.errors.year && 'text-destructive')}
            >
              Year
            </FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.year}
                type='number'
                inputMode='numeric'
                placeholder='enter number..'
                {...form.register('year', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage message={form.formState.errors.year?.message} />
          </FormItem>
          <FormItem>
            <FormLabel
              isRequired
              className={cn(!!form.formState.errors.issueNumber && 'text-destructive')}
            >
              Issue Number
            </FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.issueNumber}
                type='number'
                inputMode='numeric'
                placeholder='enter number..'
                {...form.register('issueNumber', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage message={form.formState.errors.issueNumber?.message} />
          </FormItem>
          <FormItem>
            <FormLabel
              isRequired
              className={cn(!!form.formState.errors.rating && 'text-destructive')}
            >
              Rating
            </FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.rating}
                type='number'
                inputMode='numeric'
                placeholder='enter number..'
                {...form.register('rating', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage message={form.formState.errors.rating?.message} />
          </FormItem>
        </div>
        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            disabled={isPending}
            variant='ghost'
            onClick={() => router.push('/')}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            Create {isPending && <ColorWheelIcon className='h-5 w-5 animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
