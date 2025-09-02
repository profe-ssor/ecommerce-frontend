import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import images from "../../assets/images/images";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { getCategories } from "../../services/productServices";

interface Category {
  id: number;
  name: string;
  description?: string;
}

const Header = () => {
  const { state } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Dresses", path: "/dresses" },
    { name: "Women", path: "/women" },
    { name: "Men", path: "/men" },
    { name: "African Wear", path: "/african" },
    { name: "Beauty & Accessories", path: "/beauty-accessories" },
    { name: "Kids & Baby", path: "/kids-baby" },
  
    { name: "Clearance", path: "/clearance" },
  ];

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Navbar Middle */}
      <div className="navbar_middle flex items-center justify-center bg-gradient-to-r from-[#ff272a] via-[#074786] to-[#ff272a] w-full h-[84px]">
        <div className="lg:container grid grid-cols-3 items-center">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="logo_wrapper">
            <Link
              to="/"
              className="text-3xl text-white font-inter font-medium capitalize flex items-center gap-2 hover:text-[#ff272a] transition-colors"
            >
              <img src={images.logo1} alt="logo" className="w-[100px]" />
            </Link>
          </div>

          {/* Search (desktop only) */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="navbar_middle_right flex items-center gap-4 justify-end">
            {/* Search (mobile toggle) */}
            <button
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors lg:hidden text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
           <Link to="/store/cart" className="btn capitalize relative bg-white text-[#074786] border-2 border-white hover:bg-[#ff272a] hover:text-white hover:border-[#ff272a] transition-all duration-300 font-semibold shadow-md">
  <ShoppingCart />
  cart
  {state.cart.length > 0 && (
    <div className="badge badge-sm bg-[#ff272a] absolute -top-1 -right-2 text-white font-bold">
      {state.cart.length}
    </div>
  )}
</Link>


            {/* Wishlist */}
            <Link to="/wishlist" className="btn capitalize relative bg-white text-[#074786] border-2 border-white hover:bg-[#ff272a] hover:text-white hover:border-[#ff272a] transition-all duration-300 font-semibold shadow-md">
              <Heart />
              {state.wishlist.length > 0 && (
                <span className="badge badge-sm bg-[#ff272a] absolute -top-1 -right-2 text-white font-bold">
                  {state.wishlist.length}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1 bg-white text-[#074786] border-2 border-white hover:bg-[#ff272a] hover:text-white hover:border-[#ff272a] transition-all duration-300 font-semibold shadow-md">
                <User />
                {isAuthenticated && user && (
                  <span className="hidden md:inline ml-2">{user.username}</span>
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/account">Account</Link>
                    </li>
                    <li>
                      <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="flex items-center gap-2">
                        <LogOut size={16} />
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="lg:hidden py-4 px-4 border-t border-gray-200 bg-white">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <SearchBar />
          </button>
        </div>
      )}

      {/* Navbar Bottom */}
      <div className="navbar_bottom flex items-center justify-center w-full h-[75px] bg-white border-b-[1px] border-[#074786] shadow-sm">
        <div className="lg:container flex items-center justify-between">
          <div className="navbar_bottom_left flex items-center gap-8">
            {/* Categories Dropdown */}
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 flex items-center gap-5 capitalize bg-[#074786] hover:bg-[#ff272a] text-white border-none transition-all duration-300"
              >
                <Menu /> all categories
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {loading ? (
                  <li className="text-gray-500">Loading...</li>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link to={`/category/${category.id}`} className="capitalize">
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No categories available</li>
                )}
              </ul>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-inter font-medium capitalize transition-colors ${
                      isActive
                        ? "text-[#ff272a] font-bold"
                        : "text-[#074786] hover:text-[#ff272a]"
                    } ${
                      item.name === "Clearance"
                        ? "text-[#ff272a] font-bold"
                        : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

      
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#074786] bg-white">
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-[#074786] hover:text-[#ff272a] font-medium transition-colors py-2 ${
                    location.pathname === item.path ? "text-[#ff272a] font-bold" : ""
                  } ${item.name === "Clearance" ? "text-[#ff272a] font-bold" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;