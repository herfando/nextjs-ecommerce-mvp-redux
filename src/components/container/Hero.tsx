'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/app/store';
import { setDetail } from '@/features/detail/detailSlice';

// -------------------- Type Produk --------------------
interface ApiProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
}

// Mapping teks highlight per kategori
const highlightTextMap: Record<string, string> = {
  smartphones: 'Top Gadget This Week',
  laptops: 'Powerful Devices for You',
  fragrances: 'Feel Fresh Everyday',
  skincare: 'Self-Care Essentials',
  groceries: 'Fresh Deals Today',
  'home-decoration': 'Decorate Your Space',
  'mens-shirts': "Stylish Men's Apparel",
  'mens-shoes': 'Step Up Your Style',
  'mens-watches': 'Luxury in Time',
  'womens-dresses': 'Elegant Women’s Wear',
  'womens-shoes': 'Perfect Steps for Her',
  'womens-watches': 'Chic Accessories',
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// -------------------- Fetch function --------------------
const fetchAllProducts = async (): Promise<ApiProduct[]> => {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.products;
};

export default function Hero() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 60,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Ganti produk tiap 3 detik
  useEffect(() => {
    if (products.length === 0) return;

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

  const currentProduct = products[currentIndex];

  const highlight =
    highlightTextMap[currentProduct.category] ?? 'New Collection';

  const handleGetNow = () => {
    dispatch(setDetail(currentProduct));
    router.push(`/06_detail?id=${currentProduct.id}`);
  };

  return (
    <section className='mt-10 bg-white px-5 py-5 transition-all duration-500 ease-in-out'>
      <div className='mx-auto grid w-full max-w-7xl grid-cols-1 items-center justify-center overflow-hidden rounded-2xl bg-[#F3D7A4] p-5 shadow-xl md:grid-cols-2 md:gap-20 md:p-10'>
        {/* Text */}
        <article
          key={currentProduct.id}
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
          key={currentProduct.thumbnail}
          className='relative mx-auto flex aspect-[4/5] h-[185px] w-full items-end justify-center overflow-hidden md:order-1 md:h-[367px] md:max-w-none'
        >
          <Image
            src={currentProduct.thumbnail}
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
