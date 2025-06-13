const CLOUD_NAME = 'dhicyzdr5';
const VERSION = 'v1';
const ROOT_FOLDER = 'ecommerce';
const CLOUD_BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// Folder mapping for different product categories
// This maps frontend category names to Cloudinary folder names
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
  'fragrance': 'fragrance',
  'watches': 'watches',
  'slippers': 'slippers',
  'activewear': 'activewear',
  'blouses': 'blouses',
  'jeans': 'jeans',
  'sweaters': 'sweaters',
  't-shirts': 't-shirts',
  'blazers': 'blazers',
  'shirts': 'shirts',
  'suits': 'suits',
  'polo shirts': 'polo-shirts',
  'pants': 'pants',
  'baby clothes': 'baby-clothes',
  'baby accessories': 'baby-accessories',
  'toys': 'toys',
  'jackets': 'jackets',
  'candles': 'candles',
  'decor': 'decor',
  'wellness': 'wellness',
} as const;

/**
 * Generate Cloudinary image URL with proper folder structure
 * @param imagePath - The image filename or path
 * @param category - Product category to determine folder
 * @param transformations - Optional Cloudinary transformations
 * @returns Complete Cloudinary URL
 */
export const getCloudinaryImageUrl = (
  imagePath: string,
  category?: string,
  transformations?: string
): string => {
  console.log('🔍 Cloudinary URL generation:', { imagePath, category, transformations });
  
  // Return fallback image if no path provided
  if (!imagePath) {
    console.log('❌ Empty imagePath, returning fallback');
    return 'https://res.cloudinary.com/dhicyzdr5/image/upload/v1/ecommerce/kids-baby/photo_2025-03-20_20-20-15_tu3lsb';
  }
  
  // Return as-is if already a full URL
  if (imagePath.startsWith('http')) {
    console.log('🌐 Already a full URL, returning as-is:', imagePath);
    return imagePath;
  }

  // Map category to folder name
  const key = category?.toLowerCase().replace(/\s+/g, ' ') as keyof typeof CATEGORY_FOLDERS;
  const folder = CATEGORY_FOLDERS[key] || 'general';
  const path = `${ROOT_FOLDER}/${folder}/${imagePath}`;
  
  console.log('📁 Folder mapping:', { category, key, folder, path });

  // Build final URL with optional transformations
  const finalUrl = transformations
    ? `${CLOUD_BASE_URL}/${transformations}/${VERSION}/${path}`
    : `${CLOUD_BASE_URL}/${VERSION}/${path}`;
    
  console.log('🎯 Final Cloudinary URL:', finalUrl);
  return finalUrl;
};

/**
 * Get product image URL with size optimization
 * @param imagePath - The image filename or path
 * @param category - Product category to determine folder
 * @param size - Image size preset
 * @returns Optimized Cloudinary URL
 */
export const getProductImageUrl = (
  imagePath: string,
  category?: string,
  size: 'thumbnail' | 'medium' | 'large' | 'original' = 'medium'
): string => {
  console.log('🖼️ Product image URL generation:', { imagePath, category, size });
  
  // Define transformation presets for different sizes
  const transformations = {
    thumbnail: 'w_200,h_200,c_fill,q_auto,f_auto',
    medium: 'w_400,h_400,c_fill,q_auto,f_auto',
    large: 'w_800,h_800,c_fill,q_auto,f_auto',
    original: 'q_auto,f_auto',
  };

  return getCloudinaryImageUrl(imagePath, category, transformations[size]);
};

/**
 * Get optimized image URL with custom parameters
 * @param imagePath - The image filename or path
 * @param category - Product category to determine folder
 * @param options - Custom optimization options
 * @returns Optimized Cloudinary URL
 */
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
  console.log('⚡ Optimized image URL generation:', { imagePath, category, options });
  
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options;

  // Build transformation string
  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);

  return getCloudinaryImageUrl(imagePath, category, transforms.join(','));
};

/**
 * Update all images in your application to use Cloudinary
 * 
 * OVERVIEW FOR UPDATING IMAGES:
 * 
 * 1. FOLDER STRUCTURE IN CLOUDINARY:
 *    - Root folder: ecommerce/
 *    - Category folders: dresses/, women/, men/, kids-baby/, etc.
 *    - Full path example: ecommerce/women/product-image.jpg
 * 
 * 2. HOW TO UPDATE IMAGES:
 *    a) Upload images to Cloudinary in the correct category folders
 *    b) Update your backend database with just the filename (not full URL)
 *    c) The frontend will automatically construct the full Cloudinary URL
 * 
 * 3. EXAMPLE USAGE:
 *    - Backend stores: "elegant-dress.jpg"
 *    - Frontend generates: "https://res.cloudinary.com/dhicyzdr5/image/upload/v1/ecommerce/dresses/elegant-dress.jpg"
 * 
 * 4. FALLBACK IMAGE:
 *    - If no image is provided, uses: https://res.cloudinary.com/dhicyzdr5/image/upload/v1/ecommerce/kids-baby/photo_2025-03-20_20-20-15_tu3lsb
 * 
 * 5. TO ADD NEW CATEGORIES:
 *    - Add new category mapping to CATEGORY_FOLDERS object above
 *    - Create corresponding folder in Cloudinary
 *    - Upload images to the new folder
 * 
 * 6. IMAGE OPTIMIZATION:
 *    - Automatic format conversion (WebP when supported)
 *    - Quality optimization
 *    - Responsive sizing based on usage
 */

export default {
  getCloudinaryImageUrl,
  getProductImageUrl,
  getOptimizedImageUrl,
  CLOUD_BASE_URL,
  CATEGORY_FOLDERS,
};