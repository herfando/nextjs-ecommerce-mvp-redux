'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/lib/context/auth_context';
import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ Validasi form pakai Zod
const storeSchema = z.object({
  storeName: z.string().min(3, 'Store name is required'),
  storeDomain: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  address: z.string().optional(),
});

export type StoreFormData = z.infer<typeof storeSchema>;

export function useOpenStore() {
  const form = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: '',
      storeDomain: '',
      city: '',
      postalCode: '',
      address: '',
    },
  });

  const { user, setUser } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: StoreFormData) => {
    try {
      setIsPending(true);

      const res = await fetch(`${API_BASE}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.storeName,
          domain: data.storeDomain,
          city: data.city,
          postalCode: data.postalCode,
          address: data.address,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create store');
      }

      const apiData = await res.json();

      // update auth context
      setUser((prev) => ({
        ...prev!,
        hasStore: true,
        storeName: apiData.name,
        avatar: apiData.logo || null,
      }));

      toast.success('Store created successfully!');
      router.push('/05_home/afterstore');
    } catch (err) {
      console.error('❌ Error creating store:', err);
      toast.error('Failed to create store');
    } finally {
      setIsPending(false);
    }
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit,
    onSubmit,
    isPending,
  };
}
