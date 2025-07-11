import React from 'react';
import { Link } from 'react-router-dom';

const PromotionalBanners: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* African Heritage Banner */}
        <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="text-white space-y-6">
                              <div className="inline-block bg-white bg-opacity-20 text-custom-red px-4 py-2 rounded-full text-sm font-medium">
                African Heritage
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-buttershine">
                Discover Authentic
                <br />
                <span className="text-yellow-300">African Crafts</span>
              </h2>
              <p className="text-green-100 text-lg">
                Exclusive collection featuring traditional African artisanship and cultural designs at accessible prices.
              </p>
              <Link to="/african" className="bg-white text-green-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors inline-block">
                Shop African Collection
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1732464750451-d03355a57703?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QWZyaWNhbiUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                alt="African clothing and fashion"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Made in Africa Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="space-y-6">
                <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  African Heritage
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Made in Africa
                  <br />
                  <span className="text-green-600">Artisan Crafts</span>
                </h3>
                <p className="text-gray-600">
                  Authentic African craftsmanship and traditional designs at accessible prices.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Textiles', 'Jewelry', 'Home Decor', 'Accessories'].map((category) => (
                    <Link
                      key={category}
                      to="/african"
                      className="bg-white border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-50 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-200 to-transparent rounded-tl-full"></div>
          </div>

          <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="space-y-6">
                <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                  Traditional Crafts
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  African Design
                  <br />
                  <span className="text-yellow-600">Modern Style</span>
                </h3>
                <p className="text-gray-600">
                  Contemporary African fashion and traditional patterns for today's lifestyle.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Clothing', 'Bags', 'Shoes', 'Art'].map((category) => (
                    <Link
                      key={category}
                      to="/african"
                      className="bg-white border border-yellow-200 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-50 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-200 to-transparent rounded-tl-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;