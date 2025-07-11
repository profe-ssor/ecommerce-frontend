import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, History } from 'lucide-react';


import { ProductGrid } from './order/ProductGrid';
import { Checkout } from './order/Checkout';
import { OrderHistory } from './order/OrderHistory';
import { ToastContainer } from './order/ui/Toast';

import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
  
} from '../services/cartServices';

import {
  getOrders,
  createOrder,
  type CreateOrderData,
} from '../services/orderServices';



import type { CartItem } from '../types/cart';
import type { Product } from '../types';
import type { Order } from '../types/order';
import ShoppingCart from './order/ShoppingCart';
// Define ShippingAddress type here if not exported from elsewhere
type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type PaymentMethodData =
  | { id: 'credit'; method: 'credit'; last4: string; brand: string }
  | { id: 'paypal'; method: 'paypal' };

export default function StorePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchCart();
    fetchOrders();
  }, []);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCartItems(cartData.items);
      setCartTotal(cartData.total_price);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddToCart = async (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
    try {
      await addToCart(Number(product.id), quantity, selectedSize, selectedColor);
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    try {
      await updateCartItem(String(itemId), quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveFromCart = async (itemId: number) => {
    try {
      await removeFromCart(String(itemId));
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      await fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handlePlaceOrder = async (address: ShippingAddress, paymentMethod: PaymentMethodData) => {
    // Map frontend address to backend format
    const backendAddress = {
      street: address.address,
      city: address.city,
      state: address.state,
      zip_code: address.zipCode,
      country: address.country,
    };
    
    // Map payment method to string for backend
    const paymentMethodString = paymentMethod.method;
    const orderData: CreateOrderData = {
      shipping_address: backendAddress,
      billing_address: backendAddress,
      payment_method: paymentMethodString,
    };
    
    try {
      const newOrder = await createOrder(orderData);
      setOrders([newOrder, ...orders]);
      await handleClearCart();
      navigate('/store/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  // Add handler for updating cart item size/color (supporting multiple selections)
  const handleUpdateCartItem = async (
    itemId: number,
    quantity: number,
    selected_size?: string | string[],
    selected_color?: string | string[]
  ) => {
    // Only support single selection for now; if array, use the first value
    const size = Array.isArray(selected_size) ? selected_size[0] : selected_size;
    const color = Array.isArray(selected_color) ? selected_color[0] : selected_color;
    await updateCartItem(String(itemId), quantity, size, color);
    const updatedCart = await getCart();
    setCartItems(updatedCart.items);
    setCartTotal(updatedCart.total_price);
  };

  const currentPath = location.pathname;

  const renderView = () => {
    switch (currentPath) {
      case '/store':
      case '/store/products':
        return <ProductGrid onAddToCart={handleAddToCart} products={[]} />;
      case '/store/cart':
        return (
          <ShoppingCart
            items={cartItems}
            total={cartTotal}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onClose={() => navigate('/store/products')}
            onUpdateCartItem={handleUpdateCartItem}
          />
        );
      case '/store/checkout':
        return (
          <Checkout
            items={cartItems}
            total={cartTotal}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => navigate('/store/cart')}
          />
        );
      case '/store/orders':
        return <OrderHistory orders={orders} />;
      default:
        return <ProductGrid onAddToCart={handleAddToCart} products={[]} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Store</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/store/cart')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <ShoppingBag size={20} />
              <span>Cart ({cartItems.length})</span>
            </button>
            <button
              onClick={() => navigate('/store/orders')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <History size={20} />
              <span>Orders</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        {renderView()}
      </div>
      <ToastContainer toasts={[]} onRemove={() => {}} />
    </div>
  );
}
