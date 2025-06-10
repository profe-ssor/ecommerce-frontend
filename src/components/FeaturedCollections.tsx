import React from 'react';

interface Collection {
  id: number;
  brand: string;
  title: string;
  description: string;
  products: {
    name: string;
    price: number;
    comparePrice: number;
    image: string;
  }[];
}

const FeaturedCollections: React.FC = () => {
  const collections: Collection[] = [
    {
      id: 1,
      brand: 'Reveal Designer',
      title: 'Designer Dresses Collection',
      description: 'Sophisticated styles that make every moment special',
      products: [
        {
          name: 'Elegant Evening Dress',
          price: 49.99,
          comparePrice: 119.99,
          image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
        },
        {
          name: 'Cocktail Dress',
          price: 39.99,
          comparePrice: 89.99,
          image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg'
        }
      ]
    },
    {
      id: 2,
      brand: 'Melloday',
      title: 'Casual Chic Collection',
      description: 'Effortless style for everyday elegance',
      products: [
        {
          name: 'Flowy Maxi Dress',
          price: 28.99,
          comparePrice: 65.99,
          image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'
        },
        {
          name: 'Summer Midi Dress',
          price: 24.99,
          comparePrice: 55.99,
          image: 'https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg'
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-red-600">Brand Collections</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover curated collections from top designers, featuring the styles you love at prices you'll adore.
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-16">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                  {collection.brand}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {collection.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {collection.description}
                </p>
                
                {/* Price Range */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="text-sm text-gray-500 mb-2">Price Range</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-600">
                      ${Math.min(...collection.products.map(p => p.price))}
                    </span>
                    <span className="text-gray-400">-</span>
                    <span className="text-2xl font-bold text-red-600">
                      ${Math.max(...collection.products.map(p => p.price))}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      (Compare at ${Math.min(...collection.products.map(p => p.comparePrice))} - ${Math.max(...collection.products.map(p => p.comparePrice))})
                    </span>
                  </div>
                </div>

                <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Shop {collection.brand}
                </button>
              </div>

              {/* Products */}
              <div className={`grid grid-cols-2 gap-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                {collection.products.map((product, productIndex) => (
                  <div
                    key={productIndex}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ${product.comparePrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;