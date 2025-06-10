import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import images from '../assets/images/images';

const products = [
  { id: 1, brand: "1822 DENIM", price: 19.99, compareAt: 28.0, img: images.k1 },
  { id: 2, brand: "CALYPSO ST. BARTH", price: 24.99, compareAt: 48.0, img: images.w1 },
  { id: 3, brand: "BONITO", price: 29.99, compareAt: 45.0, img: images.m1 },
  { id: 4, brand: "RACHEL ZOE", price: 29.99, compareAt: 58.0, img: images.w2 },
  { id: 5, brand: "1822 DENIM", price: 19.99, compareAt: 28.0, img: images.k2 },
  { id: 6, brand: "CALYPSO ST. BARTH", price: 24.99, compareAt: 48.0, img: images.m2 },
  { id: 7, brand: "BONITO", price: 29.99, compareAt: 45.0, img: images.a1 },
  { id: 8, brand: "RACHEL ZOE", price: 29.99, compareAt: 58.0, img: images.s1 },
];

export default function NewArrivalsSlider() {
  const [startIndex, setStartIndex] = useState(0);
  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex((prev) => Math.min(prev + 1, products.length - 4));
  const visibleProducts = products.slice(startIndex, startIndex + 4);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 relative">
      {/* Section title with horizontal lines */}
      <h2 className="flex items-center justify-center text-2xl font-bold mb-10 gap-4">
        <span className="flex-1 h-px bg-mainred max-w-[300px]" />
        <span className='text-mainblue'> New Arrivals</span>
        <span className="flex-1 h-px bg-mainred max-w-[300px]" />
      </h2>

      {/* Chevron buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full"
      >
        <ChevronRight size={40} />
      </button>

      {/* Grid container for product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 transition-all">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white p-3 rounded-md shadow hover:shadow-lg transition"
          >
            <div className="relative w-full overflow-hidden rounded-md">
              <img
                src={product.img}
                alt={product.brand}
                className="h-90 w-full object-cover"
              />
              <Heart className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition" />
              <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 border text-xs opacity-0 group-hover:opacity-100 transition">
                QUICK LOOK
              </button>
            </div>
            <h3 className="mt-4 font-bold text-sm text-center">{product.brand}</h3>
            <p className="font-semibold text-base text-center">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 text-center">
              Compare At ${product.compareAt.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
