import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { Product } from '../../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { getProductImageUrl } from '../../utils/cloudinary';

export interface CartItem {
  id: number;
  product: Product;
  product_name: string;
  product_price: number | string;
  product_image: string;
  quantity: number | string;
  total_price: number | string;
  added_at: string;
  selected_size?: string;
  selected_color?: string;
  product_sizes?: string[];
  product_colors?: string[];
  product_category?: string;
  category?: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onClearCart: () => void;
  onClose: () => void;
  onUpdateCartItem: (itemId: number, quantity: number, selected_size?: string, selected_color?: string) => void;
}

const CartItemComponent: React.FC<{
  item: CartItem;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onUpdateCartItem: (itemId: number, quantity: number, selected_size?: string, selected_color?: string) => void;
}> = ({ item, onUpdateQuantity, onRemoveItem, onUpdateCartItem }) => {
  const safePrice = typeof item.product_price === 'number' 
    ? item.product_price 
    : parseFloat(item.product_price?.toString() || '0');
  
  const safeQuantity = typeof item.quantity === 'number'
    ? item.quantity
    : parseInt(item.quantity?.toString() || '1', 10);

  // Get sizes and colors with fallbacks
  let availableSizes = item.product?.sizes || [];
  let availableColors = item.product?.colors || [];

  // Fallback: use product_sizes and product_colors from cart item if product.sizes/colors are empty
  if ((!availableSizes || availableSizes.length === 0) && Array.isArray(item.product_sizes)) {
    availableSizes = item.product_sizes;
  }
  if ((!availableColors || availableColors.length === 0) && Array.isArray(item.product_colors)) {
    availableColors = item.product_colors;
  }

  // Debug: log the full cart item
  console.log('CartItem:', item);
  console.log('Available Sizes:', availableSizes, 'Available Colors:', availableColors);
  // Debug: log the image URL for this cart item
  const debugImageUrl = getProductImageUrl(item.product_image, item.product_category || item.category || '',);
  console.log('CartItem image URL:', debugImageUrl);

  // State for multiple selections
  const [selectedSizes, setSelectedSizes] = useState<string[]>(item.selected_size ? [item.selected_size] : []);
  const [selectedColors, setSelectedColors] = useState<string[]>(item.selected_color ? [item.selected_color] : []);

  // Image logic as in ProductCard, but use cart item fields directly
  const [imageLoaded, setImageLoaded] = useState(false);
  // Use product_image and product_category (or fallback) from the cart item
  const imageUrl = getProductImageUrl(
    item.product_image,
    item.product_category || item.category || '',
    
  );

  // Handle size checkbox change
  const handleSizeChange = (size: string) => {
    let updatedSizes;
    if (selectedSizes.includes(size)) {
      updatedSizes = selectedSizes.filter(s => s !== size);
    } else {
      updatedSizes = [...selectedSizes, size];
    }
    setSelectedSizes(updatedSizes);
    // Only pass the first selected size for backend compatibility
    onUpdateCartItem(Number(item.id), Number(item.quantity), updatedSizes[0], selectedColors[0]);
  };

  // Handle color checkbox change
  const handleColorChange = (color: string) => {
    let updatedColors;
    if (selectedColors.includes(color)) {
      updatedColors = selectedColors.filter(c => c !== color);
    } else {
      updatedColors = [...selectedColors, color];
    }
    setSelectedColors(updatedColors);
    // Only pass the first selected color for backend compatibility
    onUpdateCartItem(Number(item.id), Number(item.quantity), selectedSizes[0], updatedColors[0]);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/10 rounded-2xl shadow-lg mb-8 border border-white/10 transition-transform hover:scale-[1.01]">
      {/* Product Image */}
      <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 flex items-center justify-center shadow-lg border border-gray-200">
        <div className="relative aspect-[3/4] w-full h-full flex items-center justify-center">
          {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />}
          <img
            src={imageUrl}
            alt={item.product_name || 'Product'}
            className={`w-full h-full object-cover rounded-2xl transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white mb-1 truncate max-w-[200px]">{item.product_name || 'Unknown Product'}</h3>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="p-2 text-red-500 hover:text-white hover:bg-red-500/80 rounded-lg transition-all duration-200 ml-2"
            title="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-400 text-base mb-1">${safePrice.toFixed(2)} <span className="text-xs text-gray-500">each</span></p>
        <div className="flex flex-wrap gap-2 items-center mb-1">
          {/* Size Pills */}
          {selectedSizes.length > 0 && selectedSizes.map(size => (
            <span key={size} className="px-2 py-1 bg-gray-700 text-white text-xs rounded-full font-medium border border-gray-600">{size}</span>
          ))}
          {/* Color Pills */}
          {selectedColors.length > 0 && selectedColors.map(color => (
            <span key={color} className="px-2 py-1 bg-blue-700 text-white text-xs rounded-full font-medium border border-blue-600">{color}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mb-2">
          {/* Sizes as pill checkboxes */}
          {availableSizes.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 mr-1">Sizes:</span>
              {availableSizes.map(size => (
                <label key={size} className={`flex items-center gap-1 px-2 py-1 rounded-full border transition-colors cursor-pointer ${selectedSizes.includes(size) ? 'bg-red-500/80 border-red-500 text-white' : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'}`}>
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="form-checkbox accent-red-500 hidden"
                  />
                  <span className="text-xs font-semibold">{size}</span>
                </label>
              ))}
            </div>
          )}
          {/* Colors as pill checkboxes */}
          {availableColors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 mr-1">Colors:</span>
              {availableColors.map(color => (
                <label key={color} className={`flex items-center gap-1 px-2 py-1 rounded-full border transition-colors cursor-pointer ${selectedColors.includes(color) ? 'bg-blue-500/80 border-blue-500 text-white' : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'}`}>
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="form-checkbox accent-blue-500 hidden"
                  />
                  <span className="text-xs font-semibold">{color}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
          <span>Added: {new Date(item.added_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Quantity and Price */}
      <div className="flex flex-col items-end gap-3 min-w-[90px]">
        <div className="flex items-center gap-2 bg-gray-900 rounded-full px-2 py-1 shadow-sm">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(0, safeQuantity - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
            disabled={safeQuantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-lg font-semibold text-white">{safeQuantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, safeQuantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="text-lg font-bold text-white mt-2">${(safePrice * safeQuantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

// ConfirmDeleteModal component
const ConfirmDeleteModal: React.FC<{
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  productName?: string;
}> = ({ open, onConfirm, onCancel, productName }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative animate-slide-up">
        <X className="absolute top-4 right-4 w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" onClick={onCancel} />
        <Trash2 className="mx-auto text-red-500 w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold mb-2 text-gray-900">Remove Item?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove <span className="font-semibold">{productName || 'this item'}</span> from your cart? This action cannot be undone.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-bold flex items-center gap-2 hover:bg-red-600 transition"
          >
            <Trash2 className="w-5 h-5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items = [],
  total = 0,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onClose,
  onUpdateCartItem
}) => {
  const safeItems = items || [];
  const safeTotal = total || 0;

  // State for delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  const handleDeleteClick = (item: CartItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onRemoveItem(itemToDelete.id);
    }
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  if (safeItems.length === 0) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl rounded-2xl">
        <div className="mb-4">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
        <p className="text-gray-400 mb-6">Add some products to get started!</p>
        <Button onClick={onClose}>Continue Shopping</Button>
      </Card>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-8">
        {/* Cart Items */}
        <div className="flex-1">
          <Card className="p-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl rounded-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {safeItems.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <CartItemComponent
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={() => handleDeleteClick(item)}
                    onUpdateCartItem={onUpdateCartItem}
                  />
                  {idx < safeItems.length - 1 && (
                    <hr className="my-4 border-gray-700" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </Card>
        </div>
        {/* Summary */}
        <div className="w-full lg:w-[350px] flex-shrink-0">
          <Card className="sticky top-24 p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 shadow-2xl rounded-2xl flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-white mb-4">Order Summary</h3>
            <div className="flex flex-col gap-2 text-base text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${safeTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white mt-2">
                <span>Total</span>
                <span>${safeTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full py-3 text-lg font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 transition-all rounded-xl shadow-lg">Checkout</Button>
            <Button variant="ghost" onClick={onClearCart} className="w-full text-red-500 hover:bg-red-500/10 rounded-xl">Clear Cart</Button>
          </Card>
        </div>
      </div>
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        productName={itemToDelete?.product_name}
      />
    </>
  );
};

export default ShoppingCart;