import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toastFire } from "../utils/toastFire";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      toastFire("error", "يجب تسجيل الدخول اولاً");
    }
  });

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
