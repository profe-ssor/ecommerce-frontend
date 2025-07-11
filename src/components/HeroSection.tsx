import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight font-buttershine">
                All the styles for{' '}
                <span className="text-custom-red relative">
                  20-50% less
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-custom-red transform rotate-1"></div>
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Designer finds and everyday favorites at amazing prices. New arrivals daily.
              </p>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/women"
                className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-custom-red hover:text-custom-red hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Women
              </Link>
              <Link
                to="/dresses"
                className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-custom-red hover:text-custom-red hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Dresses
              </Link>
              <Link
                to="/men"
                className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-custom-red hover:text-custom-red hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Men
              </Link>
              <Link
                to="/kids-baby"
                className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-custom-red hover:text-custom-red hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Kids & Baby
              </Link>
              <Link
                to="/beauty-accessories"
                className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-custom-red hover:text-custom-red hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Accessories
              </Link>
              <Link
                to="/home"
                className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-custom-red hover:text-custom-red hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Home
              </Link>
            </div>

            {/* CTA Button */}
            <Link to="/new-arrivals">
            <button className="bg-gradient-to-r from-custom-red to-custom-red text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300" >
              Shop New Arrivals
            </button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
                alt="Fashion model in polka dot dress"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Product */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
                <img
                  src="https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg"
                  alt="Red heels"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="text-xs font-bold text-custom-red mt-2">$29.99</div>
              </div>

              

              {/* Floating Discount Badge */}
              <div className="absolute top-4 left-4 bg-custom-red text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse">
                Up to 50% OFF
              </div>
            </div>
          </div>
               {/* Floating red heels */}
              <div className="absolute -top-17 -right-30 animate-bounce"  >
                <div className="w-24 h-24 bg-tjmaxx-red rounded-full shadow-xl flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-lg transform rotate-12"></div>
                </div>
              </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;