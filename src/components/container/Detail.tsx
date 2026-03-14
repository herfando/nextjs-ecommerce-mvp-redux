'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useProduct } from '@/query/hooks/02_useProduct';
import { addToCart } from '@/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';

export default function Detail() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const idParam = searchParams.get('id');
  const id = idParam ? Number(idParam) : null;

  const { data: products = [], isLoading } = useProduct();

  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specification'>(
    'description'
  );

  if (isLoading)
    return (
      <div className='flex h-[80vh] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-600' />
      </div>
    );

  if (!product)
    return (
      <div className='flex h-[80vh] items-center justify-center text-red-500'>
        Product not found
      </div>
    );

  // related products dari cache
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        category: product.category,
        quantity,
      })
    );
  };

  return (
    <main className='font-display bg-white'>
      <div className='mx-auto max-w-7xl bg-white p-6'>
        <nav className='mb-6 text-sm text-gray-500'>
          Home <span className='mx-2'>›</span> Detail{' '}
          <span className='mx-2'>›</span>
          <span className='text-black'>{product.title}</span>
        </nav>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Images */}
          <div>
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={500}
              height={400}
              className='aspect-[4/3] w-full rounded-lg border border-gray-300 object-cover'
            />

            <div className='mt-4 flex justify-between gap-1'>
              {product.images.slice(0, 5).map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`thumb ${i + 1}`}
                  width={80}
                  height={80}
                  className='h-20 w-20 cursor-pointer rounded border border-gray-300 object-cover p-1'
                />
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className='col-span-2'>
            <h1 className='text-2xl font-semibold'>{product.title}</h1>

            <p className='mt-2 text-2xl font-bold'>
              {Number(product.price).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>

            {/* Tabs */}
            <div className='mt-6 flex gap-6 border-b'>
              <button
                className={`pb-2 font-semibold ${
                  activeTab === 'description'
                    ? 'border-b-2 border-black'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>

              <button
                className={`pb-2 font-semibold ${
                  activeTab === 'specification'
                    ? 'border-b-2 border-black'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('specification')}
              >
                Specification
              </button>
            </div>

            <div className='mt-4 space-y-4 leading-relaxed text-gray-700'>
              {activeTab === 'description' ? (
                <p className='text-sm'>{product.description}</p>
              ) : (
                <ul className='list-disc space-y-2 pl-5 text-sm'>
                  <li>
                    <span className='font-medium'>Brand:</span> {product.brand}
                  </li>
                  <li>
                    <span className='font-medium'>Category:</span>{' '}
                    {product.category}
                  </li>
                  <li>
                    <span className='font-medium'>Stock:</span> {product.stock}
                  </li>
                </ul>
              )}
            </div>

            {/* Quantity */}
            <div className='mt-6'>
              <p className='mb-2 text-sm text-gray-500'>Quantity</p>

              <div className='inline-flex items-center rounded-lg border'>
                <button
                  onClick={handleDecrease}
                  className='px-3 py-2 select-none'
                >
                  −
                </button>

                <span className='border-x px-4 py-2'>{quantity}</span>

                <button
                  onClick={handleIncrease}
                  className='px-3 py-2 select-none'
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className='mt-6 flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800'
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-300' />

      {/* Related */}
      <div className='mx-auto max-w-7xl px-6 py-10'>
        <h2 className='mb-6 text-2xl font-semibold'>Related Product</h2>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4'>
          {related.map((prod) => (
            <Link key={prod.id} href={`/06_detail?id=${prod.id}`}>
              <div className='cursor-pointer rounded-lg bg-white p-4 shadow'>
                <div className='mb-4 flex h-60 w-full items-center justify-center rounded-md bg-gray-100'>
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className='h-full w-full object-cover'
                  />
                </div>

                <h3 className='mb-1 text-sm font-medium'>{prod.title}</h3>

                <p className='mb-1 text-sm font-semibold text-gray-800'>
                  {Number(prod.price).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
