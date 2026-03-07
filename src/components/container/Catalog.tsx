'use client';

import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { fetchProducts } from '@/features/product/productSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setDetail } from '@/features/detail/detailSlice';

export default function Catalog() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items: products, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const query = useSelector((state: RootState) => state.search.query);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // ⬅️ untuk filter

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Ambil semua kategori unik dari products
  const categories = Array.from(new Set(products.map((p) => p.category)));
  categories.unshift('All'); // supaya ada pilihan All

  // Handle checkbox
  const handleCategoryChange = (cat: string, checked: boolean) => {
    if (cat === 'All') {
      setSelectedCategories([]);
    } else {
      if (checked) {
        setSelectedCategories((prev) => [...prev, cat]);
      } else {
        setSelectedCategories((prev) => prev.filter((c) => c !== cat));
      }
    }
  };

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .filter(
      (p) =>
        selectedCategories.length === 0 ||
        (p.category && selectedCategories.includes(p.category))
    )
    .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

  if (isLoading || !products.length) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-gray-600'>Loading products...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
      <h1 className='mb-6 text-3xl font-bold'>Catalog</h1>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
        <aside className='col-span-1 hidden divide-y divide-gray-300 rounded-xl border border-gray-300 bg-white py-4 lg:block'>
          <div className='flex flex-col gap-2.5 px-4 py-2.5'>
            <h2 className='text-lg font-bold'>FILTER</h2>
            <h3 className='text-md font-semibold'>Categories</h3>
            <ul className='mt-3 space-y-2'>
              {categories.map((cat, i) => (
                <li key={i}>
                  <label className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 rounded accent-black'
                      checked={
                        (cat && selectedCategories.includes(cat)) ||
                        (cat === 'All' && selectedCategories.length === 0)
                      }
                      onChange={(e) => {
                        if (!cat) return;
                        handleCategoryChange(cat, e.target.checked);
                      }}
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className='col-span-3 space-y-6'>
          <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                onClick={() => {
                  router.push(`/06_detail?id=${product.id}`);
                }}
                className='cursor-pointer rounded-xl bg-white shadow-sm transition hover:shadow-md'
              >
                <div className='relative h-72 w-full'>
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className='rounded-t-xl'
                  />
                </div>
                <div className='px-2 py-2'>
                  <h4 className='line-clamp-1 text-sm'>{product.title}</h4>
                  <data className='block text-sm font-bold'>
                    {product.price}
                  </data>
                  <div className='flex items-center gap-1 text-sm'>
                    <Image
                      src='/rating.png'
                      alt='rating star'
                      width={17}
                      height={16}
                    />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className='flex justify-center'>
            <button className='rounded-lg border px-6 py-2 transition hover:bg-gray-100'>
              Load More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
