'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { fetchProductDetail } from '@/features/detail/detailSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/query/types';
import { DetailProduct } from '@/features/detail/detailTypes';

// ----------------------------
// API response type
// ----------------------------
type ProductsResponse = {
  products: Product[];
};

export default function Detail() {
  const dispatch = useDispatch<AppDispatch>();
  const { item, isLoading, error } = useSelector(
    (state: RootState) => state.detail
  );

  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? Number(idParam) : null;

  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'specification'>(
    'description'
  );

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  // ----------------------------
  // Fetch detail product
  // ----------------------------
  useEffect(() => {
    if (id !== null) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id]);

  // ----------------------------
  // Fetch related products
  // ----------------------------
  useEffect(() => {
    if (item && item.category) {
      fetch(
        `${API_BASE}/products/category/${encodeURIComponent(item.category)}`
      )
        .then((res) => res.json() as Promise<ProductsResponse>)
        .then((json) => {
          const prods = json.products.filter((p) => p.id !== item.id);
          setRelated(prods.slice(0, 4));
        })
        .catch((err) =>
          console.error('Failed to fetch related products:', err)
        );
    }
  }, [item, API_BASE]);

  if (isLoading)
    return (
      <div className='flex h-[80vh] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-600' />
      </div>
    );

  if (error)
    return (
      <div className='flex h-[80vh] items-center justify-center text-red-500'>
        {error}
      </div>
    );

  // ----------------------------
  // Pastikan data SELALU DetailProduct
  // ----------------------------
  const data: DetailProduct = item ?? {
    id: 0,
    name: 'Sneakers Court Minimalis',
    price: 275000,
    description:
      'Sepatu sneakers bergaya minimalis dengan kombinasi warna ivory dan beige yang elegan.',
    category: 'Sneakers',
    brand: 'Minimal Brand',
    stock: 10,
    thumbnail: '/product1.png',
    images: [
      '/product1.png',
      '/Thumbnail Image-1.png',
      '/Thumbnail Image-2.png',
      '/Thumbnail Image-1.png',
      '/Thumbnail Image-3.png',
    ],
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.thumbnail,
        category: data.category,
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
          <span className='text-black'>{data.name}</span>
        </nav>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Left: Images */}
          <div>
            <Image
              src={data.thumbnail}
              alt={data.name}
              width={500}
              height={400}
              className='aspect-[4/3] w-full rounded-lg border border-gray-300 object-cover'
            />

            <div className='mt-4 flex justify-between gap-1'>
              {data.images.slice(0, 5).map((img, i) => (
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

          {/* Right: Detail */}
          <div className='col-span-2'>
            <h1 className='text-2xl font-semibold'>{data.name}</h1>
            <p className='mt-2 text-2xl font-bold'>
              {data.price.toLocaleString('en-US', {
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
                <p className='text-sm'>{data.description}</p>
              ) : (
                <ul className='list-disc space-y-2 pl-5 text-sm'>
                  <li>
                    <span className='font-medium'>Brand:</span> {data.brand}
                  </li>
                  <li>
                    <span className='font-medium'>Category:</span>{' '}
                    {data.category}
                  </li>
                  <li>
                    <span className='font-medium'>Stock:</span> {data.stock}
                  </li>
                </ul>
              )}
            </div>

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

      {/* Related Products */}
      <div className='mx-auto max-w-7xl px-6 py-10'>
        <h2 className='mb-6 text-2xl font-semibold'>Related Product</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4'>
          {related.map((prod) => (
            <Link key={prod.id} href={`/detail?id=${prod.id}`}>
              <div className='cursor-pointer rounded-lg bg-white p-4 shadow'>
                <div className='mb-4 flex h-60 w-full items-center justify-center rounded-md bg-gray-100'>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className='h-full w-full object-cover'
                  />
                </div>
                <h3 className='mb-1 text-sm font-medium'>{prod.name}</h3>
                <p className='mb-1 text-sm font-semibold text-gray-800'>
                  {prod.price.toLocaleString('en-US', {
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
