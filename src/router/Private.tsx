import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import { ReactNode } from "react";


const Private = ({ children}: { children: ReactNode;  }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (user && token) {

    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Private;
