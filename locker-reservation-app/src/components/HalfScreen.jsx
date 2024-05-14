/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import halfscreen from "../icons/halfscreen.svg";
import logo from "../icons/logofff.svg";
import laptop from "../icons/laptop.svg";
import lock from "../icons/lock.svg";
import { useLocation } from "react-router-dom";

const HalfScreen = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          backgroundImage: `url(${halfscreen})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          paddingTop: "3em",
          width: { xs: "0%", md: "50%" },
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "93%",
              width: "80%",
            }}
          >
            <Box sx={{ width: "5em", alignSelf: "start" }}>
              <img src={logo} alt="" style={{ width: "100%" }} />
            </Box>
            <Box>
              <img
                src={
                  location.pathname === "/register" ||
                  location.pathname === "/edit-profile"
                    ? laptop
                    : lock
                }
                alt=""
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>{children}</Box>
    </Box>
  );
};

export default HalfScreen;
