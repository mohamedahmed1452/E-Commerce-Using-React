import React, { useContext } from "react";
import FreshLogo from "../../assets/img/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import { cartContext } from "../../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { userToken, setUserToken } = useContext(authContext);
  const { numberOfCartItems } = useContext(cartContext);

  function userLoggedOut() {
    localStorage.clear();
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="     bg-gray-300       sticky  w-full z-10 p-3  top-0 left-0 right-0 ">
        <div className="container  mx-auto text-center flex  justify-between ">
          <div className="flex gap-5 ms-5">
            <Link to="">
              <img src={FreshLogo} alt="Fresh Cart" />
            </Link>

            {userToken && (
              <ul className="flex items-center space-x-7">
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/brand">Brands</Link>
                </li>
                <li>
                  <Link to="/category">Categories</Link>
                </li>
              </ul>
            )}
          </div>

          <div className="flex gap-7 me-5">
            <ul className="flex items-center gap-5">
              {userToken && (
                <Link to="/cart">
                  <li className="relative">
                    <i className="fa-solid cursor-pointer   fa-cart-shopping"></i>
                    <span className="absolute w-5 h-5 text-center bg-red-700 -top-3 -right-3 text-white">
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

            <ul className="flex items-center gap-4 ">
              {userToken ? (
                <li>
                  <span className="cursor-pointer" onClick={userLoggedOut}>
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
