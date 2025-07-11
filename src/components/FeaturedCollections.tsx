import React, { useState, useEffect } from 'react';
import { SimpleProductCard } from './Products/SimpleProductCard';
import { getCollections } from '../services/productServices';
import type { Product } from '../types';

interface Collection {
  id: number;
  brand: number;
  brand_detail: {
    id: number;
    name: string;
    logo: string | null;
    description: string;
  };
  title: string;
  description: string;
  products: Product[];
}

interface RawProduct {
  id: number | string;
  name: string;
  price: number | string;
  compare_price?: number | string;
  image: string;
  rating?: number | string;
  review_count?: number | string;
  stock?: number | string;
  colors?: string[];
  sizes?: string[];
  category_names?: string[];
  color_names?: string[];
  size_names?: string[];
  tags?: string[];
  images?: string[];
  is_new?: boolean;
  is_featured?: boolean;
  subcategory?: string;
  description?: string;
  brand?: string;
  category?: string;
}

const FeaturedCollections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionsData = await getCollections();
        
        // Transform products in collections to ensure proper data types
        const transformedCollections = collectionsData.map((collection: Collection) => ({
          ...collection,
          products: collection.products.map((product: RawProduct) => ({
            ...product,
            price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
            compare_price: product.compare_price ? (typeof product.compare_price === 'number' ? product.compare_price : parseFloat(String(product.compare_price))) : undefined,
            rating: typeof product.rating === 'number' ? product.rating : parseFloat(String(product.rating || '4.0')),
            review_count: typeof product.review_count === 'number' ? product.review_count : parseInt(String(product.review_count || '0')),
            stock: typeof product.stock === 'number' ? product.stock : parseInt(String(product.stock || '0')),
            id: String(product.id),
            colors: product.colors || [],
            sizes: product.sizes || [],
            category_names: product.category_names || [],
            color_names: product.color_names || [],
            size_names: product.size_names || [],
            tags: product.tags || [],
            images: product.images || [product.image],
            is_new: product.is_new || false,
            is_featured: product.is_featured || false,
            subcategory: product.subcategory || '',
            description: product.description || '',
            brand: product.brand || 'Unknown Brand'
          }))
        }));
        
        setCollections(transformedCollections);
      } catch (error) {
        console.error('Error fetching collections:', error);
        // Fallback to empty array if API fails
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-red-600">Brand Collections</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover curated collections from top designers, featuring the styles you love at prices you'll adore.
            </p>
          </div>
          <div className="space-y-16">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="grid lg:grid-cols-2 gap-12 items-center animate-pulse">
                <div className="space-y-6">
                  <div className="h-6 bg-gray-300 rounded w-32"></div>
                  <div className="h-8 bg-gray-300 rounded w-64"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-20 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded w-40"></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[...Array(4)].map((_, productIndex) => (
                    <div key={productIndex} className="bg-gray-300 rounded-2xl h-64"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-red-600">Brand Collections</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover curated collections from top designers, featuring the styles you love at prices you'll adore.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No collections available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-buttershine">
            Featured <span className="text-custom-red">Brand Collections</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover curated collections from top designers, featuring the styles you love at prices you'll adore.
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-16">
          {collections.map((collection) => {
            return (
              <div
                key={collection.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Content - Always first */}
                <div className="space-y-6">
                  <div className="inline-block bg-custom-red bg-opacity-10 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {collection.brand_detail.name}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {collection.description}
                  </p>
                  


                  <button className="bg-gradient-to-r from-custom-red to-custom-red text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Shop {collection.brand_detail.name}
                  </button>
                </div>

                {/* Products - Always second */}
                <div className="grid grid-cols-2 gap-6">
                  {collection.products.slice(0, 4).map((product) => (
                    <SimpleProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;