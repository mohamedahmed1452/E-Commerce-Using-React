import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import toast from "react-hot-toast";

export const favoriteContext = createContext();
export default function FavoriteContextProvider({ children }) {
  const { userToken } = useContext(authContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [noumberOfFavoriteItems, setNumberOfFavoriteItems] = useState(0);

  function addToFavorite(productId) {
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
        toast.success("Product added to favorites successfully!", {
          duration: 1000,
          position: "top-center",
        });

        getFavoriteItems();
      });
  }
  function isExistInFavorite(productId) {
    return favoriteItems.products?.some(
      (item) => item.product._id === productId
    );
  }

  function removeFromFavorite(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: userToken,
        },
      })
      .then(() => {
        toast.success("Product removed from favorites successfully!", {
          duration: 1000,
          position: "top-center",
          style: {
            background: "#f87171", // Tailwind's red-400
            color: "#fff",
          },
        });
        getFavoriteItems();
      });
  }

  function getFavoriteItems() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setNumberOfFavoriteItems(res.data.data.products.length);
        setFavoriteItems(res.data.data);
      })
      .catch((err) => {
        console.log(err, "err in get favorite items");
      });
  }
  useEffect(() => {
    if (userToken) {
      getFavoriteItems();
      console.log("noumberOfFavoriteItems", noumberOfFavoriteItems);
    }
  }, []);

  return (
    <favoriteContext.Provider
      value={{
        favoriteItems,
        noumberOfFavoriteItems,
        addToFavorite,
        removeFromFavorite,
        getFavoriteItems,
        isExistInFavorite,
      }}
    >
      <div>{children}</div>
    </favoriteContext.Provider>
  );
}
