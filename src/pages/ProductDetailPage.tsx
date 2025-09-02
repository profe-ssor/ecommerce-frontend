import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { getProduct } from '../services/productServices';
import { addToCart } from '../services/cartServices';
import { addToWishlist, removeFromWishlist } from '../services/wishlistServices';
import { getProductImageUrl } from '../utils/cloudinary';
import { toast } from 'react-toastify';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const { state, fetchCart, fetchWishlist } = useApp();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    getProduct(productId)
      .then(setProduct)
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false));
  }, [productId]);

  const isInWishlist = product ? state.wishlist.includes(product.id) : false;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    if (!product) return;
    setIsAddingToCart(true);
    try {
      await addToCart(parseInt(product.id), 1, product.sizes[0], product.colors[0]);
      toast.success('Added to cart');
      await fetchCart();
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    if (!product) return;
    setIsWishlistLoading(true);
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
      toast.error('Failed to update wishlist');
    } finally {
      setIsWishlistLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  const imageUrl = getProductImageUrl(product.image, product.category);
  const price = typeof product.price === 'number' ? product.price : parseFloat(product.price as string);
  const comparePrice = product.compare_price ? (typeof product.compare_price === 'number' ? product.compare_price : parseFloat(product.compare_price as string)) : null;
  const discountPercentage = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-3xl shadow-2xl mt-8 mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <img src={imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            {discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">-{discountPercentage}%</span>
            )}
            {product.is_new && (
              <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">NEW</span>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 font-buttershine">{product.name}</h1>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-red-600">${price.toFixed(2)}</span>
            {comparePrice && (
              <span className="text-xl text-gray-400 line-through">${comparePrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.review_count} reviews)</span>
          </div>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">{product.description}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">Category: {product.category}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">Brand: {product.brand}</span>
            <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">Stock: {product.stock}</span>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold text-lg shadow hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <ShoppingCart size={22} />
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg shadow transition-colors border-2 ${isInWishlist ? 'bg-red-100 text-red-600 border-red-400' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              <Heart size={22} fill={isInWishlist ? 'currentColor' : 'none'} className={isInWishlist ? 'text-red-600' : ''} />
              {isWishlistLoading ? (isInWishlist ? 'Removing...' : 'Adding...') : isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 