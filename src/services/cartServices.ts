import { api } from './api';

export interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
  };
  quantity: number;
  size?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface CartResponse {
  id: string;
  items: CartItem[];
  total_items: number;
  total_price: string;
  created_at: string;
  updated_at: string;
}

export const getCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.get('/api/cart/');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (
  productId: number, 
  quantity: number = 1, 
  size?: string, 
  color?: string
): Promise<CartItem> => {
  try {
    const response = await api.post('/api/cart/add/', {
      product_id: productId,
      quantity,
      size,
      color,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (itemId: string, quantity: number): Promise<CartItem> => {
  try {
    const response = await api.patch(`/api/cart/items/${itemId}/`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId: string): Promise<void> => {
  try {
    await api.delete(`/api/cart/items/${itemId}/`);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async (): Promise<void> => {
  try {
    await api.delete('/api/cart/clear/');
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Get cart item count
export const getCartItemCount = async (): Promise<number> => {
  try {
    const response = await api.get('/api/cart/count/');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return 0;
  }
};