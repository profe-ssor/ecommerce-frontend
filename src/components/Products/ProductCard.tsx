import React, { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';

import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { addToCart } from '../../services/cartServices';
import { addToWishlist, removeFromWishlist } from '../../services/wishlistServices';
import { getProductImageUrl } from '../../utils/cloudinary';
import { toast } from 'react-toastify';

import type { Product } from '../../types';
import { getColorHex } from '../../utils/colorMap';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { state, fetchCart, fetchWishlist } = useApp();
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isInWishlist = state.wishlist.includes(product.id);
  const discountPercentage = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const imageUrl = getProductImageUrl(product.image, product.category);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(parseInt(product.id));
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(parseInt(product.id));
        toast.success('Added to wishlist');
      }

      await fetchWishlist();
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCart(parseInt(product.id), 1, product.sizes[0], product.colors[0]);
      toast.success('Added to cart');
      await fetchCart();
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <img
          src={imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.is_new && (
            <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded">NEW</span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-deep-blue text-white text-xs font-medium px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isInWishlist
              ? 'bg-primary text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-primary'
          }`}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Add to Cart */}
        <div
          className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <ShoppingCart size={16} />
            <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
      <div className="mb-2 space-y-1">
  {product.subcategory && (
    <p className="text-sm text-gray-600">{product.subcategory}</p>
  )}
  <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
    {product.name}
  </h3>
</div>


        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.review_count})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.compare_price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.compare_price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors.length > 1 && (
          <div className="flex items-center space-x-1 mt-2">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: getColorHex(color) }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
