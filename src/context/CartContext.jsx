import axios from "axios";
import React, { createContext, useContext } from "react";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useContext(authContext);
  

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
      .then((res) => {
        console.log("Product added to cart:", res.data);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  }

  return (
    <cartContext.Provider value={{ addProductToCart }}>
      {children}
    </cartContext.Provider>
  );
}
