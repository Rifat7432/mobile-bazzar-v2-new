import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";

const SubRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (user && token) {
    const decoded: {
      _id: string;
      role: string;
      email: string;
    } = jwtDecode(token);
    if (decoded.role === role) {
      return children;
    }
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SubRoute;
