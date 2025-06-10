import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  comparePrice: number;
  image: string;
  brand: string;
  isNew: boolean;
}

const ProductCarousel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('new arrivals');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const categories = ['new arrivals', 'women', 'men', 'kids & baby', 'home', 'runway'];

  const products: Product[] = [
    {
      id: 1,
      name: 'Designer Floral Dress',
      price: 39.99,
      comparePrice: 89.99,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      brand: 'Reveal Designer',
      isNew: true
    },
    {
      id: 2,
      name: 'Summer Maxi Dress',
      price: 24.99,
      comparePrice: 59.99,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      brand: 'Melloday',
      isNew: true
    },
    {
      id: 3,
      name: 'Elegant Evening Dress',
      price: 49.99,
      comparePrice: 119.99,
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      brand: 'Sail to Sable',
      isNew: false
    },
    {
      id: 4,
      name: 'Casual Day Dress',
      price: 19.99,
      comparePrice: 45.99,
      image: 'https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg',
      brand: 'Bellambra',
      isNew: true
    },
    {
      id: 5,
      name: 'Cocktail Dress',
      price: 34.99,
      comparePrice: 79.99,
      image: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg',
      brand: 'Designer Collection',
      isNew: false
    }
  ];

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, products.length - 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, products.length - 3)) % Math.max(1, products.length - 3));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Just Arrived <span className="text-red-600">Overnight</span>
          </h2>
          <p className="text-gray-600 text-lg">Fresh finds delivered daily</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium capitalize transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          NEW
                        </div>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                      >
                        <Heart
                          size={20}
                          className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                        />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                      <h3 className="font-semibold text-gray-900 mb-3">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-red-600">${product.price}</span>
                        <span className="text-lg text-gray-400 line-through">
                          Compare at ${product.comparePrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;