// import React from "react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            FreshCart
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
        </div>

        {/* Center - Navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
          <a href="/products" className="hover:text-white transition-colors">
            Products
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>

        {/* Right - Social Icons */}
        <div className="flex justify-center md:justify-end gap-5 text-xl">
          <a
            href="https://www.facebook.com/mohamed.ahmed.825841/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="https://x.com/mohamedsay64305"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition-colors"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/mohamed-ahmed-bb8194219/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-100 transition-colors"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-sm text-gray-500 text-center">
        Built with ❤️ by Mohamed
      </div>
    </footer>
  );
}
