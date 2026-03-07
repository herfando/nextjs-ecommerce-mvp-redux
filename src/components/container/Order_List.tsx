'use client';
import React from 'react';
import {
  SearchIcon,
  UserIcon,
  ShoppingCartIcon,
  StarIcon,
  LogOutIcon,
} from 'lucide-react'; // Menggunakan Lucide Icons

// Data dummy untuk daftar pesanan
interface OrderItem {
  id: string;
  store: string;
  invoice: string;
  date: string;
  productName: string;
  productImage: string;
  quantity: number;
  pricePerItem: number;
  totalPayment: number;
  status: 'Processing' | 'Delivered' | 'Completed' | 'Cancelled';
}

const dummyOrders: OrderItem[] = [
  {
    id: '1',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 105000,
    totalPayment: 105000,
    status: 'Processing',
  },
  {
    id: '2',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 175000,
    totalPayment: 175000,
    status: 'Delivered',
  },
  {
    id: '3',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 175000,
    totalPayment: 175000,
    status: 'Completed',
  },
  {
    id: '4',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 175000,
    totalPayment: 175000,
    status: 'Cancelled',
  },
  // Tambahkan lebih banyak order jika perlu untuk pengujian paginasi
];

// Helper untuk format mata uang
const formatCurrency = (amount: number) => {
  return `Rp${amount.toLocaleString('id-ID')}`;
};

// ****************************
// Komponen Kartu Pesanan Individual
// ****************************
const OrderCard: React.FC<{ order: OrderItem }> = ({ order }) => {
  const statusColors = {
    Processing: 'text-yellow-600 bg-yellow-50',
    Delivered: 'text-blue-600 bg-blue-50',
    Completed: 'text-green-600 bg-green-50',
    Cancelled: 'text-red-600 bg-red-50',
  };

  return (
    <div className='mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex items-center text-sm font-semibold text-gray-700'>
          <ShoppingCartIcon className='mr-2 h-4 w-4' />
          <span>{order.store}</span>
          <span className='mx-2'>•</span>
          <span className='text-gray-500'>
            {order.invoice} - {order.date}
          </span>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <div className='flex items-center border-t border-gray-100 pt-3'>
        <img
          src={order.productImage}
          alt={order.productName}
          className='mr-4 h-16 w-16 rounded-md object-cover'
        />
        <div>
          <p className='font-medium text-gray-800'>{order.productName}</p>
          <p className='text-sm text-gray-500'>
            {order.quantity} x {formatCurrency(order.pricePerItem)}
          </p>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between border-t border-gray-100 pt-4'>
        <div>
          <p className='text-sm text-gray-500'>Total Payment</p>
          <p className='text-lg font-bold'>
            {formatCurrency(order.totalPayment)}
          </p>
        </div>
        <div>
          {order.status === 'Processing' && (
            <button className='rounded-md border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50'>
              Cancel Order
            </button>
          )}
          {order.status === 'Delivered' && (
            <button className='rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800'>
              Complete Order
            </button>
          )}
          {order.status === 'Completed' && (
            <button className='rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800'>
              Give Review
            </button>
          )}
          {/* Untuk status Cancelled, tidak ada tombol aksi */}
        </div>
      </div>
    </div>
  );
};

// ****************************
// Komponen Utama OrderList
// ****************************
const OrderList: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<
    'All Order' | 'Processing' | 'Delivered' | 'Completed' | 'Cancelled'
  >('All Order');

  const filteredOrders = dummyOrders.filter((order) => {
    if (activeTab === 'All Order') return true;
    return order.status === activeTab;
  });

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-8 lg:px-8'>
        <div className='flex flex-col gap-8 lg:flex-row'>
          {/* Kolom Kiri: Sidebar Pengguna */}
          <aside className='w-full rounded-lg bg-white p-6 shadow-md lg:w-1/4'>
            <div className='mb-6 flex items-center'>
              <div className='mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200'>
                <UserIcon className='h-6 w-6 text-gray-500' />
              </div>
              <div>
                <p className='font-semibold text-gray-800'>John Doe</p>
                <p className='text-sm text-gray-500'>john.doe@example.com</p>
              </div>
            </div>

            <nav className='space-y-2'>
              <a
                href='#'
                className='flex items-center rounded-lg bg-red-50 p-3 font-medium text-red-600'
              >
                <ShoppingCartIcon className='mr-3 h-5 w-5' />
                Order List
              </a>
              <a
                href='#'
                className='flex items-center rounded-lg p-3 text-gray-700 hover:bg-gray-50'
              >
                <StarIcon className='mr-3 h-5 w-5' />
                Review
              </a>
              <a
                href='#'
                className='flex items-center rounded-lg p-3 text-gray-700 hover:bg-gray-50'
              >
                <LogOutIcon className='mr-3 h-5 w-5' />
                Logout
              </a>
            </nav>
          </aside>

          {/* Kolom Kanan: Daftar Pesanan */}
          <main className='w-full rounded-lg bg-white p-6 shadow-md lg:w-3/4'>
            <h1 className='mb-6 text-2xl font-bold text-gray-800'>
              Order List
            </h1>

            {/* Search Bar */}
            <div className='relative mb-6'>
              <input
                type='text'
                placeholder='Search'
                className='w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              <SearchIcon className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
            </div>

            {/* Tabs Filter */}
            <div className='mb-6 flex overflow-x-auto border-b border-gray-200'>
              {[
                'All Order',
                'Processing',
                'Delivered',
                'Completed',
                'Cancelled',
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-b-2 border-red-600 text-red-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Daftar Order */}
            <div>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <p className='py-10 text-center text-gray-500'>
                  No orders found with status "{activeTab}".
                </p>
              )}
            </div>

            {/* Paginasi */}
            <div className='mt-6 flex items-center justify-between text-sm text-gray-600'>
              <span>Showing 1 to 10 of 60 entities</span>
              <div className='flex items-center space-x-2'>
                <button className='rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50'>
                  Previous
                </button>
                <span className='rounded-md bg-red-600 px-3 py-1 text-white'>
                  1
                </span>
                <button className='rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50'>
                  2
                </button>
                <button className='rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50'>
                  3
                </button>
                <span className='px-3 py-1'>...</span>
                <button className='rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50'>
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
