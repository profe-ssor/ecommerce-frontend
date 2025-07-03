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

// Helper function to construct Cloudinary image URLs based on category
export const getCloudinaryImageUrl = (imagePath: string, category?: string): string => {
  console.log('🔍 Processing image:', { imagePath, category });
  
  if (!imagePath) {
    console.log('❌ Empty imagePath, using fallback');
    // Use your provided fallback image
    return 'https://res.cloudinary.com/dhicyzdr5/image/upload/v1/ecommerce/kids-baby/photo_2025-03-20_20-20-15_tu3lsb';
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    console.log('🌐 Already a full URL:', imagePath);
    return imagePath;
  }
  
  // Map categories to folder names in Cloudinary
  const categoryFolderMap: { [key: string]: string } = {
    'dresses': 'dresses',
    'women': 'women',
    'men': 'men',
    'beauty & accessories': 'beauty-accessories',
    'kids & baby': 'kids-baby',
    'home': 'home',
    'shoes': 'shoes',
    'accessories': 'accessories',
    'jewelry': 'jewelry',
    'handbags': 'handbags',
    'makeup': 'makeup',
    'skincare': 'skincare',
  };
  
  // Get the folder name based on category, default to 'general' if not found
  const categoryKey = category?.toLowerCase();
  const folderName = categoryKey ? categoryFolderMap[categoryKey] || 'general' : 'general';
  
  // Construct the full Cloudinary URL
  const fullUrl = `${CLOUD_BASE_URL}${folderName}/${imagePath}`;
  
  console.log('🎯 Generated Cloudinary URL:', {
    category,
    folderName,
    imagePath,
    fullUrl
  });
  
  return fullUrl;
};

// Backend product type definition (based on your API structure)
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

// Transform backend product data to frontend format with Cloudinary image URLs
const transformProduct = (backendProduct: BackendProduct): Product => {
  console.log('🔄 Transforming product:', backendProduct.name);
  
  // Process main image
  const mainImage = getCloudinaryImageUrl(backendProduct.image, backendProduct.category);
  
  // Process additional images if they exist
  const additionalImages = backendProduct.images 
    ? backendProduct.images.map((img: string) => getCloudinaryImageUrl(img, backendProduct.category))
    : [mainImage]; // Fallback to main image if no additional images
  
  const transformedProduct: Product = {
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
    is_new: backendProduct.is_new || false,
    is_featured: backendProduct.is_featured || false,
    rating: backendProduct.rating || 4.0,
    review_count: backendProduct.review_count || 0,
    description: backendProduct.description || '',
    tags: backendProduct.tags || [],
    color_names: (backendProduct as any).color_names || [],
    category_names: (backendProduct as any).category_names || [],
    size_names: (backendProduct as any).size_names || [],
  };
  
  console.log('✅ Product transformed:', {
    name: transformedProduct.name,
    mainImage: transformedProduct.image,
    imageCount: transformedProduct.images.length
  });
  
  return transformedProduct;
};

export const getProducts = async (filters: ProductFilters = {}): Promise<ProductResponse> => {
  try {
    console.log('📡 Fetching products with filters:', filters);
    
    // Build query parameters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    console.log('🔗 API call URL:', `/products/api/products/?${params.toString()}`);
    
    const response = await api.get(`/products/api/products/?${params.toString()}`);
    const data = response.data;

    console.log('📦 Raw API response:', {
      count: data.count,
      resultsLength: data.results?.length || 0,
      hasNext: !!data.next,
      hasPrevious: !!data.previous
    });

    // Handle different response formats
    const rawResults = Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : [];

    // Transform all products with Cloudinary image URLs
    const transformedResults = rawResults.map(transformProduct);

    const finalResponse: ProductResponse = {
      count: data.count ?? rawResults.length,
      next: data.next ?? null,
      previous: data.previous ?? null,
      results: transformedResults,
    };

    console.log('✅ Products fetched successfully:', {
      totalCount: finalResponse.count,
      returnedCount: finalResponse.results.length,
      hasNext: !!finalResponse.next
    });

    return finalResponse;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: string | number): Promise<Product> => {
  try {
    const response = await api.get(`/products/api/products/${slug}/`);

    return transformProduct(response.data);
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    console.log('📡 Fetching categories');
    const response = await api.get('/products/api/categories/');
    console.log('✅ Categories fetched successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    console.log('📡 Fetching brands');
    const response = await api.get('/products/api/brands/');
    console.log('✅ Brands fetched successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching brands:', error);
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    console.log('📡 Fetching featured products');
    const response = await api.get('/products/api/products/?is_featured=true&page_size=8');
    const transformedProducts = response.data.results.map(transformProduct);
    console.log('✅ Featured products fetched:', transformedProducts.length);
    return transformedProducts;
  } catch (error) {
    console.error('❌ Error fetching featured products:', error);
    throw error;
  }
};

export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    console.log('📡 Fetching new arrivals');
    const response = await api.get('/products/api/products/?is_new=true&page_size=8');
;
    return response.data.results.map(transformProduct);
  } catch (error) {
    console.error('❌ Error fetching new arrivals:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    console.log('📡 Searching products:', query);
    const response = await api.get(`/products/api/products/?search=${encodeURIComponent(query)}`);
    const transformedProducts = response.data.results.map(transformProduct);
    console.log('✅ Search completed:', transformedProducts.length, 'results');
    return transformedProducts;
  } catch (error) {
    console.error('❌ Error searching products:', error);
    throw error;
  }
};