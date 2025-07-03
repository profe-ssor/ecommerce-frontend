import React from 'react';
import { ShoppingCart } from 'lucide-react';

import { Button } from './ui/Button';
import { Card } from './ui/Card';
import type { Product } from '../../types';


interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Card key={product.id} hover className="overflow-hidden group">
          <div className="aspect-video bg-gray-800 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
              <p className="text-gray-400 text-sm">{product.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              
              <Button
                onClick={() => onAddToCart(product)}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};