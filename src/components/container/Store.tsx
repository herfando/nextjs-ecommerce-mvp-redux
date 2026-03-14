'use client';

import React from 'react';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { useProduct } from '@/query/hooks/02_useProduct';
import { Product } from '@/query/types/02_productType';

// ************************
// Product Card
// ************************
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link href={`/product/${product.id}`}>
    <div className='cursor-pointer rounded-md border border-gray-200 p-2 transition-shadow hover:shadow-lg'>
      <div className='mb-2 h-48 w-full overflow-hidden rounded-sm bg-gray-100'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='h-full w-full object-cover'
        />
      </div>

      <p className='line-clamp-2 text-sm font-medium text-gray-800'>
        {product.title}
      </p>

      <p className='my-1 text-sm font-bold text-red-600'>
        Rp {product.price.toLocaleString()}
      </p>

      <div className='flex items-center text-xs text-gray-500'>
        <StarIcon className='mr-1 h-3 w-3 fill-yellow-500 text-yellow-500' />
        <span className='mr-2'>{product.rating}</span>
        <span>• {product.stock} Stock</span>
      </div>
    </div>
  </Link>
);

// ************************
// Store Page
// ************************
const Store: React.FC = () => {
  const { data: products, isLoading, error } = useProduct();

  if (isLoading) {
    return <p className='py-20 text-center'>Loading products...</p>;
  }

  if (error) {
    return (
      <p className='py-20 text-center text-red-500'>Failed to load products</p>
    );
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='flex flex-col gap-6 lg:flex-row'>
        {/* LEFT SIDE */}
        <div className='w-full lg:w-1/4'>
          {/* Store Header Desktop */}
          <div className='mb-6 hidden rounded-md border p-4 shadow-sm lg:block'>
            <h2 className='mb-2 flex items-center text-lg font-semibold'>
              <span className='mr-2 h-8 w-8 rounded-full bg-gray-200'></span>
              Toko Barokah Jaya
            </h2>

            <p className='text-sm text-gray-500'>Jakarta Selatan</p>

            <div className='mt-2 flex items-center text-sm'>
              <StarIcon className='mr-1 h-4 w-4 fill-yellow-500 text-yellow-500' />
              <span className='mr-1 font-semibold'>4.9</span>
              <span className='text-gray-500'>(987 Rating)</span>
            </div>
          </div>

          {/* Filter */}
          <div className='sticky top-6 hidden rounded-md border p-4 shadow-sm lg:block'>
            <h3 className='mb-3 text-lg font-semibold'>Filter</h3>

            <div className='space-y-2'>
              <label className='flex items-center text-sm'>
                <input type='checkbox' className='mr-2 rounded text-red-600' />
                Beauty
              </label>

              <label className='flex items-center text-sm'>
                <input type='checkbox' className='mr-2 rounded text-red-600' />
                Electronics
              </label>

              <label className='flex items-center text-sm'>
                <input type='checkbox' className='mr-2 rounded text-red-600' />
                Fashion
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='w-full lg:w-3/4'>
          {/* Store Header Mobile */}
          <div className='mb-4 flex items-center rounded-md border p-3 shadow-sm lg:hidden'>
            <div className='mr-3 h-10 w-10 rounded-full bg-gray-200'></div>

            <div>
              <p className='font-semibold'>Toko Barokah Jaya</p>

              <div className='flex items-center text-xs text-gray-500'>
                <StarIcon className='mr-1 h-3 w-3 fill-yellow-500 text-yellow-500' />
                4.9 (987 Rating)
              </div>
            </div>
          </div>

          <h1 className='mb-4 text-xl font-bold'>Products</h1>

          {/* PRODUCT GRID */}
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'>
            {products?.slice(0, 20).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* LOAD MORE */}
          <div className='my-6 text-center'>
            <button className='rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50'>
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
