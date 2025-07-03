const CLOUD_NAME = 'dhicyzdr5';
<<<<<<< HEAD
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
=======
>>>>>>> 86e80f2 (Stating Hosting)

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
  
<<<<<<< HEAD
  // Define transformation presets for different sizes
=======
  if (!imagePath) {
    console.log('❌ Empty imagePath, returning empty string');
    return '';
  }
  
  // If it's already a full URL from Django, handle transformations
  if (imagePath.startsWith('http://res.cloudinary.com/') || 
      imagePath.startsWith('https://res.cloudinary.com/')) {
    console.log('🌐 Already a full URL from Django:', imagePath);
    
    // For original size, return as-is
    if (size === 'original') {
      return imagePath;
    }
    
    // Add transformations
    const transformations = {
      thumbnail: 'w_200,h_200,c_fill,q_auto,f_auto',
      medium: 'w_400,h_400,c_fill,q_auto,f_auto',
      large: 'w_800,h_800,c_fill,q_auto,f_auto',
    };
    
    const transform = transformations[size as keyof typeof transformations];
    if (!transform) {
      return imagePath;
    }
    
    // Insert transformations into the URL
    const urlParts = imagePath.split('/upload/');
    if (urlParts.length === 2) {
      const baseUrl = urlParts[0] + '/upload/';
      const pathWithVersion = urlParts[1];
      const transformedUrl = `${baseUrl}${transform}/${pathWithVersion}`;
      console.log('🔧 Added transformations:', transformedUrl);
      return transformedUrl;
    }
    
    // If we can't parse, return original
    return imagePath;
  }
  
  // If it's a public_id, build the URL
  console.log('🔨 Building URL from public_id:', imagePath);
  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;
  
  if (size === 'original') {
    return `${baseUrl}${imagePath}`;
  }
  
>>>>>>> 86e80f2 (Stating Hosting)
  const transformations = {
    thumbnail: 'w_200,h_200,c_fill,q_auto,f_auto',
    medium: 'w_400,h_400,c_fill,q_auto,f_auto',
    large: 'w_800,h_800,c_fill,q_auto,f_auto',
  };
  
  const transform = transformations[size as keyof typeof transformations];
  
  // Insert /v1/ after /upload/ if not present
  let pathWithVersion = imagePath;
  if (!imagePath.startsWith('v') && !imagePath.includes('/v')) {
    pathWithVersion = `v1/${imagePath}`;
  }
  
  const finalUrl = `${baseUrl}${transform}/${pathWithVersion}`;
  console.log('🎯 Built URL:', finalUrl);
  return finalUrl;
};

<<<<<<< HEAD
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
=======
// Even simpler - just return what Django gives you
export const getSimpleImageUrl = (imagePath: string): string => {
  return imagePath || '';
>>>>>>> 86e80f2 (Stating Hosting)
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
  getSimpleImageUrl,
};