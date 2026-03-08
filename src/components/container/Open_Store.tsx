// src/app/buyer/open_store/OpenStore.tsx (REVISI LENGKAP)
'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import Link from 'next/link';
import { useOpenStore } from '@/query/hooks/useOpenStore';

export default function OpenStore() {
  // ✅ Ambil semua yang dibutuhkan dari hook
  const { handleSubmit, onSubmit, isPending, ...form } = useOpenStore();

  return (
    <div className='bg-muted/20 flex min-h-screen items-center justify-center p-20'>
      <Card className='bg-background w-full max-w-sm rounded-2xl border p-3 shadow-md'>
        {/* Header (TETAP SAMA) */}
        <div className='flex flex-col items-start p-6'>
          <div className='mb-3 flex items-center gap-2'>
            <Image src='/Vector.png' alt='Logo' width={40} height={40} />
            <span className='text-xl font-semibold text-black'>Shirt</span>
          </div>
          <h1 className='text-left text-2xl font-semibold'>
            Open Your Store Today
          </h1>
          <p className='text-muted-foreground mt-1 text-left text-sm'>
            Start selling in minutes and reach thousands of customers instantly
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          {/* ✅ Gunakan handleSubmit dan onSubmit dari hook */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className='space-y-6'>
              {/* STORE PROFILE */}
              <div>
                <h2 className='text-l text-muted-foreground mb-2 font-bold'>
                  STORE PROFILE
                </h2>
                <div className='space-y-3'>
                  <FormField
                    control={form.control}
                    name='storeName'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Store Name' {...field} />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='storeDomain'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Store Domain' {...field} />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* STORE ADDRESS */}
              <div>
                <h2 className='text-l text-muted-foreground mb-2 font-bold'>
                  STORE ADDRESS
                </h2>
                <div className='space-y-3'>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='City' {...field} />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='postalCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Postal Code' {...field} />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder='Detail Address' {...field} />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className='flex flex-col gap-2'>
              <Button
                type='submit'
                // ✅ Gunakan isPending untuk loading state
                disabled={isPending}
                className='mt-2 h-11 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800'
              >
                {/* ✅ Tampilkan loading state */}
                {isPending ? 'Submitting...' : 'Submit'}
              </Button>
              <Link
                href='/05_home/afterstore'
                className='text-muted-foreground border-b text-center text-sm font-bold hover:underline'
              >
                Back
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
