import type { Product } from ".";

export interface CartItem {
  id: number;
  product: Product;
  product_name: string;
  product_price: number;
  product_image: string;
  product_sizes?: string[];
  product_colors?: string[];
  product_stock?: number;
  product_category?: string;
  category?: string;
  quantity: number;
  total_price: number;
  added_at: string;
  selected_size?: string;
  selected_color?: string;
}

export interface CartResponse {
  items: CartItem[];
  total_items: number;
  total_price: number;
}

export interface AddToCartRequest {
  product_id: number;
  quantity?: number;
  size?: string;
  color?: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
  selected_size?: string;
  selected_color?: string;
}

export interface CartCountResponse {
  count: number;
}