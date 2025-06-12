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

// Backend product type definition
interface BackendProduct {
  id: string | number;
  name: string;
  brand?: string;
  price: string | number;
  compare_at_price?: string | number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  colors?: string[];
  sizes?: string[];
  is_new?: boolean;
  is_featured?: boolean;
  rating?: number;
  review_count?: number;
  description?: string;
  tags?: string[];
}

// Transform backend product data to frontend format
const transformProduct = (backendProduct: BackendProduct): Product => {
  return {
    id: backendProduct.id.toString(),
    name: backendProduct.name,
    brand: backendProduct.brand || 'Unknown Brand',
    price: parseFloat(backendProduct.price as string),
    compareAtPrice: backendProduct.compare_at_price ? parseFloat(backendProduct.compare_at_price as string) : undefined,
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

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/products/api/products/?${params.toString()}`);
    const data = response.data;

    const rawResults = Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : [];

    return {
      count: data.count ?? rawResults.length,
      next: data.next ?? null,
      previous: data.previous ?? null,
      results: rawResults.map(transformProduct),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const getProduct = async (slug: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/api/products/${slug}/`);

    return transformProduct(response.data);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/products/api/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const response = await api.get('/products/api/brands/');

    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products/api/products/?is_featured=true&page_size=8');
    return response.data.results.map(transformProduct);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products/api/products/?is_new=true&page_size=8');
;
    return response.data.results.map(transformProduct);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/products/api/products/?search=${encodeURIComponent(query)}`);

    return response.data.results.map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};