import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  if (!localStorage.getItem("userToken")) return children;
  return <Navigate to="/home" />;
}
