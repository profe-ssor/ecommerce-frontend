import React, { useState } from 'react';
import { CreditCard, MapPin, Shield } from 'lucide-react';

import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import type { CartItem } from '../../types/cart';

// Define ShippingAddress type locally since it's not exported from '../../types/cart'
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

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onPlaceOrder: (address: ShippingAddress, paymentMethod: PaymentMethodData) => Promise<void>;
  onBack: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  items,
  total,
  onPlaceOrder,
  onBack
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });
  
  const [selectedPayment, setSelectedPayment] = useState<string>('credit');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paymentMethods = [
    { id: 'credit', type: 'credit' as const, label: 'Credit Card', icon: CreditCard },
    { id: 'paypal', type: 'paypal' as const, label: 'PayPal', icon: Shield },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingAddress.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingAddress.address.trim()) newErrors.address = 'Address is required';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
    if (!shippingAddress.state.trim()) newErrors.state = 'State is required';
    if (!shippingAddress.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let paymentMethod: PaymentMethodData;
      if (selectedPayment === 'credit') {
        paymentMethod = {
          id: 'credit',
          method: 'credit',
          last4: '4242',
          brand: 'Visa'
        };
      } else {
        paymentMethod = {
          id: 'paypal',
          method: 'paypal'
        };
      }
      
      onPlaceOrder(shippingAddress, paymentMethod);
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-semibold text-white">Shipping Address</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={shippingAddress.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={errors.fullName}
              placeholder="Enter your full name"
            />

            <Input
              label="Address"
              value={shippingAddress.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              error={errors.address}
              placeholder="Street address"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                value={shippingAddress.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                error={errors.city}
                placeholder="City"
              />
              <Input
                label="State"
                value={shippingAddress.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                error={errors.state}
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="ZIP Code"
                value={shippingAddress.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                error={errors.zipCode}
                placeholder="ZIP code"
              />
              <Input
                label="Country"
                value={shippingAddress.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Country"
              />
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-white">Payment Method</h3>
          </div>

          <div className="space-y-3">
            {paymentMethods.map(method => {
              const Icon = method.icon;
              return (
                <label
                  key={method.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedPayment === method.id
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="sr-only"
                  />
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{method.label}</span>
                </label>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Order Summary</h3>
          
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{item.product_name}</p>
                  <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="text-white font-semibold">
                  ${(Number(item.product_price) * Number(item.quantity)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-white text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={onBack} className="flex-1">
            Back to Cart
          </Button>
          <Button
            onClick={() =>
              onPlaceOrder(
                shippingAddress,
                selectedPayment === 'credit'
                  ? { id: 'credit', method: 'credit', last4: '4242', brand: 'Visa' }
                  : { id: 'paypal', method: 'paypal' }
              )
            }
            isLoading={isLoading}
            className="flex-1"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};