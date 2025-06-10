import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoryNavigation: React.FC = () => {
  const categories = [
    {
      title: 'New Dresses Now',
      subtitle: 'Fresh arrivals daily',
      buttonText: 'Shop Dresses',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Designer Shoes',
      subtitle: 'Step up your style',
      buttonText: 'Shop Footwear',
      image: 'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Handbags & Accessories',
      subtitle: 'Complete your look',
      buttonText: 'Shop Accessories',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Home Décor',
      subtitle: 'Transform your space',
      buttonText: 'Shop Home',
      image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg',
      gradient: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-red-600">Category</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Discover amazing finds in every department
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80`}></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.subtitle}</p>
                  
                  <button className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all group-hover:translate-x-1">
                    {category.buttonText}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white group-hover:border-opacity-50 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Can't decide? Start with our <span className="text-red-600">best sellers</span>
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              See what thousands of customers are loving right now. These top picks are flying off our virtual shelves.
            </p>
            <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Shop Best Sellers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigation;