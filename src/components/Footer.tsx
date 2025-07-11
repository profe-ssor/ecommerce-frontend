import { Armchair, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getCategories } from "../services/productServices";

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
        <footer>




            <div className="footer_top mx-h-[343px] w-full border-t border-b border-[#e1e3e5] pt-[80px] pb-[60px]">
                <div className="lg:container mx-auto">

                    <div className="grid grid-cols-4">

                        <div>
                            {/* logo wrapper  */}
                            <div className="logo_wrapper mb-7">
                                <Link to='/' className="text-3xl text-black font-inter font-medium capitalize flex items-center gap-2"><Armchair size='2rem' color="#ff272a" /> Osko Buys</Link>
                            </div>

                            <p className="text-base text-[#272343] font-inter font-normal mb-4 max-w-[350px]">Discover the latest trends in fashion, beauty, and lifestyle at Osko Buys. We offer premium quality products with exceptional customer service and fast, reliable shipping to enhance your shopping experience.</p>

                            <div className="footer_social flex items-center gap-3">
                                <Link to="#" className="p-3 rounded-full border-[#074786] inline-block border-[1px] hover:bg-[#074786] hover:text-white transition-colors"><Facebook size='1.5rem' color="#074786" /></Link>


                                <Link to="#" className="p-3 inline-block hover:bg-[#074786] hover:text-white transition-colors"><Twitter size='1.5rem' color="#074786" /></Link>


                                <Link to="#" className="p-3 inline-block hover:bg-[#074786] hover:text-white transition-colors"><Instagram size='1.5rem' color="#074786" /></Link>


                                <Link to="#" className="p-3 inline-block hover:bg-[#074786] hover:text-white transition-colors"><Youtube size='1.5rem' color="#074786" /></Link>
                            </div>
                        </div>

                        <div className="footer_wrapper">
                            <h3 className="text-xl text-[#074786] font-inter font-medium uppercase">category</h3>
                            <ul className="space-y-2 mt-4">
                                {loading ? (
                                    <li className="text-base text-[#272343] font-inter font-normal">Loading...</li>
                                ) : categories.length > 0 ? (
                                    categories.slice(0, 6).map((category) => (
                                        <li key={category.id}>
                                            <Link 
                                                to={`/category/${category.id}`} 
                                                className="text-base text-[#272343] font-inter font-normal capitalize"
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-base text-[#272343] font-inter font-normal">No categories available</li>
                                )}
                            </ul>
                        </div>

                        <div className="footer_wrapper">
                            <h3 className="text-xl text-[#074786] font-inter font-medium uppercase">support</h3>
                            <ul className="space-y-2 mt-4">
                                <li><Link to="#" className="text-base text-[#272343] font-inter font-normal capitalize">help & support</Link></li>
                                <li><Link to="#" className="text-base text-[#272343] font-inter font-normal capitalize">tearms & condition</Link></li>
                                <li><Link to="#" className="text-base text-[#272343] font-inter font-normal capitalize">privacy policy</Link></li>
                                <li><Link to="#" className="text-base text-[#272343] font-inter font-normal capitalize">help</Link></li>
                            </ul>
                        </div>

                        <div className="newsletter">
                            <h3 className="text-xl text-[#074786] font-inter font-medium uppercase">newsletter</h3>
                            <form action="#" className="max-w-[424px] w-full flex items-center gap-2">
                                <input type="email" placeholder="Your Email.." className="max-w-[285px] w-full h-[46px] border-[#e1e3e5] border-[1px] rounded-lg pl-2" />
                                <button type="submit" className="text-base text-white font-semibold capitalize w-[127px] h-[46px] bg-[#ff272a] hover:bg-[#e5181b] rounded-lg cursor-pointer transition-colors">Subscribe</button>
                            </form>
                        </div>
                    </div>



                </div>
            </div>


            

        </footer >
    );
};

export default Footer;