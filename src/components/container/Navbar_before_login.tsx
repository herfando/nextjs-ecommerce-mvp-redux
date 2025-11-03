'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, LayoutGrid, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { setQuery } from '@/features/search/searchSlice';
import { useEffect } from 'react';
import { fetchCartFromAPI } from '@/features/cart/cartSlice';

export default function NavbarBeforeLogin() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.search.query);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 🔥 ubah query di redux state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  // 🔥 submit langsung arahkan ke catalog
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/08_catalog?search=${encodeURIComponent(query)}`);
    }
  };

  const handleLogin = () => router.push('/01_login');
  const handleRegister = () => router.push('/02_register');
  const handleCategory = () => console.log('Go to Category Page');

  return (
    <nav className='sticky top-0 z-50 border-gray-100 bg-white shadow-md'>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
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

        {/* Catalog & Search */}
        <div className='mx-8 flex max-w-xl flex-grow items-center gap-4'>
          {/* Catalog Button */}
          <Link href='/07_store' passHref>
            <Button
              variant='outline'
              className='flex h-10 cursor-pointer items-center gap-1.5 border-gray-300 px-4 text-sm font-medium transition-colors hover:bg-gray-50'
              onClick={handleCategory}
            >
              <LayoutGrid className='h-4 w-4' />
              <span>Category</span>
            </Button>
          </Link>

          {/* 🔥 Search Form Redux */}
          <form
            onSubmit={handleSearchSubmit}
            className='relative h-10 flex-grow'
          >
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <Input
              type='text'
              name='search_query'
              placeholder='Search product...'
              value={query}
              onChange={handleSearchChange}
              className='h-10 w-full rounded-xl border border-gray-300 pr-4 pl-10 transition-shadow focus-visible:ring-black focus-visible:ring-offset-0'
            />
          </form>
        </div>

        {/* Cart & Auth Buttons */}
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

          <Button
            variant='outline'
            onClick={handleLogin}
            className='h-10 cursor-pointer border-gray-300 px-5 py-2 text-sm font-semibold transition-colors hover:bg-black hover:text-white'
          >
            Login
          </Button>

          <Button
            variant='outline'
            onClick={handleRegister}
            className='h-10 cursor-pointer border-gray-300 px-5 py-2 text-sm font-semibold transition-colors hover:bg-black hover:text-white'
          >
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
}
