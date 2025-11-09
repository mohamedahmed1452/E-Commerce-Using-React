import React, { useContext, useState } from "react";
import FreshLogo from "../../assets/img/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import { cartContext } from "../../context/CartContext";
import { favoriteContext } from "../../context/FavoriteContext";
import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { userToken, setUserToken } = useContext(authContext);
  const { numberOfCartItems } = useContext(cartContext);
  const { noumberOfFavoriteItems } = useContext(favoriteContext);
  const [isOpen, setIsOpen] = useState(false);
  console.log('numberOfCartItems:', numberOfCartItems);
  console.log('noumberOfFavoriteItems:', noumberOfFavoriteItems);
  
  

  function userLoggedOut() {
    localStorage.clear();
    setUserToken(null);
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {userToken && (
            <button
              className="md:hidden text-gray-700 hover:text-emerald-600 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          )}

          <Link to="/">
            <img src={FreshLogo} alt="Fresh Cart" className="w-40 sm:w-48" />
          </Link>
        </div>

        {/* Center Nav Links */}
        {userToken && (
          <ul
            className={`absolute md:static left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-7 font-medium text-gray-700 text-lg ps-5 md:p-0 transition-all duration-300 ${
              isOpen
                ? "opacity-100 visible top-[64px]"
                : "opacity-0 invisible md:opacity-100 md:visible top-[-200px]"
            }`}
          >
            <NavLink to="/" className="hover:text-emerald-600">
              Home
            </NavLink>
            <NavLink to="/brand" className="hover:text-emerald-600">
              Brands
            </NavLink>
            <NavLink to="/category" className="hover:text-emerald-600">
              Categories
            </NavLink>
          </ul>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {userToken && (
            <div className="flex items-center gap-4">
              <Link to="/favorites" className="relative group">
                <Heart className="text-rose-600 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {noumberOfFavoriteItems}
                </span>
              </Link>

              <Link to="/cart" className="relative group">
                <ShoppingCart className="text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {numberOfCartItems}
                </span>
              </Link>
            </div>
          )}

          {/* Social icons */}
          <div className="hidden md:flex gap-3 text-gray-500">
            <i className="fa-brands fa-facebook-f hover:text-blue-600 transition"></i>
            <i className="fa-brands fa-twitch hover:text-purple-600 transition"></i>
            <i className="fa-brands fa-behance hover:text-sky-500 transition"></i>
            <i className="fa-brands fa-linkedin hover:text-blue-700 transition"></i>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-3 text-gray-700 text-lg">
            {userToken ? (
              <>
                <NavLink to="/allorders" className="hover:text-emerald-600">
                 Orders
                </NavLink>

                <button
                  onClick={userLoggedOut}
                  className="flex items-center gap-1 hover:text-red-600 transition font-medium"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="flex items-center gap-1 hover:text-emerald-600 transition font-medium"
                >
                  <UserPlus size={20} /> Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="flex items-center gap-1 hover:text-emerald-600 transition font-medium"
                >
                  <LogIn size={20} /> Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
