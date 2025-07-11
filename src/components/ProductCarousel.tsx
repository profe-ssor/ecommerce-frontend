import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { getProducts, getNewArrivals } from '../services/productServices';
import type { Product as BackendProduct } from '../types';

// Use the Product type from backend
type Product = BackendProduct & {
  comparePrice?: number;
  isNew?: boolean;
};

interface ProductCarouselProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title = "Just Arrived Overnight",
  subtitle = "Fresh finds delivered daily"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('new arrivals');

  const categories = [
    { label: 'new arrivals', value: 'new arrivals' },
    { label: 'women', value: 'Women' },
    { label: 'men', value: 'Men' },
    { label: 'kids & baby', value: 'Kids & Baby' },
    { label: 'accessories', value: 'Accessories' },
    { label: 'home', value: 'Home' },
    { label: 'runway', value: 'Runway' },
  ];

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        let backendProducts: BackendProduct[] = [];
        if (activeCategory === 'new arrivals') {
          backendProducts = await getNewArrivals();
        } else {
          console.log('Fetching products for category:', activeCategory);
          const { results } = await getProducts({ category: activeCategory.trim() });
          console.log('Results from backend:', results);
          backendProducts = results;
        }
        // Map backend products to local Product type for compatibility
        let mapped = backendProducts.map((p) => ({
          ...p,
          comparePrice: p.compare_price,
          isNew: p.is_new,
        }));
        // Frontend filter: only show products whose category_names include the selected category (except for new arrivals)
        if (activeCategory !== 'new arrivals') {
          mapped = mapped.filter((p) =>
            Array.isArray(p.category_names) &&
            p.category_names.map((c) => c.toLowerCase()).includes(activeCategory.toLowerCase())
          );
        }
        setProducts(mapped);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory]);

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const visibleCount = 3;
  const maxSlide = Math.max(0, products.length - visibleCount);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Reset slide when products or category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [products, activeCategory]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title} <span className="text-red-600">Overnight</span>
          </h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

        {/* Category Filters as Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-3 rounded-full font-medium capitalize transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / visibleCount)}%)` }}
            >
              {isLoading ? (
                <div className="w-full flex justify-center items-center h-64">
                  <span className="text-gray-400 text-lg">Loading products...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="w-full flex justify-center items-center h-64">
                  <span className="text-gray-400 text-lg">No products found.</span>
                </div>
              ) : (
                products.map((product) => (
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
                          onClick={() => toggleFavorite(product.id.toString())}
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                        >
                          <Heart
                            size={20}
                            className={favorites.has(product.id.toString()) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                          />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                        <h3 className="font-semibold text-gray-900 mb-3">{product.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-red-600">${product.price}</span>
                          {product.comparePrice && (
                            <span className="text-lg text-gray-400 line-through">
                              Compare at ${product.comparePrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === maxSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all ${currentSlide === maxSlide ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;