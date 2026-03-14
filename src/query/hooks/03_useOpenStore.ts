import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createStore } from '../services/03_storeService';
import { StoreInput, StoreResponse } from '../types/03_storeType';

export const useOpenStore = () => {
  const form = useForm<StoreInput>({
    defaultValues: {
      storeName: '',
      storeDomain: '',
      city: '',
      postalCode: '',
      address: '',
    },
  });

  // Mutation v5
  const mutation = useMutation({
    mutationFn: createStore,
  });

  const onSubmit = (data: StoreInput) => {
    mutation.mutate(data, {
      onSuccess: (res: StoreResponse) => {
        console.log('Store created:', res);
      },
      onError: (err: any) => {
        console.error('Error creating store:', err.message ?? err);
      },
    });
  };

  // ✅ isPending untuk tombol loading
  const isPending = mutation.status === 'pending';

  return {
    ...form,
    handleSubmit: form.handleSubmit,
    onSubmit,
    isPending,
  };
};
