import React, { useContext, useState } from "react";
import FreshLogo from "../../assets/img/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import { cartContext } from "../../context/CartContext";
import { Menu, X } from "lucide-react"; // icons for hamburger
import { favoriteContext } from "../../context/FavoriteContext";
export default function Navbar() {
  const navigate = useNavigate();
  const { userToken, setUserToken } = useContext(authContext);
  const { numberOfCartItems } = useContext(cartContext);
  const {noumberOfFavoriteItems}=useContext(favoriteContext)
  const [isOpen, setIsOpen] = useState(false);

  function userLoggedOut() {
    localStorage.clear();
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className=" bg-neutral-400  sticky  w-full z-10 p-3  top-0 left-0 right-0 ">
        <div className="container  mx-auto text-center flex  justify-between ">
          <div className="flex md:gap-5 md:ms-5">
            <button
              className={(userToken)?`md:hidden text-gray-700 `:`hidden`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <Menu size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/" className="me-5">
              <img className="w-52"  src={FreshLogo} alt="Fresh Cart" />
            </Link>

            {userToken && (
              <ul
                className={`md:text-[22px] text-shadow-slate-600 flex flex-col items-start ps-10  md:flex-row md:items-center md:space-x-7 absolute md:static bg-gray-200 md:bg-transparent left-0 w-full md:w-auto top-12 md:top-auto transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible md:opacity-100 md:visible"
                }`}
              >
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>

                <li>
                  <NavLink to="/brand">Brands</NavLink>
                </li>
                <li>
                  <NavLink to="/category">Categories</NavLink>
                </li>
              </ul>
            )}
          </div>

          <div className="flex gap-5 md:me-5">
            <ul className="flex  gap-2 md:gap-5 md:text-[18px] ">
              {userToken && (
                <Link to="/favorites">
                  <li className="relative">
                    <i className="cursor-pointer text-red-700 fa-solid fa-heart"></i>
                    <span className="bg-[#ff6b6b] w-[15px] h-[15px] rounded-full absolute  text-center text-[12px]  font-semibold bottom-[19px] left-[12px] text-white">
                      {noumberOfFavoriteItems}
                    </span>
                  </li>
                </Link>
              )}
              {userToken && (
                <Link to="/cart">
                  <li className="relative">
                    <i className="fa-solid cursor-pointer text-2xl text-emerald-600  fa-cart-shopping text"></i>
                    <span className="bg-[#ff6b6b] w-[15px] h-[15px] rounded-full absolute  text-center text-[12px]  font-semibold bottom-[19px] left-[12px] text-white">
                      {numberOfCartItems}
                    </span>
                  </li>
                </Link>
              )}

              <li>
                <i className="fa-brands cursor-pointer  fa-facebook-f "></i>
              </li>
              <li>
                <i className="fa-brands cursor-pointer  fa-twitch"></i>
              </li>
              <li>
                <i className="fa-brands  cursor-pointer fa-behance"></i>
              </li>
              <li>
                <i className="fa-brands  cursor-pointer fa-linkedin"></i>
              </li>
            </ul>

            <ul className="flex cursor-pointer  md:gap-4 md:text-[22px] text-shadow-slate-600">
              {userToken ? (
                <li>
                  <span  onClick={userLoggedOut}>
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
