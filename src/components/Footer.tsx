import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../services/productServices";
import images from "../assets/images/images";

interface Category {
  id: number;
  name: string;
  description?: string;
}

const Footer = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <footer className="bg-white">
            <div className="footer_top w-full border-t border-b border-[#e1e3e5] pt-8 md:pt-16 lg:pt-20 pb-8 md:pb-12 lg:pb-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Company Info */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            {/* logo wrapper  */}
                            <div className="logo_wrapper mb-1 md:mb-2 flex items-center justify-start">
                                <Link to='/' className="flex items-center gap-2">
                                    <img src={images.logo1} alt="logo" className="w-[100px] h-auto object-contain" />
                                    <span className="hidden sm:inline text-base md:text-lg text-black font-inter font-medium capitalize">Osko Buys</span>
                                    <span className="sm:hidden text-base text-black font-inter font-medium capitalize">Osko</span>
                                </Link>
                            </div>

                            <p className="text-sm md:text-base text-[#272343] font-inter font-normal mb-4 max-w-[350px]">
                                Discover the latest trends in fashion, beauty, and lifestyle at Osko Buys. We offer premium quality products with exceptional customer service and fast, reliable shipping to enhance your shopping experience.
                            </p>

                            <div className="footer_social flex items-center gap-2 md:gap-3">
                                <Link to="#" className="p-2 md:p-3 rounded-full border-[#074786] inline-block border-[1px] hover:bg-[#074786] hover:text-white transition-colors">
                                    <Facebook size='1.25rem' className="md:w-6 md:h-6" color="#074786" />
                                </Link>
                                <Link to="#" className="p-2 md:p-3 inline-block hover:bg-[#074786] hover:text-white transition-colors">
                                    <Twitter size='1.25rem' className="md:w-6 md:h-6" color="#074786" />
                                </Link>
                                <Link to="#" className="p-2 md:p-3 inline-block hover:bg-[#074786] hover:text-white transition-colors">
                                    <Instagram size='1.25rem' className="md:w-6 md:h-6" color="#074786" />
                                </Link>
                                <Link to="#" className="p-2 md:p-3 inline-block hover:bg-[#074786] hover:text-white transition-colors">
                                    <Youtube size='1.25rem' className="md:w-6 md:h-6" color="#074786" />
                                </Link>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="footer_wrapper">
                            <h3 className="text-lg md:text-xl text-[#074786] font-inter font-medium uppercase mb-3 md:mb-4">category</h3>
                            <ul className="space-y-1 md:space-y-2">
                                {loading ? (
                                    <li className="text-sm md:text-base text-[#272343] font-inter font-normal">Loading...</li>
                                ) : categories.length > 0 ? (
                                    categories.slice(0, 6).map((category) => (
                                        <li key={category.id}>
                                            <Link 
                                                to={`/category/${category.id}`} 
                                                className="text-sm md:text-base text-[#272343] font-inter font-normal capitalize hover:text-[#ff272a] transition-colors"
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-sm md:text-base text-[#272343] font-inter font-normal">No categories available</li>
                                )}
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="footer_wrapper">
                            <h3 className="text-lg md:text-xl text-[#074786] font-inter font-medium uppercase mb-3 md:mb-4">support</h3>
                            <ul className="space-y-1 md:space-y-2">
                                <li><Link to="#" className="text-sm md:text-base text-[#272343] font-inter font-normal capitalize hover:text-[#ff272a] transition-colors">help & support</Link></li>
                                <li><Link to="#" className="text-sm md:text-base text-[#272343] font-inter font-normal capitalize hover:text-[#ff272a] transition-colors">terms & conditions</Link></li>
                                <li><Link to="#" className="text-sm md:text-base text-[#272343] font-inter font-normal capitalize hover:text-[#ff272a] transition-colors">privacy policy</Link></li>
                                <li><Link to="/contact" className="text-sm md:text-base text-[#272343] font-inter font-normal capitalize hover:text-[#ff272a] transition-colors">contact us</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="newsletter col-span-1 md:col-span-2 lg:col-span-1">
                            <h3 className="text-lg md:text-xl text-[#074786] font-inter font-medium uppercase mb-3 md:mb-4">newsletter</h3>
                            <form action="#" className="w-full">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input 
                                        type="email" 
                                        placeholder="Your Email.." 
                                        className="flex-1 h-10 md:h-12 border-[#e1e3e5] border-[1px] rounded-lg px-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#ff272a] focus:border-transparent" 
                                    />
                                    <button 
                                        type="submit" 
                                        className="text-sm md:text-base text-white font-semibold capitalize px-4 md:px-6 h-10 md:h-12 bg-[#ff272a] hover:bg-[#e5181b] rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer_bottom py-4 md:py-6 border-t border-[#e1e3e5]">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <p className="text-sm text-[#272343] font-inter">
                            © 2025 Osko Buys. All rights reserved.
                        </p>
                        {/* <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-[#272343] font-inter">
                            <Link to="#" className="hover:text-[#ff272a] transition-colors">Privacy Policy</Link>
                            <Link to="#" className="hover:text-[#ff272a] transition-colors">Terms of Service</Link>
                            <Link to="#" className="hover:text-[#ff272a] transition-colors">Cookie Policy</Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;