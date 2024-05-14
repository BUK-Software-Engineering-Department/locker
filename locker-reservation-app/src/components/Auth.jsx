/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  if (!user) {
    return <Navigate to="/admin-login" />;
  }
  return <>{children}</>;
};

export default Auth;
