import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useContext(authContext);
  // let navigate = useNavigate();

  // const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState(null);
  const [cartId, setCartId] = useState(null);

  console.log("Cart Id", cartId);

  const numberOfCartItems = products ? products.length : 0;

  useEffect(() => {
    if (userToken) {
      getUserCart();
    }
  }, [userToken]);

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        // setNumberOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
        setCartId(res.data.cartId);
      })
      .catch(() => {
        console.log("Error fetching cart data");
      });
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
      })
      .catch(() => {
        toast.error("Failed to add product to cart.", {
          duration: 1000,
          position: "top-center",
        });
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
        // setNumberOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
      })
      .catch(() => {
        toast.error("Failed to update cart item.", {
          duration: 1000,
          position: "top-center",
        });
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
        // setNumberOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
      })
      .catch(() => {
        toast.error("Failed to remove cart item.", {
          duration: 1000,
          position: "top-center",
        });
      });
  }

  function orderCash(shippingAddress) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shippingAddress,
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Checkout initiated successfully!", {
            duration: 1000,
            position: "top-center",
          });

          setTotalCartPrice(0);
          setProducts(null);
          setCartId(null);
        }
      })
      .catch(() => {
        toast.error("Failed to initiate checkout.", {
          duration: 1000,
          position: "top-center",
        });
      });
  }
  function orderCheckout(shippingAddress) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        shippingAddress,
        {
          headers: {
            token: userToken,
          },
          params: {
            url: "http://localhost:5173/",
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Checkout initiated successfully!", {
            duration: 1000,
            position: "top-center",
          });
          window.open(res.data.session.url, "_self");
        } 
      })
      .catch(() => {
        toast.error("Failed to initiate checkout.", {
          duration: 1000,
          position: "top-center",
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
        orderCheckout,
        orderCash,
        numberOfCartItems,
        totalCartPrice,
        products,
      }}
    >
      <Toaster />
      {children}
    </cartContext.Provider>
  );
}
