import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
export const authContext = createContext();




export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);




 useEffect(() => {
    if (userToken === null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, []);
  useEffect(() => {
    if (userToken) {
      setUserData(jwtDecode(userToken));
    }
  }, [userToken]);

  useEffect(() => {
    if (userToken === null) {
      setUserToken(localStorage.getItem('userToken'));
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
