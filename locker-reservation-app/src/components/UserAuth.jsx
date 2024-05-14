/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserAuth = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default UserAuth;
