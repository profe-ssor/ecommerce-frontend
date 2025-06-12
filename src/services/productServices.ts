import { api } from './api';
import type { Product } from '../types';

// Cloudinary configuration
const CLOUD_BASE_URL = 'https://res.cloudinary.com/dhicyzdr5/image/upload/v1749684375/ecommerce/';

export interface ProductFilters {
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
  brand?: string;
  size?: string;
  color?: string;
  is_new?: boolean;
  is_featured?: boolean;
}

export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

// Helper function to construct Cloudinary image URLs
export const getCloudinaryImageUrl = (imagePath: string, category?: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Construct Cloudinary URL with category folder
  const categoryFolder = category ? `${category.toLowerCase().replace(/\s+/g, '_')}/` : '';
  return `${CLOUD_BASE_URL}${categoryFolder}${imagePath}`;
};

// Transform backend product data to frontend format
const transformProduct = (backendProduct: any): Product => {
  return {
    id: backendProduct.id.toString(),
    name: backendProduct.name,
    brand: backendProduct.brand || 'Unknown Brand',
    price: parseFloat(backendProduct.price),
    compareAtPrice: backendProduct.compare_at_price ? parseFloat(backendProduct.compare_at_price) : undefined,
    image: getCloudinaryImageUrl(backendProduct.image, backendProduct.category),
    images: backendProduct.images ? backendProduct.images.map((img: string) => 
      getCloudinaryImageUrl(img, backendProduct.category)
    ) : [getCloudinaryImageUrl(backendProduct.image, backendProduct.category)],
    category: backendProduct.category,
    subcategory: backendProduct.subcategory || '',
    colors: backendProduct.colors || [],
    sizes: backendProduct.sizes || [],
    isNew: backendProduct.is_new || false,
    isFeatured: backendProduct.is_featured || false,
    rating: backendProduct.rating || 4.0,
    reviewCount: backendProduct.review_count || 0,
    description: backendProduct.description || '',
    tags: backendProduct.tags || [],
  };
};

export const getProducts = async (filters: ProductFilters = {}): Promise<ProductResponse> => {
  try {
    const params = new URLSearchParams();
    
    // Add filters to params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/api/products/?${params.toString()}`);
    
    return {
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      results: response.data.results.map(transformProduct),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/api/products/${id}/`);
    return transformProduct(response.data);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/api/products/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const response = await api.get('/api/products/brands/');
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/api/products/?is_featured=true&page_size=8');
    return response.data.results.map(transformProduct);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/api/products/?is_new=true&page_size=8');
    return response.data.results.map(transformProduct);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/api/products/?search=${encodeURIComponent(query)}`);
    return response.data.results.map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};