import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
export const authContext = createContext();
export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);





  useEffect(() => {
    if (userToken) {
      setUserData(jwtDecode(userToken));
    }
  }, [userToken]);

  useEffect(() => {
    const tkn=localStorage.getItem('userToken');
    if (tkn !== null) {
      setUserToken(tkn);
    }



  }, []);

  return (
    <div>

      <authContext.Provider value={{ setUserToken, userToken, userData }}>
        {children}
        </authContext.Provider>

    </div>
  );
}
