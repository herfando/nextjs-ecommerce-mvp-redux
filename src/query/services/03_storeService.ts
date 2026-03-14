// query/services/storeService.ts
import { StoreInput, StoreResponse } from '../types/03_storeType';
import axiosInstance from '../axiosInstance';

export const createStore = async (data: StoreInput): Promise<StoreResponse> => {
  const { data: res } = await axiosInstance.post<StoreResponse>(
    '/api/stores',
    data
  );
  return res;
};
