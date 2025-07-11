import React, { useState } from 'react';
import { getProductImageUrl } from '../../utils/cloudinary';
import type { Product } from '../../types';

interface SimpleProductCardProps {
  product: Product;
}

export function SimpleProductCard({ product }: SimpleProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = getProductImageUrl(product.image, product.category);
  const price = typeof product.price === 'number' ? product.price : parseFloat(product.price as string);
  const comparePrice = product.compare_price ? (typeof product.compare_price === 'number' ? product.compare_price : parseFloat(product.compare_price as string)) : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg';
          }}
        />
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">
          {product.name}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            ${price.toFixed(2)}
          </span>
          {comparePrice && (
            <span className="text-sm text-gray-400 line-through">
              ${comparePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 