import React from 'react';

const PromotionalBanners: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Sponsorship Banner */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="text-white space-y-6">
              <div className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
                Brand Partnership
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Discover Ilona Maher's
                <br />
                <span className="text-yellow-300">Favorite Finds</span>
              </h2>
              <p className="text-blue-100 text-lg">
                Exclusive collection featuring Olympic athlete style picks at unbeatable prices.
              </p>
              <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Shop Collection
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
                alt="Athletic fashion collection"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Made in Italy Luxury Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="space-y-6">
                <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                  Luxury Collection
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Made in Italy
                  <br />
                  <span className="text-orange-600">Designer Pieces</span>
                </h3>
                <p className="text-gray-600">
                  Authentic Italian craftsmanship at fraction of retail prices.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Leather Goods', 'Shoes', 'Accessories', 'Jewelry'].map((category) => (
                    <button
                      key={category}
                      className="bg-white border border-orange-200 text-orange-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-50 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-200 to-transparent rounded-tl-full"></div>
          </div>

          <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="space-y-6">
                <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  Runway Inspired
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  High Fashion
                  <br />
                  <span className="text-purple-600">For Less</span>
                </h3>
                <p className="text-gray-600">
                  Runway trends at prices that make sense for your wardrobe.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Dresses', 'Blazers', 'Handbags', 'Jewelry'].map((category) => (
                    <button
                      key={category}
                      className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-50 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-200 to-transparent rounded-tl-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;