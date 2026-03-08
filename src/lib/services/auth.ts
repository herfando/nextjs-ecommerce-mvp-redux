// src/services/auth.ts
import { axiosInstance } from '@/query/axiosInstance';
import { endpoints } from '@/query/endpoints.ts';

export const auth = {
  buyerLogin: async (payload: { email: string; password: string }) => {
    const res = await axiosInstance.post(endpoints.auth.buyer.login, payload);
    return res.data;
  },

  buyerRegister: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await axiosInstance.post(
      endpoints.auth.buyer.register,
      payload
    );
    return res.data;
  },

  sellerLogin: async (payload: { email: string; password: string }) => {
    const res = await axiosInstance.post(endpoints.auth.seller.login, payload);
    return res.data;
  },

  sellerRegister: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await axiosInstance.post(
      endpoints.auth.seller.register,
      payload
    );
    return res.data;
  },
};
