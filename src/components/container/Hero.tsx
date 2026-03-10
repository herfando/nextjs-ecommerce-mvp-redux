'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/app/store';
import { setDetail } from '@/features/detail/detailSlice';
import { DetailProduct } from '@/features/detail/detailTypes';

import { useProduct } from '@/query/hooks/02_useProduct';
import { highlightTextMap, Product } from '@/query/types/02_productType';

export default function Hero() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data: products = [], isLoading } = useProduct();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel otomatis setiap 3 detik
  useEffect(() => {
    if (!products.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  if (isLoading || !products.length) {
    return (
      <section className='mt-10 flex justify-center bg-white py-10'>
        <p className='animate-pulse text-lg font-medium text-gray-500'>
          Loading latest collections...
        </p>
      </section>
    );
  }

  const currentProduct: Product = products[currentIndex];
  const highlight =
    highlightTextMap[currentProduct.category?.name] ?? 'New Collection';

  const handleGetNow = () => {
    const detailProduct: DetailProduct = {
      id: currentProduct.id,
      name: currentProduct.title,
      description: currentProduct.description,
      category: currentProduct.category,
      price: currentProduct.price,
      thumbnail: currentProduct.images[0]?.thumbnail,
      images: currentProduct.images?.map((img) => img.thumbnail),
      brand: currentProduct.brand,
      stock: currentProduct.stock,
    };

    dispatch(setDetail(detailProduct));
    router.push(`/06_detail?id=${currentProduct.id}`);
  };

  return (
    <section className='mt-10 bg-white px-5 py-5 transition-all duration-500 ease-in-out'>
      <div className='mx-auto grid w-full max-w-7xl grid-cols-1 items-center justify-center overflow-hidden rounded-2xl bg-[#F3D7A4] p-5 shadow-xl md:grid-cols-2 md:gap-20 md:p-10'>
        {/* Text */}
        <article
          key={currentProduct._id}
          className='flex flex-col items-center justify-center gap-4 py-4 text-center md:order-2 md:-translate-x-20 md:items-start md:py-0 md:text-left'
        >
          <span className='py-3 text-3xl font-bold text-[#553E32] transition-all md:text-5xl'>
            {highlight}
          </span>

          <span className='text-base font-semibold text-[#553E32] transition-all md:text-2xl'>
            {currentProduct.title}
          </span>

          <span className='line-clamp-3 text-sm text-[#553E32]/80 transition-all md:text-lg'>
            {currentProduct.description}
          </span>

          <Button
            onClick={handleGetNow}
            className='h-[28px] w-[93px] cursor-pointer rounded-sm bg-[#0A0D12] text-center text-sm text-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg md:h-[48px] md:w-[180px] md:text-xl'
          >
            Get Now
          </Button>
        </article>

        {/* Image */}
        <div
          key={currentProduct.images[0]?.thumbnail}
          className='relative mx-auto flex aspect-[4/5] h-[185px] w-full items-end justify-center overflow-hidden md:order-1 md:h-[367px] md:max-w-none'
        >
          <Image
            src={currentProduct.images[0]?.thumbnail || ''}
            alt={currentProduct.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes='w-full'
            className='transition-all duration-500 ease-in-out md:-translate-x-20'
            priority
          />
        </div>
      </div>
    </section>
  );
}
