import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return setAuth(false);

      const res = await fetch("http://localhost:5000/api/admin/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      setAuth(result.valid);
    };
    checkToken();
  }, []);

  if (auth === null) return <div>Checking authentication...</div>;
  return auth ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
