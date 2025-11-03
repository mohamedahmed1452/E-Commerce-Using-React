import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Products from "./Components/Product/Products";
import AuthContextProvider from "./context/AuthContext";
import Home from "./Components/Home/Home";
import Category from "./Components/Category/Category";
import Cart from "./Components/Cart/Cart";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import { Offline, Online } from "react-detect-offline";
import Brand from "./Components/Brand/Brand";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
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
        path: "brand",
        element: (
          <ProtectedRoute>
            <Brand />
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
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
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
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Offline>
        <div className="bg-black p-5 fixed top-0 start-5 text-white"></div>
        You are currently offline.
      </Offline>
    </>
  );
}

