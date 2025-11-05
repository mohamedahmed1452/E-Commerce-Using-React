import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(() => localStorage.getItem("userToken"));
  const [userData, setUserData] = useState(() => {
    const token = localStorage.getItem('userToken');
    return token ? jwtDecode(token) : null;
  });



  return (
    <div>
      <authContext.Provider value={{ setUserToken,setUserData,userToken, userData }}>
        {children}
      </authContext.Provider>
    </div>
  );
}
