'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  ListOrdered,
  Star,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Store,
} from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: <Package size={18} />, label: 'Total Product', value: '24' },
    { icon: <ListOrdered size={18} />, label: 'Total Orders', value: '13' },
    {
      icon: <LayoutDashboard size={18} />,
      label: 'Total Revenue',
      value: 'Rp1.920.000',
    },
    { icon: <Star size={18} />, label: 'Completed Orders', value: '8' },
  ];

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { name: 'Products', icon: <Package size={16} /> },
    { name: 'Order List', icon: <ListOrdered size={16} /> },
    { name: 'Reviews', icon: <Star size={16} /> },
    { name: 'Settings', icon: <Settings size={16} /> },
  ];

  // Klik di luar dropdown menutup dropdown profile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex min-h-screen bg-gray-100 font-sans'>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 border-r bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between border-b p-4'>
          <h1 className='flex items-center gap-2 text-sm font-semibold'>
            <span className='text-lg'>🌞</span> Shirt Seller
          </h1>
          <button className='lg:hidden' onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className='flex flex-col gap-2 p-3'>
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                i === 0 ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div className='mt-auto flex cursor-pointer items-center gap-2 border-t p-3 text-sm text-pink-500'>
          <LogOut size={16} /> Logout
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className='flex-1 p-4 lg:ml-60'>
        {/* Header */}
        <header className='relative flex items-center justify-between rounded-md bg-white p-3 shadow-sm'>
          <div className='flex items-center gap-2'>
            <button className='lg:hidden' onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className='text-base font-semibold'>Dashboard</h2>
          </div>

          {/* Profile Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className='flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 shadow-sm transition hover:bg-gray-50'
            >
              <Image
                src='/assets/profile.png'
                alt='Profile'
                width={28}
                height={28}
                className='rounded-full'
              />
              <span className='text-sm font-medium text-gray-800'>
                John Doe
              </span>
              {profileOpen ? (
                <ChevronUp size={16} className='text-gray-600' />
              ) : (
                <ChevronDown size={16} className='text-gray-600' />
              )}
            </button>

            {profileOpen && (
              <div className='animate-fadeIn absolute right-0 z-50 mt-2 w-56 rounded-md border bg-white p-3 shadow-lg'>
                <div className='mb-2 flex items-center gap-3'>
                  <Image
                    src='/assets/profile.png'
                    alt='Profile'
                    width={40}
                    height={40}
                    className='rounded-full'
                  />
                  <div>
                    <p className='text-sm font-medium text-gray-800'>
                      John Doe
                    </p>
                    <p className='flex items-center gap-1 text-xs text-gray-500'>
                      <Store size={12} />
                      Toko Barokah Jaya
                    </p>
                  </div>
                </div>
                <button className='mt-2 w-full rounded-md border py-1.5 text-xs font-medium transition hover:bg-gray-50'>
                  Back to Buyer Account
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Stats Content */}
        <section className='mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat, i) => (
            <div
              key={i}
              className='rounded-md border bg-white p-4 text-sm shadow-sm'
            >
              <div className='mb-1 flex items-center gap-2 text-gray-600'>
                {stat.icon}
                <span>{stat.label}</span>
              </div>
              <p
                className={`font-semibold text-gray-800 ${i === 2 ? 'text-base' : ''}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
