import React from "react";
import FreshLogo from "../../assets/img/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav
        className="  border-b   bg-green-400
       fixed  w-full z-10 p-3  top-0 left-0 right-0 "
      >
        <div className="container  mx-auto text-center flex  justify-between ">
          <div className="flex gap-5 ms-5">
            <Link to="">
              <img src={FreshLogo} alt="Fresh Cart" />
            </Link>

            <ul className="flex items-center space-x-7">
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="#">Category</Link>
              </li>
              <li>
                <Link to="#">Cart</Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-7 me-5">
            <ul className="flex items-center gap-5">
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
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>

              <li>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

  
    </>
  );
}
