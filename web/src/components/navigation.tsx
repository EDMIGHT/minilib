'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <Tabs
      value={pathname === '/' ? 'library' : 'collections'}
      defaultValue={'library'}
      className='flex justify-center'
    >
      <TabsList className=' h-full w-full lg:w-1/2'>
        <Link href='/' className='w-full hover:brightness-75'>
          <TabsTrigger value='library' className='w-full text-xl'>
            Library
          </TabsTrigger>
        </Link>
        <Link href='/collections' className='w-full hover:brightness-75'>
          <TabsTrigger value='collections' className='w-full text-xl'>
            Collections
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};
