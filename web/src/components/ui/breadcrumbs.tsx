import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { ComponentPropsWithoutRef, ComponentType, Fragment } from 'react';

import { cn } from '@/lib/utils';

export type BreadcrumbsProps = ComponentPropsWithoutRef<'nav'> & {
  segments: {
    title: string;
    href: string;
  }[];
  separator?: ComponentType<{ className?: string }>;
};

export function Breadcrumbs({ segments, separator, className, ...props }: BreadcrumbsProps) {
  const SeparatorIcon = separator ?? ChevronRightIcon;

  return (
    <nav
      aria-label='breadcrumbs'
      className={cn(
        'flex w-full items-center overflow-auto text-sm font-medium text-muted-foreground',
        className
      )}
      {...props}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;

        return (
          <Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? 'page' : undefined}
              href={segment.href}
              className={cn(
                'truncate text-base transition-colors hover:text-foreground sm:text-lg',
                isLastSegment ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {segment.title}
            </Link>
            {!isLastSegment && <SeparatorIcon className='mx-2 h-4 w-4' aria-hidden='true' />}
          </Fragment>
        );
      })}
    </nav>
  );
}
