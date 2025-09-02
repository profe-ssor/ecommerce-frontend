import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from '../services/wishlistServices';
import { addToCart } from '../services/cartServices';
import { toast } from 'react-toastify';
import { Heart, ShoppingCart } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { state, fetchWishlist, fetchCart } = useApp();
  const navigate = useNavigate();
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Use wishlistProducts directly from state
  const wishlistProducts = state.wishlistProducts;

  const handleRemove = async (productId: string) => {
    setRemovingId(productId);
    try {
      await removeFromWishlist(parseInt(productId));
      toast.success('Removed from wishlist');
      await fetchWishlist();
    } catch {
      toast.error('Failed to remove from wishlist');
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (product: any) => {
    setAddingToCartId(product.id);
    try {
      await addToCart(parseInt(product.id), 1, product.sizes[0], product.colors[0]);
      toast.success('Added to cart');
      await fetchCart();
    } catch {
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCartId(null);
    }
  };

  if (state.isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Loading your wishlist...</h2>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600">Browse products and add them to your wishlist!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center font-buttershine">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistProducts.map(product => (
          <div key={product.id} className="bg-white rounded-3xl shadow-xl p-6 flex flex-col transition-transform hover:scale-[1.02] border border-gray-100 relative group">
            <div className="relative cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-2xl mb-4 shadow group-hover:shadow-lg transition" />
              {product.is_new && (
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">NEW</span>
              )}
              {product.is_featured && (
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">FEATURED</span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2 mt-2">
              <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-red-600">${product.price.toFixed(2)}</span>
                {product.compare_price && (
                  <span className="text-base text-gray-400 line-through">${product.compare_price.toFixed(2)}</span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">{product.category}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">{product.brand}</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleAddToCart(product)}
                disabled={addingToCartId === product.id}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-bold text-base shadow hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                {addingToCartId === product.id ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                onClick={() => handleRemove(product.id)}
                disabled={removingId === product.id}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-bold text-base shadow border-2 border-red-400 text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                <Heart size={18} fill="currentColor" />
                {removingId === product.id ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage; 