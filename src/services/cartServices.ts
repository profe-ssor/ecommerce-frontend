import api from './api';

export interface CartItem {
  id: number;
  product: number;
  quantity: number;
  size?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface CartResponse {
  items: CartItem[];
  total_items: number;
  total_price: string;
}

export const getCart = async (): Promise<CartResponse> => {
  const response = await api.get<CartResponse>('/api/cart/');
  return response.data;
};

export const addToCart = async (productId: number, quantity: number = 1, size?: string, color?: string) => {
  const response = await api.post('/api/cart/add/', {
    product_id: productId,
    quantity,
    size,
    color,
  });
  return response.data;
};

export const updateCartItem = async (itemId: number, quantity: number) => {
  const response = await api.patch(`/api/cart/items/${itemId}/`, {
    quantity,
  });
  return response.data;
};

export const removeFromCart = async (itemId: number) => {
  const response = await api.delete(`/api/cart/items/${itemId}/`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/api/cart/clear/');
  return response.data;
};