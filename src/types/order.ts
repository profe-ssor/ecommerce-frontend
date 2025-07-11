import type { Product } from ".";

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface OrderItem {
  id: Key | null | undefined;
  product: Product | null; // product can be null if it was deleted
  quantity: number;
  price: number;
}

export interface Order {
  date: string | number | Date;
  shippingAddress: any;
  paymentMethod: any;
  id: number;
  user_email: string;
  status: OrderStatus;
  total_price: number;
  created_at: string;
  items: OrderItem[];
}
