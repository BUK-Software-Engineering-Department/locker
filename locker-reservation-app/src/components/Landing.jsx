import { Box, Typography } from "@mui/material";
import logo from "../icons/logo.svg";
import heroimg from "../icons/heroimg.svg";
import heroswirl1 from "../icons/heroswirl1.svg";
import heroswirl2 from "../icons/heroswirl2.svg";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { Link } from "react-router-dom";

const Landing = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(authActions.login());
  };

  const handleRegistered = () => {
    dispatch(authActions.registered());
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2em",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ width: "5em" }}>
              <img src={logo} alt="" style={{ width: "100%" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: { lg: "32%", md: "40%" },
              }}
            >
              <Box>
                <Link to="/login" className="login-btn" onClick={handleLogin}>
                  Login
                </Link>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Link
                  to="/register"
                  className="register-btn"
                  onClick={handleRegistered}
                >
                  Sign up
                </Link>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10em",
            }}
          >
            <Box
              sx={{
                width: { lg: "38%", md: "55%", sm: "75%", xs: "90%" },
                position: "relative",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    lg: "2.9rem",
                    md: "2.7rem",
                    sm: "2.6em",
                    xs: "2.5em",
                  },
                  fontWeight: 800,
                  color: "#002347",
                  marginBottom: ".2em",
                  position: "relative",
                  zIndex: "1",
                }}
              >
                Make your Locker{" "}
                <span style={{ color: "#FF5003" }}>Allocation</span> Today
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#565656",
                  fontSize: "1rem",
                  fontWeight: 400,
                  marginBottom: "2em",
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Interdum praesent mauris
                eget interdum aliquet sed lacus non.
              </Typography>
              <Link
                to="/register"
                className="register-btn"
                onClick={handleRegistered}
              >
                Register Now
              </Link>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "60%",
                  left: "10%",
                  display: { lg: "block", md: "block", sm: "none", xs: "none" },
                }}
              >
                <img src={heroswirl1} alt="" />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "105%",
                  right: "40%",
                  display: { lg: "block", md: "block", sm: "none", xs: "none" },
                }}
              >
                <img src={heroswirl2} alt="" />
              </Box>
            </Box>
            <Box
              sx={{
                width: { lg: "29rem", md: "25em" },
                display: { lg: "block", md: "block", sm: "none", xs: "none" },
              }}
            >
              <img src={heroimg} alt="" style={{ width: "100%" }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
