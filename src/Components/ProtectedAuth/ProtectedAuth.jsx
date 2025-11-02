import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

export default function ProtectedAuth({ children }) {
  const { userToken } = useContext(authContext);
  if (!userToken) return children;
  return <Navigate to="/home" />;
}
