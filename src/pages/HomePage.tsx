
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
    <div className="min-h-screen text-gray-900 font-sans relative">
      {/* OSKO BUYS Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff1f1] via-white to-[#fff1f1]">
        {/* OSKO BUYS Watermark Pattern with Animations */}
        <div className="absolute inset-0 opacity-[0.20] select-none">
          <div className="absolute top-20 left-10 text-[#ff272a] font-bold text-7xl transform -rotate-12 animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer">OSKO</div>
          <div className="absolute top-40 left-16 text-[#074786] font-bold text-7xl transform -rotate-12 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '1s'}}>BUYS</div>
          <div className="absolute top-60 right-20 text-[#ff272a] font-bold text-6xl transform rotate-12 animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '2s'}}>OSKO</div>
          <div className="absolute top-80 right-16 text-[#074786] font-bold text-6xl transform rotate-12 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '3s'}}>BUYS</div>
          <div className="absolute bottom-40 left-1/4 text-[#ff272a] font-bold text-5xl transform -rotate-6 animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '0.5s'}}>OSKO</div>
          <div className="absolute bottom-32 left-1/3 text-[#074786] font-bold text-5xl transform -rotate-6 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '1.5s'}}>BUYS</div>
          <div className="absolute top-1/3 right-1/4 text-[#ff272a] font-bold text-4xl transform rotate-6 animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '2.5s'}}>OSKO</div>
          <div className="absolute top-1/3 right-1/5 text-[#074786] font-bold text-4xl transform rotate-6 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '3.5s'}}>BUYS</div>
          <div className="absolute top-1/2 left-1/4 text-[#ff272a] font-bold text-6xl transform -rotate-8 animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '1.2s'}}>OSKO</div>
          <div className="absolute top-1/2 left-1/3 text-[#074786] font-bold text-6xl transform -rotate-8 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '2.2s'}}>BUYS</div>
        </div>
        
        {/* Animated Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute top-10 right-10 w-40 h-40 border-4 border-[#ff272a] rounded-full animate-spin hover:scale-125 transition-all duration-500 cursor-pointer" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-20 left-20 w-36 h-36 border-4 border-[#074786] rounded-lg transform rotate-45 animate-pulse hover:scale-125 transition-all duration-500 cursor-pointer"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-[#ff272a] rounded-full opacity-60 animate-bounce hover:scale-125 transition-all duration-500 cursor-pointer" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-[#074786] rounded-lg opacity-60 transform rotate-12 animate-pulse hover:scale-125 transition-all duration-500 cursor-pointer" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/4 right-1/3 w-20 h-20 border-4 border-[#ff272a] rounded-full animate-spin hover:scale-125 transition-all duration-500 cursor-pointer" style={{animationDuration: '15s'}}></div>
          <div className="absolute bottom-1/4 left-1/5 w-16 h-16 bg-[#074786] rounded-lg opacity-70 animate-bounce hover:scale-125 transition-all duration-500 cursor-pointer" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Animated Brand Elements */}
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="absolute top-1/4 left-1/2 w-4 h-24 bg-gradient-to-b from-[#ff272a] to-transparent animate-pulse hover:h-28 transition-all duration-300 cursor-pointer"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-20 bg-gradient-to-b from-[#074786] to-transparent animate-bounce hover:h-24 transition-all duration-300 cursor-pointer" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/5 w-20 h-4 bg-gradient-to-r from-[#ff272a] to-transparent animate-pulse hover:w-24 transition-all duration-300 cursor-pointer" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-4 bg-gradient-to-r from-[#074786] to-transparent animate-bounce hover:w-20 transition-all duration-300 cursor-pointer" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
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
                className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-md italic text-gray-700"
              >
                <p className="mb-4">"{t.text}"</p>
                <p className="font-bold text-right">- {t.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
