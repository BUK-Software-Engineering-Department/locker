import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import HalfScreen from "../components/HalfScreen";
import { ArrowBackIos } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const [staffId, setStaffId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // const [wrongStaffId, setWrongStaffId] = React.useState(false);
  // const [wrongPassword, setWrongPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        staffId: staffId,
        password: password,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/admin_login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.log(JSON.stringify(formData));
        alert("Failed to Log in! Please try again.");
        throw new Error("Failed to submit form");
      }
      const user = await response.json();
      delete user.password;
      console.log("Form submitted successfully");
      dispatch(authActions.loginAdmin(user));
      navigate("/admin");
    } catch (error) {
      console.error("Error logging user in: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HalfScreen>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "2em",
            }}
          >
            <Button
              sx={{
                cursor: "pointer",
                color: "#000",
                textTransform: "none",
                "&:hover": { background: "none" },
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIos sx={{ height: "1rem" }} />
              <Typography
                variant="body2"
                sx={{ fontSize: "1rem", fontWeight: 700 }}
              >
                Back
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "3em",
            }}
          >
            <Box sx={{ width: "70%" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                <span style={{ color: "#FFA881" }}>Sign In</span> To Your
                Account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: " 1.6065rem",
                  color: "#565656",
                  textDecoration: "none",
                }}
              >
                Sign In as Admin
              </Typography>
              <InputLabel
                htmlFor="staffId"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Staff ID
              </InputLabel>
              <TextField
                required
                id="staffId"
                label="Enter your Staff ID"
                type="text"
                value={staffId}
                onChange={(event) => {
                  setStaffId(event.target.value);
                }}
                sx={{ width: "100%" }}
              />
              {/* <Typography
                variant="body2"
                sx={{
                  color: "red",
                  display: wrongStaffId ? "block" : "none",
                }}
              >
                Wrong staff ID inputed
              </Typography> */}

              <InputLabel
                htmlFor="password"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Password
              </InputLabel>
              <TextField
                required
                id="password"
                label="Enter password"
                type={showPassword === false ? "password" : "true"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                sx={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Button
                        sx={{
                          textTransform: "none",
                          color: "#4A4A4A",
                          "&:hover": { background: "none" },
                        }}
                        disableRipple
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Typography
                variant="body2"
                sx={{
                  color: "red",
                  display: wrongPassword ? "block" : "none",
                }}
              >
                Wrong password inputed
              </Typography> */}
              <Box
                sx={{
                  marginTop: "2em",
                }}
              >
                <Link
                  to="#"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  Forgot password
                </Link>
              </Box>
              <Button
                sx={{
                  backgroundColor: "#040E18",
                  width: "100%",
                  marginTop: "2em",
                  marginBottom: "4em",
                  padding: "1em",
                  textDecoration: "none",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.918rem",
                  border: "1px solid #040E18",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#040E18",
                  },
                }}
                onClick={handleLogin}
                disableRipple
                disabled={loading}
              >
                {loading ? <CircularProgress size={25} /> : "Sign In"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </HalfScreen>
  );
};

export default AdminLogin;
