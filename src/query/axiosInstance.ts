// query/axiosInstance.ts
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// ===== Base URL dari env =====
const rawBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const baseURL = rawBase.replace(/\/+$/, ''); // hapus trailing slash

// ===== Axios Instance =====
export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
  withCredentials: false,
});

// ===== Request Interceptor =====
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== Response Interceptor =====
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO: bisa implement refresh token di sini
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
