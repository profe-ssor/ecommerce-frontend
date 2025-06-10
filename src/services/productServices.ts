import api from './api';
import type { Product } from '../types';

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface ProductFilters {
  category?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  brand?: string;
  size?: string;
  color?: string;
  is_new?: boolean;
  is_featured?: boolean;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export const getProducts = async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });

  const response = await api.get<ProductsResponse>(`/api/products/?${params.toString()}`);
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/api/products/${id}/`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/api/categories/');
  return response.data;
};

export const getBrands = async () => {
  const response = await api.get('/api/brands/');
  return response.data;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>('/api/products/?is_featured=true');
  return response.data.results;
};

export const getNewArrivals = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>('/api/products/?is_new=true');
  return response.data.results;
};