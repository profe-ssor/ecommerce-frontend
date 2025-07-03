import { useEffect, useState } from 'react';


import { getCart, updateCartItem, addToCart as addToCartService} from '../services/cartServices';
import type { CartItem } from '../types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      const extractCategoryFromImage = (imagePath: string): string => {
        // Example: 'ecommerce/women/stream_gcog1f' => 'women'
        if (!imagePath) return '';
        const parts = imagePath.split('/');
        if (parts.length >= 3) {
          return parts[1];
        }
        return '';
      };
      const cartItems: CartItem[] = data.items.map(item => ({
        id: item.id,
        product: {
          id: item.product?.toString() || '',
          name: item.product_name || '',
          price: Number(item.product_price) || 0,
          image: item.product_image || '',
          // Fix: Map sizes and colors correctly from the cart item
          sizes: Array.isArray(item.product_sizes) ? item.product_sizes : [],
          colors: Array.isArray(item.product_colors) ? item.product_colors : [],
          stock: item.product_stock || 0,
          brand: '',
          brand_name: '',
          category_names: [],
          images: [item.product_image || ''],
          color_names: Array.isArray(item.product_colors) ? item.product_colors : [],
          size_names: Array.isArray(item.product_sizes) ? item.product_sizes : [],
          category: ((item as any).product_category || (item as any).category || extractCategoryFromImage(item.product_image)),
          subcategory: '',
          is_new: false,
          is_featured: false,
          rating: 0,
          review_count: 0,
          description: '',
          tags: [],
          compare_price: 0,
        },
        quantity: item.quantity,
        selected_size: item.selected_size || '',
        selected_color: item.selected_color || '',
        total_price: item.total_price,
        added_at: item.added_at,
        product_name: item.product_name,
        product_price: item.product_price,
        product_image: item.product_image,
        product_stock: item.product_stock,
        product_sizes: item.product_sizes,
        product_colors: item.product_colors,
      }));
      setCartItems(cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId: number, quantity: number = 1, size?: string, color?: string) => {
    try {
      await addToCartService(productId, quantity, size, color);
      await fetchCart(); // Refetch cart to get updated data
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  const updateCartItemDetails = async (
    itemId: number, // Changed from string to number to match your interface
    quantity: number,
    selected_size?: string,
    selected_color?: string
  ) => {
    try {
      await updateCartItem(itemId.toString(), quantity, selected_size, selected_color);
      await fetchCart(); // Refetch cart to get updated data
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      await removeFromCart(itemId.toString());
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  const clearCart = async () => {
    try {
      await clearCartService();
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cartItems,
    cartItemsCount,
    total,
    loading,
    addToCart,
    updateCartItemDetails,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart, // Add this to manually refresh cart when needed
  };
}
function clearCartService() {
  throw new Error('Function not implemented.');
}

