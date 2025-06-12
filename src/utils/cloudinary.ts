const CLOUD_NAME = 'dhicyzdr5';
const VERSION = 'v1';
const ROOT_FOLDER = 'ecommerce';
const CLOUD_BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// Folder mapping
const CATEGORY_FOLDERS = {
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
} as const;

export const getCloudinaryImageUrl = (
  imagePath: string,
  category?: string,
  transformations?: string
): string => {
  console.log('🔍 Input params:', { imagePath, category, transformations });
  
  if (!imagePath) {
    console.log('❌ Empty imagePath, returning empty string');
    return '';
  }
  
  if (imagePath.startsWith('http')) {
    console.log('🌐 Already a full URL, returning as-is:', imagePath);
    return imagePath;
  }

  const key = category?.toLowerCase().replace(/\s+/g, ' ') as keyof typeof CATEGORY_FOLDERS;
  const folder = CATEGORY_FOLDERS[key] || 'general';
  const path = `${ROOT_FOLDER}/${folder}/${imagePath}`;
  
  console.log('📁 Folder mapping:', { category, key, folder, path });

  const finalUrl = transformations
    ? `${CLOUD_BASE_URL}/${transformations}/${VERSION}/${path}`
    : `${CLOUD_BASE_URL}/${VERSION}/${path}`;
    
  console.log('🎯 Final URL:', finalUrl);
  return finalUrl;
};

export const getProductImageUrl = (
  imagePath: string,
  category?: string,
  size: 'thumbnail' | 'medium' | 'large' | 'original' = 'medium'
): string => {
  console.log('🖼️ getProductImageUrl called:', { imagePath, category, size });
  
  const transformations = {
    thumbnail: 'w_200,h_200,c_fill,q_auto,f_auto',
    medium: 'w_400,h_400,c_fill,q_auto,f_auto',
    large: 'w_800,h_800,c_fill,q_auto,f_auto',
    original: 'q_auto,f_auto',
  };

  return getCloudinaryImageUrl(imagePath, category, transformations[size]);
};

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
  console.log('⚡ getOptimizedImageUrl called:', { imagePath, category, options });
  
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options;

  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);

  return getCloudinaryImageUrl(imagePath, category, transforms.join(','));
};

export default {
  getCloudinaryImageUrl,
  getProductImageUrl,
  getOptimizedImageUrl,
  CLOUD_BASE_URL,
  CATEGORY_FOLDERS,
};