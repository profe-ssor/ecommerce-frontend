import type { Order } from '../types/order';
import { api } from './api';

export interface OrderItem {
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
  price: number;
}

export interface CreateOrderData {
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  billing_address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  payment_method: string;
  payment_token?: string;
}

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders/api/orders/');
  return response.data.results || response.data;
};

export const getOrder = async (orderId: string): Promise<Order> => {
  const response = await api.get(`/orders/api/orders/${orderId}/`);
  return response.data;
};

export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
  const response = await api.post('/orders/api/orders/place/', orderData);
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  try {
    const response = await api.patch(`/orders/api/orders/${orderId}/`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};