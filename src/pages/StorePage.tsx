import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, History } from 'lucide-react';


import { ProductGrid } from './order/ProductGrid';
import { Checkout } from './order/Checkout';
import { OrderHistory } from './order/OrderHistory';
import { Button } from './order/ui/Button';
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
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
};
// import type { PaymentMethodData } from '../types/order';
// TODO: Define PaymentMethodData type here or import from the correct module if it exists elsewhere.
type PaymentMethodData = any; // Replace 'any' with the correct type definition



export default function StorePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Fetch cart and orders on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cart = await getCart();
        setCartItems(cart.items);
        setCartTotal(cart.total_price);
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        console.error('Error initializing store:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  
  const handleAddToCart = (product: Product) => {
    addToCart(Number(product.id), 1)
      .then(() => getCart())
      .then((updatedCart) => {
        setCartItems(updatedCart.items);
        setCartTotal(updatedCart.total_price);
      })
      .catch((err) => {
        console.error('Error adding to cart:', err);
      });
  };

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    await updateCartItem(String(itemId), quantity);
    const updatedCart = await getCart();
    setCartItems(updatedCart.items);
    setCartTotal(updatedCart.total_price);
  };

  const handleRemoveFromCart = async (itemId: number) => {
    await removeFromCart(String(itemId));
    const updatedCart = await getCart();
    setCartItems(updatedCart.items);
    setCartTotal(updatedCart.total_price);
  };

  const handleClearCart = async () => {
    await clearCart();
    setCartItems([]);
    setCartTotal(0);
  };

  const handlePlaceOrder = async (address: ShippingAddress, paymentMethod: PaymentMethodData) => {
    const orderData: CreateOrderData = {
      shipping_address: address,
      billing_address: address,
      payment_method: paymentMethod,
    };
    const newOrder = await createOrder(orderData);
    setOrders([newOrder, ...orders]);
    await handleClearCart();
    navigate('/store/orders');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">ModernStore</h1>
            </div>

            <nav className="flex items-center gap-2">
              <Button
                variant={currentPath === '/store/products' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => navigate('/')}
              >
                Shop
              </Button>

              <Button
                variant={['/store/cart', '/store/checkout'].includes(currentPath) ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => navigate('/store/cart')}
                className="relative"
              >
                Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </Button>

              <Button
                variant={currentPath === '/store/orders' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => navigate('/store/orders')}
              >
                <History className="w-4 h-4 mr-2" />
                Orders
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? <p className="text-white">Loading...</p> : renderView()}
      </main>

      <ToastContainer toasts={[]} onRemove={() => {}} />
    </div>
  );
}
