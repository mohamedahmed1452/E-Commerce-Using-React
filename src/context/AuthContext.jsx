import React, { createContext, useEffect, useState } from "react";
export const authContext = createContext();
export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    setUserToken(localStorage.getItem("userToken"));
  }, []);
  return (
    <div>
      <authContext.Provider value={{ setUserToken, userToken }}>
        {children}
      </authContext.Provider>
    </div>
  );
}
