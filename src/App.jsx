import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Offline } from "react-detect-offline";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Brand from "./Components/Brand/Brand";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import Checkout from "./Components/Checkout/Checkout";
import Favorite from "./Components/Favorite/Favorite";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Products from "./Components/Product/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import FavoriteContextProvider from "./context/FavoriteContext";
import Orders from "./Components/Orders/Orders";
import SubCategory from "./Components/Category/SubCategory";
import { Provider } from "react-redux";
import { createdStore } from "./redux/reduxStore";
import About from "./Components/About/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brandDetails/:id",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brand",
        element: (
          <ProtectedRoute>
            <Brand />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "subcategory/:id",
        element: (
          <ProtectedRoute>
            <SubCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <ProtectedRoute>
            <Favorite />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default function App() {
  // Create a client

  const queryClient = new QueryClient();

  return (
    <>
    <Provider store={createdStore}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <FavoriteContextProvider>
              <RouterProvider router={router} />
              <Toaster />
            </FavoriteContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Offline>
        <div className="bg-black p-5 fixed top-0 start-5 text-white"></div>
        You are currently offline.
      </Offline>
      </Provider>
    </>
  );
}
