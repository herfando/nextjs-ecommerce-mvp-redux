import api from '@/query/axiosInstance';

export const productService = {
  async getAll() {
    const response = await api.get('/buyer/products');
    return response.data;
  },
  async getById(id: number) {
    const response = await api.get(`/buyer/products/${id}`);
    return response.data;
  },
};
