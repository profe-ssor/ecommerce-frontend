import { api } from './api';
import type { Product } from '../types';

// Import mock data as fallback
import { mockProducts } from '../data/mockProducts';

export interface ProductFilters {
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

// Check if backend is available
const isBackendAvailable = async (): Promise<boolean> => {
  try {
    await api.get('/api/health/', { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
};

// Filter mock products based on filters
const filterMockProducts = (products: Product[], filters: ProductFilters): Product[] => {
  let filtered = [...products];

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Category filter
  if (filters.category) {
    filtered = filtered.filter(product => 
      product.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  // Price range filter
  if (filters.min_price !== undefined) {
    filtered = filtered.filter(product => product.price >= filters.min_price!);
  }
  if (filters.max_price !== undefined) {
    filtered = filtered.filter(product => product.price <= filters.max_price!);
  }

  // Sorting
  if (filters.ordering) {
    switch (filters.ordering) {
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case '-price':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case '-name':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case '-created_at':
        // For mock data, we'll use a random sort for "newest"
        filtered.sort(() => Math.random() - 0.5);
        break;
      case '-rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
  }

  return filtered;
};

// Paginate results
const paginateResults = (products: Product[], page: number = 1, pageSize: number = 12) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return products.slice(startIndex, endIndex);
};

export const getProducts = async (filters: ProductFilters = {}): Promise<ProductResponse> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.min_price !== undefined) params.append('min_price', filters.min_price.toString());
      if (filters.max_price !== undefined) params.append('max_price', filters.max_price.toString());
      if (filters.ordering) params.append('ordering', filters.ordering);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.page_size) params.append('page_size', filters.page_size.toString());

      const response = await api.get(`/api/products/?${params.toString()}`);
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock data:', error);
  }

  // Fallback to mock data
  const filtered = filterMockProducts(mockProducts, filters);
  const page = filters.page || 1;
  const pageSize = filters.page_size || 12;
  const paginatedResults = paginateResults(filtered, page, pageSize);

  return {
    count: filtered.length,
    next: page * pageSize < filtered.length ? `page=${page + 1}` : null,
    previous: page > 1 ? `page=${page - 1}` : null,
    results: paginatedResults,
  };
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    // First try to use the backend API
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      const response = await api.get(`/api/products/${id}/`);
      return response.data;
    }
  } catch (error) {
    console.warn('Backend API not available, using mock data:', error);
  }

  // Fallback to mock data
  const product = mockProducts.find(p => p.id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};