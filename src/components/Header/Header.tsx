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
import { useState } from "react";
import { SearchBar } from "./SearchBar";

const Header = () => {
  const { state } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Dresses", path: "/dresses" },
    { name: "Women", path: "/women" },
    { name: "Men", path: "/men" },
    { name: "African Ware", path: "/african" },
    { name: "Beauty & Accessories", path: "/beauty-accessories" },
    { name: "Kids & Baby", path: "/kids-baby" },
    { name: "Home", path: "/home" },
    { name: "Clearance", path: "/clearance" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Navbar Middle */}
      <div className="navbar_middle flex items-center justify-center bg-[#f0f2f3] w-full h-[84px]">
        <div className="lg:container grid grid-cols-3 items-center">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="logo_wrapper">
            <Link
              to="/"
              className="text-3xl text-black font-inter font-medium capitalize flex items-center gap-2"
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
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
           <Link to="/store/cart" className="btn capitalize relative">
  <ShoppingCart />
  cart
  {state.cart.length > 0 && (
    <div className="badge badge-sm bg-[#029fae] absolute -top-1 -right-2">
      {state.cart.length}
    </div>
  )}
</Link>


            {/* Wishlist */}
            <button className="btn capitalize relative">
              <Heart />
              {state.wishlist.length > 0 && (
                <span className="badge badge-sm bg-[#029fae] absolute -top-1 -right-2">
                  {state.wishlist.length}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
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
      <div className="navbar_bottom flex items-center justify-center w-full h-[75px] bg-white border-b-[1px] border-[#e1e3e5]">
        <div className="lg:container flex items-center justify-between">
          <div className="navbar_bottom_left flex items-center gap-8">
            {/* Categories Dropdown */}
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 flex items-center gap-5 capitalize"
              >
                <Menu /> all categories
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>Chair</li>
                <li>Pant</li>
                <li>Shirt</li>
                <li>T-Shirt</li>
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
                        ? "text-mainblue"
                        : "text-[#636270] hover:text-mainblue"
                    } ${
                      item.name === "Clearance"
                        ? "text-red-600 font-bold"
                        : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="navbar_bottom_right">
            <p className="text-sm text-[#636270] font-inter font-normal capitalize">
              contact: <span className="text-[#272343]">(808)555-0111</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-gray-700 hover:text-mainblue font-medium transition-colors py-2 ${
                    location.pathname === item.path ? "text-mainblue" : ""
                  } ${item.name === "Clearance" ? "text-red-600 font-bold" : ""}`}
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