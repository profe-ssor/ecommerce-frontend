import type { CartItem, CartResponse } from '../types/cart';
import { api } from './api';

export const getCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.get('/orders/api/cart/');
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
    const response = await api.post('/orders/api/cart/add/', {
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

export const updateCartItem = async (
  itemId: string,
  quantity: number,
  selected_size?: string,
  selected_color?: string
): Promise<CartItem> => {
  try {
    const response = await api.put(`/orders/api/cart/items/${itemId}/`, {
      quantity,
      selected_size,
      selected_color,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId: string): Promise<void> => {
  try {
    await api.delete(`/orders/api/cart/items/${itemId}/`);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async (): Promise<void> => {
  try {
    await api.delete('/orders/api/cart/clear/');
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Get cart item count
export const getCartItemCount = async (): Promise<number> => {
  try {
    const response = await api.get('/orders/api/cart/count/');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return 0;
  }
};