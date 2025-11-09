import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useContext(authContext);

  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState(null);
  const [cartId, setCartId] = useState(null);

  console.log("Cart Id", cartId);
  console.log("products", products);
  console.log("totalCartPrice", totalCartPrice);

  const numberOfCartItems = products ? products.length : 0;

  useEffect(() => {
    if (userToken) {
      getUserCart();
    }
  }, []);

function resetValues(){
  setTotalCartPrice(0);
  setProducts(null);
  setCartId(null);
}

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
        setCartId(res.data.cartId);
      });
  }

  function cartExists(productId) {
    return products?.some((item) => item.product._id === productId);
  }

  function addProductToCart(productId) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then(() => {
        toast.success("Product added to cart successfully!", {
          duration: 1000,
          position: "top-center",
        });
        getUserCart();
      });
  }

  function updateCartItem(productId, count) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => {
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
      });
  }

  function removeCartItem(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
        toast.success("Product removed from cart successfully!", {
          duration: 1000,
          position: "top-center",
          style: {
            background: "#f87171", // Tailwind's red-400
            color: "#fff",
          },
        });
      });
  }



  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        updateCartItem,
        removeCartItem,
        cartExists,
        setCartId,
        setTotalCartPrice,
        setProducts,
        resetValues,
        numberOfCartItems,
        totalCartPrice,
        products,
        cartId, 
      }}
    >
      <Toaster />
      {children}
    </cartContext.Provider>
  );
}
