import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/productServices';
import { getProducts } from '../services/productServices';
import { getProductImageUrl } from '../utils/cloudinary';
import type { Product } from '../types';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryWithImage extends Category {
  image: string;
  subtitle: string;
  buttonText: string;
  gradient: string;
  link: string;
}

const CategoryNavigation: React.FC = () => {
  const [categories, setCategories] = useState<CategoryWithImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Gradient options for different categories
  const gradients = [
    'from-pink-500 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-teal-500 to-cyan-500',
    'from-amber-500 to-orange-500',
    'from-green-500 to-emerald-500',
    'from-blue-500 to-sky-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-purple-500',
  ];

  useEffect(() => {
    const fetchCategoriesWithImages = async () => {
      try {
        // Fetch categories
        const categoriesData = await getCategories();
        
        // Fetch products to get representative images for each category
        const productsData = await getProducts({ page_size: 100 });
        
        const categoriesWithImages: CategoryWithImage[] = await Promise.all(
          categoriesData.map(async (category: Category, index: number) => {
                         // Find a product from this category to use as representative image
             const categoryProduct = productsData.results.find((product: Product) => 
               product.category?.toLowerCase() === category.name.toLowerCase() ||
               product.category_names?.some((cat: string) => cat.toLowerCase() === category.name.toLowerCase())
             );

            // Use product image if available, otherwise use a default image
            let imageUrl = 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'; // fallback
            if (categoryProduct?.image) {
              imageUrl = getProductImageUrl(categoryProduct.image, category.name);
            }

                         // Generate subtitle and button text based on category name
             const subtitle = `Discover amazing ${category.name.toLowerCase()} products`;
             const buttonText = `Shop ${category.name}`;
             
             // Map category names to specific routes when available
             const categoryRouteMap: Record<string, string> = {
               'Women': '/women',
               'Men': '/men',
               'Dresses': '/dresses',
               'Kids & Baby': '/kids-baby',
               'Beauty & Accessories': '/beauty-accessories',
               'Accessories': '/accessories',
               'African Ware': '/african',
               'Clearance': '/clearance',
               'New Arrivals': '/new-arrivals',
               'Home': '/home'
             };
             
             // Use specific route if available, otherwise use dynamic category route
             const link = categoryRouteMap[category.name] || `/category/${category.id}`;
             const gradient = gradients[index % gradients.length];

            return {
              ...category,
              image: imageUrl,
              subtitle,
              buttonText,
              gradient,
              link,
            };
          })
        );

        setCategories(categoriesWithImages);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithImages();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by <span className="text-red-600">Category</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Discover amazing finds in every department
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="relative overflow-hidden rounded-2xl bg-gray-200 animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
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
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to a default image if the product image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg';
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80`}></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.subtitle}</p>
                  <span className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all group-hover:translate-x-1">
                    {category.buttonText}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white group-hover:border-opacity-50 rounded-2xl transition-all duration-300"></div>
            </Link>
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