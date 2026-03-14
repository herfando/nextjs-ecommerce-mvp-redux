'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { useProduct } from '@/query/hooks/02_useProduct';
import type { Product } from '@/query/types/02_productType';

export default function FeaturedProduct() {
  const router = useRouter();

  // ambil data dari TanStack Query (sama seperti Hero)
  const { data: products = [], isLoading } = useProduct();

  const [visibleCount, setVisibleCount] = useState(16);
  const [displayed, setDisplayed] = useState<Product[]>([]);
  const [fadeKey, setFadeKey] = useState(0);

  // sorting produk
  useEffect(() => {
    if (!products.length) return;

    const updated = [...products].sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );

    setDisplayed(updated);
    setFadeKey((k) => k + 1);
  }, [products]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 16);

  if (isLoading || !products.length)
    return (
      <div className='py-10 text-center text-lg font-medium'>
        Loading featured products...
      </div>
    );

  return (
    <div className='mx-auto max-w-7xl gap-5 p-5 text-2xl font-bold text-[#0A0D12] md:p-0 md:text-4xl'>
      Featured Product
      <div
        key={fadeKey}
        className='animate-fadeIn mx-auto my-5 grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4'
      >
        {displayed.slice(0, visibleCount).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => router.push(`/06_detail?id=${product.id}`)}
          />
        ))}
      </div>
      {visibleCount < displayed.length && (
        <div className='mt-6 mb-10 flex justify-center'>
          <Button
            onClick={handleLoadMore}
            className='rounded-full px-6 py-3 text-base font-semibold'
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => (
  <div
    onClick={onClick}
    className='flex cursor-pointer flex-col gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'
  >
    <div className='relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100'>
      <Image
        src={product.thumbnail}
        alt={product.title}
        fill
        style={{ objectFit: 'cover' }}
        sizes='100vw'
        className='transition-transform duration-500 hover:scale-110'
      />
    </div>

    <h4 className='mt-1 line-clamp-1 text-base font-medium'>{product.title}</h4>

    <p className='text-base font-bold text-black'>${product.price}</p>

    <div className='flex items-center gap-2 text-sm text-gray-600'>
      <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
      <span>{product.rating}</span>
      <span className='mx-1'>·</span>
      <span>{product.stock} sold</span>
    </div>
  </div>
);

// animasi
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
  @keyframes fadeIn {
    from { opacity:0; transform:scale(0.98); }
    to { opacity:1; transform:scale(1); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-in-out;
  }
  `;
  document.head.appendChild(style);
}
