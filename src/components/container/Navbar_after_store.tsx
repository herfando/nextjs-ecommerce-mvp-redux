'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, LayoutGrid, Search, Store, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/context/auth_context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { setQuery, fetchSearchResults } from '@/features/search/searchSlice';
import { fetchCartFromAPI } from '@/features/cart/cartSlice';
import { useEffect } from 'react';

// 🔹 Auth section
const NavAuthSection = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className='flex items-center gap-4'>
        <div className='h-10 w-[100px] animate-pulse rounded-lg bg-gray-100'></div>
        <Loader2 className='h-6 w-6 animate-spin text-gray-500' />
      </div>
    );
  }

  if (user) {
    const emailPart = user?.email?.split('@')[0] || '';
    const userInitials = (
      user?.name?.slice(0, 2) ||
      emailPart.slice(0, 2) ||
      'JD'
    ).toUpperCase();
    return (
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          className='flex h-10 items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 transition-colors hover:bg-gray-50'
          onClick={() => router.push('/store/dashboard')}
        >
          <Store className='h-4 w-4 text-gray-700' />
          <span className='font-semibold'>
            {user?.storeName || 'Your Store'}
          </span>
        </Button>
        <Button
          variant='ghost'
          className='h-auto p-0'
          onClick={() => router.push('/profile')}
        >
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={user?.avatar || '/placeholder-avatar.jpg'}
              alt='Profile'
            />
            <AvatarFallback className='bg-black text-sm text-white'>
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='ghost'
        onClick={() => router.push('/auth/login')}
        className='h-10 px-3 py-2 text-sm'
      >
        Login
      </Button>
      <Button
        onClick={() => router.push('/auth/register')}
        className='h-10 bg-black px-3 py-2 text-sm hover:bg-gray-800'
      >
        Register
      </Button>
    </div>
  );
};

// 🔹 Navbar After Store
export default function NavbarAfterStore() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const query = useSelector((state: RootState) => state.search.query);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    dispatch(fetchCartFromAPI());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    if (value.trim()) dispatch(fetchSearchResults(value));
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim())
      router.push(`/08_catalog?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className='sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm'>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/companyicon.png'
              alt='Shirt Logo'
              width={32}
              height={32}
            />
            <span className='text-xl font-bold'>Shirt</span>
          </Link>
        </div>

        <div className='flex items-center gap-5'>
          <Link href='/08_catalog'>
            <Button
              variant='outline'
              className='flex h-10 cursor-pointer items-center gap-1.5 px-3 text-sm hover:bg-black hover:text-white'
            >
              <LayoutGrid className='h-4 w-4' />
              <span>Catalog</span>
            </Button>
          </Link>

          <form
            onSubmit={handleSearchSubmit}
            className='relative hidden h-10 w-[300px] md:block'
          >
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <Input
              type='text'
              name='search_query'
              placeholder='Search...'
              value={query}
              onChange={handleSearchChange}
              className='h-10 rounded-xl border border-gray-300 pr-3 pl-9 transition-shadow focus-visible:ring-black focus-visible:ring-offset-0'
            />
          </form>
        </div>

        <div className='flex items-center gap-4'>
          <Link
            href='/09_cart'
            className='relative transition-all duration-300 hover:scale-105'
          >
            <ShoppingCart className='h-6 w-6 cursor-pointer text-gray-700 hover:fill-black' />
            {cartCount > 0 && (
              <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white'>
                {cartCount}
              </span>
            )}
          </Link>
          <NavAuthSection />
        </div>
      </div>
    </nav>
  );
}
