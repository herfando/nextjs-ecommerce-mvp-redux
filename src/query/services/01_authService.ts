import axiosInstance from '@/query/axiosInstance';
import { endpoints } from '@/query/endpoints.ts';
import { LoginType, RegisterType, User } from '@/query/types/01_authType';

export const loginBuyer = async (payload: LoginType): Promise<User> => {
  const res = await axiosInstance.post(endpoints.auth.buyer.login, payload, {
    withCredentials: true,
  });

  return res.data;
};

export const registerBuyer = async (payload: RegisterType): Promise<User> => {
  const res = await axiosInstance.post(endpoints.auth.buyer.register, payload, {
    withCredentials: true,
  });

  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await axiosInstance.get(endpoints.users, {
    withCredentials: true,
  });

  return res.data;
};
