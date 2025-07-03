import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, Calendar, CreditCard } from 'lucide-react';

import { Card } from './ui/Card';
import type { Order } from '../../types/order';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderStatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const statusConfig = {
    pending: { color: 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30', label: 'Pending' },
    processing: { color: 'text-blue-400 bg-blue-400/20 border-blue-400/30', label: 'Processing' },
    shipped: { color: 'text-purple-400 bg-purple-400/20 border-purple-400/30', label: 'Shipped' },
    delivered: { color: 'text-green-400 bg-green-400/20 border-green-400/30', label: 'Delivered' },
    cancelled: { color: 'text-red-400 bg-red-400/20 border-red-400/30', label: 'Cancelled' }
  };

  const config = statusConfig[status];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Order {order.id}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(order.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Package className="w-4 h-4" />
                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          <div className="text-right">
            <OrderStatusBadge status={order.status} />
            <p className="text-xl font-bold text-white mt-2">
              ${order.total_price.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <span className="text-sm font-medium">
            {isExpanded ? 'Hide Details' : 'View Details'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 bg-white/5">
          <div className="p-6 space-y-6">
            {/* Order Items */}
            <div>
              <h4 className="text-white font-medium mb-3">Items</h4>
              <div className="space-y-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                      {item.product ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.product ? item.product.name : 'Unknown Product'}</p>
                      <p className="text-gray-400 text-sm">
                        {item.product ? `$${item.product.price.toFixed(2)} × ${item.quantity}` : `× ${item.quantity}`}
                      </p>
                    </div>
                    <p className="text-white font-semibold">
                      {item.product ? `$${(item.product.price * item.quantity).toFixed(2)}` : '$0.00'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h4 className="text-white font-medium mb-3">Shipping Address</h4>
              <div className="text-gray-400 text-sm space-y-1">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h4 className="text-white font-medium mb-3">Payment Method</h4>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <CreditCard className="w-4 h-4" />
                {order.paymentMethod.type === 'credit' && order.paymentMethod.brand && (
                  <span>
                    {order.paymentMethod.brand} ending in {order.paymentMethod.last4}
                  </span>
                )}
                {order.paymentMethod.type === 'paypal' && <span>PayPal</span>}
                {order.paymentMethod.type === 'apple_pay' && <span>Apple Pay</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="mb-4">
          <Package className="w-16 h-16 text-gray-600 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
        <p className="text-gray-400">Your order history will appear here once you make a purchase.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};