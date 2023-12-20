'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ColorWheelIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { AttributesList } from '@/components/attributes-list';
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
import { IAuthor } from '@/types/author';
import { IComic, IComicWithAttributes } from '@/types/comics';
import { IGenre } from '@/types/genres';

type IEditComicForm = Pick<
  IComicWithAttributes,
  'id' | 'title' | 'desc' | 'year' | 'edition' | 'rating' | 'authors' | 'genres'
> & {
  allGenres: IGenre[];
  allAuthors: IAuthor[];
};

export const EditComicForm: FC<IEditComicForm> = ({
  id,
  title,
  desc,
  edition,
  rating,
  year,
  authors,
  genres,
  allAuthors,
  allGenres,
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
      authors: authors.map(({ id }) => id),
      genres: genres.map(({ id }) => id),
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
              <FormLabel isRequired>Title</FormLabel>
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
              <FormLabel isRequired>Edition</FormLabel>
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
              <FormLabel isRequired>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='description..' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 '>
          <FormItem>
            <FormLabel className={cn(!!form.formState.errors.year && 'text-destructive')}>
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
            <FormLabel className={cn(!!form.formState.errors.rating && 'text-destructive')}>
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
        <FormField
          control={form.control}
          name='genres'
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Genres</FormLabel>
              <AttributesList
                items={allGenres}
                activeGenres={field.value}
                onClickItem={(gen) => {
                  if (field.value?.some((val) => val === gen.id)) {
                    return field.onChange(field.value.filter((val) => val !== gen.id));
                  } else {
                    return field.onChange([...field.value, gen.id]);
                  }
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='authors'
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Authors</FormLabel>
              <AttributesList
                items={allAuthors}
                activeGenres={field.value}
                onClickItem={(author) => {
                  if (field.value?.some((val) => val === author.id)) {
                    return field.onChange(field.value.filter((val) => val !== author.id));
                  } else {
                    return field.onChange([...field.value, author.id]);
                  }
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

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
            Update {isPending && <ColorWheelIcon className='h-5 w-5 animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
