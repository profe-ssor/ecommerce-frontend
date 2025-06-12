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

export interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total_amount: number;
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
  created_at: string;
  updated_at: string;
  estimated_delivery?: string;
  tracking_number?: string;
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
  try {
    const response = await api.get('/api/orders/');
    return response.data.results || response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrder = async (orderId: string): Promise<Order> => {
  try {
    const response = await api.get(`/api/orders/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
  try {
    const response = await api.post('/api/orders/', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  try {
    const response = await api.patch(`/api/orders/${orderId}/`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const cancelOrder = async (orderId: string): Promise<Order> => {
  try {
    const response = await api.patch(`/api/orders/${orderId}/cancel/`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};

export const trackOrder = async (trackingNumber: string): Promise<any> => {
  try {
    const response = await api.get(`/api/orders/track/${trackingNumber}/`);
    return response.data;
  } catch (error) {
    console.error('Error tracking order:', error);
    throw error;
  }
};

// Get order history with pagination
export const getOrderHistory = async (page: number = 1, pageSize: number = 10) => {
  try {
    const response = await api.get(`/api/orders/?page=${page}&page_size=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};