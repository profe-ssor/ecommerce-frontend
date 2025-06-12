// Cloudinary utility functions
const CLOUD_BASE_URL = 'https://res.cloudinary.com/dhicyzdr5/image/upload/v1749684375/ecommerce/';

// Category folder mapping
const CATEGORY_FOLDERS = {
  'dresses': 'dresses',
  'women': 'women',
  'men': 'men',
  'beauty & accessories': 'beauty_accessories',
  'kids & baby': 'kids_baby',
  'home': 'home',
  'shoes': 'shoes',
  'accessories': 'accessories',
  'jewelry': 'jewelry',
  'handbags': 'handbags',
  'makeup': 'makeup',
  'skincare': 'skincare',
} as const;

export const getCloudinaryImageUrl = (
  imagePath: string, 
  category?: string,
  transformations?: string
): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Get category folder
  const categoryKey = category?.toLowerCase().replace(/\s+/g, ' ') as keyof typeof CATEGORY_FOLDERS;
  const categoryFolder = CATEGORY_FOLDERS[categoryKey] || 'general';
  
  // Build URL with optional transformations
  const baseUrl = `${CLOUD_BASE_URL}${categoryFolder}/`;
  
  if (transformations) {
    // Insert transformations before the image path
    return `${CLOUD_BASE_URL}${transformations}/${categoryFolder}/${imagePath}`;
  }
  
  return `${baseUrl}${imagePath}`;
};

// Common image transformations
export const getProductImageUrl = (
  imagePath: string, 
  category?: string, 
  size: 'thumbnail' | 'medium' | 'large' | 'original' = 'medium'
): string => {
  const transformations = {
    thumbnail: 'w_200,h_200,c_fill,q_auto,f_auto',
    medium: 'w_400,h_400,c_fill,q_auto,f_auto',
    large: 'w_800,h_800,c_fill,q_auto,f_auto',
    original: 'q_auto,f_auto'
  };
  
  return getCloudinaryImageUrl(imagePath, category, transformations[size]);
};

// Get optimized image for different use cases
export const getOptimizedImageUrl = (
  imagePath: string,
  category?: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale' | 'crop';
  } = {}
): string => {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options;
  
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);
  
  return getCloudinaryImageUrl(imagePath, category, transformations.join(','));
};

export default {
  getCloudinaryImageUrl,
  getProductImageUrl,
  getOptimizedImageUrl,
  CLOUD_BASE_URL,
  CATEGORY_FOLDERS,
};