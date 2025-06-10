import api from './api';

export interface WishlistItem {
  id: number;
  product: number;
  created_at: string;
}

export const getWishlist = async (): Promise<WishlistItem[]> => {
  const response = await api.get<WishlistItem[]>('/api/wishlist/');
  return response.data;
};

export const addToWishlist = async (productId: number) => {
  const response = await api.post('/api/wishlist/add/', {
    product_id: productId,
  });
  return response.data;
};

export const removeFromWishlist = async (productId: number) => {
  const response = await api.delete(`/api/wishlist/remove/${productId}/`);
  return response.data;
};