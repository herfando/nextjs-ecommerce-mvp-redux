'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { increase, decrease, removeItem } from '@/features/cart/cartSlice';
import Link from 'next/link';

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className='container mx-auto flex-grow px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold text-gray-800'>Cart</h1>

      <div className='flex flex-col gap-8 lg:flex-row'>
        {/* Cart Items */}
        <section className='flex-1 rounded-lg bg-white p-6 shadow-md'>
          <div className='mb-4 flex items-center space-x-2'>
            <input
              type='checkbox'
              id='selectAll'
              className='form-checkbox h-5 w-5 rounded text-indigo-600'
            />
            <label htmlFor='selectAll' className='text-gray-700'>
              Select All
            </label>
          </div>

          <div className='space-y-6'>
            {cart.map((item) => (
              <div
                key={item.id}
                className='flex items-center justify-between border-b pb-4'
              >
                {/* LEFT SIDE */}
                <div className='flex items-center space-x-4'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-5 w-5 rounded text-indigo-600'
                  />

                  {/* LINK KE DETAIL */}
                  <Link
                    href={`/06_detail?id=${item.id}`}
                    className='flex items-center space-x-4'
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className='h-20 w-20 rounded-lg object-cover'
                    />

                    <div>
                      <h3 className='font-semibold text-gray-800 hover:underline'>
                        {item.name}
                      </h3>
                      <p className='text-sm text-gray-500'>{item.category}</p>
                    </div>
                  </Link>
                </div>

                {/* RIGHT SIDE */}
                <div className='flex items-center space-x-4'>
                  <p className='w-24 text-right font-bold text-gray-600'>
                    ${item.price.toFixed(2)}
                  </p>

                  <div className='flex items-center rounded-md border border-gray-300'>
                    <button
                      onClick={() => dispatch(decrease(item.id))}
                      className='rounded-l-md px-3 py-1 text-gray-600 hover:bg-gray-100'
                    >
                      -
                    </button>

                    <span className='border-r border-l border-gray-300 px-3 py-1'>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increase(item.id))}
                      className='rounded-r-md px-3 py-1 text-gray-600 hover:bg-gray-100'
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className='text-gray-400 hover:text-red-500'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Total Section */}
        <aside className='h-min w-full rounded-lg bg-white p-6 shadow-md lg:w-80'>
          <h2 className='mb-4 text-xl font-bold text-gray-600'>
            Total Shopping
          </h2>

          <div className='mb-6 flex items-center justify-between'>
            <span className='text-gray-700'>Total</span>
            <span className='text-xl font-bold text-gray-600'>
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <Link href='/10_checkout'>
            <button className='w-full rounded-lg bg-black py-3 font-semibold text-white transition duration-300 hover:bg-gray-800'>
              Checkout
            </button>
          </Link>
        </aside>
      </div>
    </main>
  );
}
