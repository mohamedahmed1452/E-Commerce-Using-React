import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { userToken } = useContext(authContext);
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
}
