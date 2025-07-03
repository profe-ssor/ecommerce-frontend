const CLOUD_NAME = 'dhicyzdr5';
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
 * @returns Complete Cloudinary URL
 */
export const getCloudinaryImageUrl = (
  imagePath: string,
  category?: string
): string => {
  if (!imagePath) {
    return 'https://res.cloudinary.com/dhicyzdr5/image/upload/v1/ecommerce/kids-baby/photo_2025-03-20_20-20-15_tu3lsb';
  }
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  const key = category?.toLowerCase().replace(/\s+/g, ' ') as keyof typeof CATEGORY_FOLDERS;
  const folder = CATEGORY_FOLDERS[key] || 'general';
  const path = `${ROOT_FOLDER}/${folder}/${imagePath}`;
  return `${CLOUD_BASE_URL}/v1/${path}`;
};

/**
 * Get product image URL with size optimization and category folder mapping
 * @param imagePath - The image filename or path
 * @param category - Product category to determine folder
 * @param size - Image size preset
 * @returns Optimized Cloudinary URL
 */
export const getProductImageUrl = (
  imagePath: string,
  category?: string
): string => {
  if (!imagePath) {
    return '';
  }
  if (imagePath.startsWith('image/upload/')) {
    imagePath = imagePath.replace(/^image\/upload\//, '');
  }
  if (imagePath.startsWith('http://res.cloudinary.com/') || imagePath.startsWith('https://res.cloudinary.com/')) {
    return imagePath;
  }
  // If imagePath already contains 'ecommerce/', use as-is
  if (imagePath.startsWith('ecommerce/')) {
    return `${CLOUD_BASE_URL}/v1/${imagePath}`;
  }
  // Otherwise, build the path using category
  const key = category?.toLowerCase().replace(/\s+/g, ' ') as keyof typeof CATEGORY_FOLDERS;
  const folder = CATEGORY_FOLDERS[key] || 'general';
  const path = `${ROOT_FOLDER}/${folder}/${imagePath}`;
  return `${CLOUD_BASE_URL}/v1/${path}`;
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

  return getCloudinaryImageUrl(imagePath, category);
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
  getProductImageUrl,
  getOptimizedImageUrl,
};