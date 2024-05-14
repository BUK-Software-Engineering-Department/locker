import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";
import EditProfile from "../pages/EditProfile";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import PendingReservations from "../pages/PendingReservations";
import ReservedLockers from "../pages/ReservedLockers";
import Auth from "./Auth";
import UserAuth from "./UserAuth";

const Layout = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <UserAuth>
              <Dashboard />
            </UserAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <Auth>
              <AdminDashboard />
            </Auth>
          }
        />
        <Route
          path="/pending"
          element={
            <Auth>
              <PendingReservations />
            </Auth>
          }
        />
        <Route
          path="/reserved"
          element={
            <Auth>
              <ReservedLockers />
            </Auth>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Auth>
              <EditProfile />
            </Auth>
          }
        />
      </Routes>
    </Box>
  );
};

export default Layout;
