
import CategoryNavigation from "../components/CategoryNavigation";
import FeaturedCollections from "../components/FeaturedCollections";
import HeroSection from "../components/HeroSection";

import ProductCarousel from "../components/ProductCarousel";
import PromotionalBanners from "../components/PromotionalBanners";




const testimonials = [
  { id: 1, name: "Anna K.", text: "Great quality and fast shipping! Highly recommend." },
  { id: 2, name: "Michael S.", text: "Customer service was excellent and the products arrived on time." },
  { id: 3, name: "Sophia L.", text: "Love the style and fit of the clothes. Will buy again!" },
];

export default function HomePage() {



  return (
    <div className="min-h-screen  text-gray-900 font-sans">
      {/* Hero */}

      <HeroSection />

      {/* Featured Categories */}

<CategoryNavigation />
<FeaturedCollections />
      {/* Best Sellers */}
    

      {/* New Arrivals with Scroll Buttons */}
  <ProductCarousel />
        
      {/* Special Offers */}
   <PromotionalBanners />
      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-lg shadow-md italic text-gray-700"
            >
              <p className="mb-4">"{t.text}"</p>
              <p className="font-bold text-right">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
