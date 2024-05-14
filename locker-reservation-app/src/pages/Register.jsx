import {
  Box,
  TextField,
  Typography,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import HalfScreen from "../components/HalfScreen";
import React from "react";
import { ArrowBackIos } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const Register = () => {
  const [callCode, setCallCode] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullname: { value: "", isValid: true, errorText: "Fullname is required" },
    regNo: {
      value: "",
      isValid: true,
      errorText: "Registration Number is required",
    },
    password: { value: "", isValid: true, errorText: "Password is required" },
    email: { value: "", isValid: true, errorText: "Email is required" },
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: {
        ...prev[event.target.name],
        value: event.target.value,
        isValid: event.target.value == "" ? false : true,
      },
    }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegistration = async (e) => {
    e.preventDefault();
    let isFormValid = [];
    for (let key in formData) {
      if (formData[key].value == "") {
        isFormValid.push(false);
      } else isFormValid.push(formData[key].isValid);
    }

    setFormData((prev) => {
      let newObject = {};
      for (let field in prev) {
        newObject[field] = {
          ...prev[field],
          isValid: prev[field].value == "" ? false : true,
        };
      }
      return newObject;
    });
    if (isFormValid.includes(false)) {
      return alert("Please fill out all required fields");
    } else {
      const regData = {
        fullname: formData.fullname.value,
        regNo: formData.regNo.value,
        password: formData.password.value,
        email: formData.email.value,
        phone: phone,
      };
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/create_user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(regData),
          }
        );

        if (!response.ok) {
          console.log(JSON.stringify(regData));
          alert("Failed to Register User");
          throw new Error("Failed to submit form");
        }
        const user = await response.json();
        delete user.password;
        console.log("Form submitted successfully");
        dispatch(authActions.registered(user));
        navigate("/login");

        console.log("Form submitted successfully");
      } catch (error) {
        console.error("Error submitting form: ", error.message);
      } finally {
        setLoading(false);
      }
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
                <span style={{ color: "#FFA881" }}>Register</span> as a New User
              </Typography>
              <Link
                style={{
                  fontSize: "0.875rem",
                  lineHeight: " 1.6065rem",
                  color: "#565656",
                  textDecoration: "none",
                }}
                to="/login"
              >
                Already an existing user? Login
              </Link>
              <InputLabel
                required
                htmlFor="fullname"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Your fullname
              </InputLabel>
              <TextField
                error={!formData.fullname.isValid}
                helperText={
                  !formData.fullname.isValid ? formData.fullname.errorText : ""
                }
                required
                id="fullname"
                label="Name"
                type="text"
                value={formData.fullname.value}
                name="fullname"
                onChange={handleChange}
                onBlur={handleChange}
                sx={{ width: "100%" }}
              />

              <InputLabel
                required
                htmlFor="regNo"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Registration Number
              </InputLabel>
              <TextField
                error={!formData.regNo.isValid}
                helperText={
                  !formData.regNo.isValid ? formData.regNo.errorText : ""
                }
                required
                id="regNo"
                label="Enter your registration number"
                type="text"
                name="regNo"
                value={formData.regNo.value}
                onChange={handleChange}
                onBlur={handleChange}
                sx={{ width: "100%" }}
              />

              <InputLabel
                required
                htmlFor="password"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Create password
              </InputLabel>
              <TextField
                required
                error={!formData.password.isValid}
                helperText={
                  !formData.password.isValid ? formData.password.errorText : ""
                }
                id="password"
                label="Enter password"
                type={showPassword === false ? "password" : "true"}
                name="password"
                value={formData.password.value}
                onChange={handleChange}
                onBlur={handleChange}
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

              <InputLabel
                htmlFor="phone"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Phone number
              </InputLabel>
              <TextField
                id="phone"
                type="text"
                name="phone"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        variant="standard"
                        value={callCode}
                        onChange={(event) => {
                          setCallCode(event.target.value);
                        }}
                        displayEmpty
                        sx={{
                          color: "primary.darkText",
                          "& .mui-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            display: "none",
                          },
                          ".mui-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                            color: "none",
                          },
                        }}
                      >
                        <MenuItem value="">+234</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "100%" }}
              />

              <InputLabel
                required
                htmlFor="email"
                sx={{
                  color: "#4A4A4A",
                  fontSize: "0.91338rem",
                  fontWeight: 500,
                  marginBottom: ".6em",
                  marginTop: "1.5em",
                }}
              >
                Your E-mail
              </InputLabel>
              <TextField
                required
                error={!formData.email.isValid}
                helperText={
                  !formData.email.isValid ? formData.email.errorText : ""
                }
                id="email"
                label="Enter email"
                type="email"
                name="email"
                value={formData.email.value}
                onChange={handleChange}
                onBlur={handleChange}
                sx={{ width: "100%" }}
              />
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
                onClick={handleRegistration}
                disableRipple
                disabled={loading}
              >
                {loading ? <CircularProgress size={25} /> : "Register Account"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </HalfScreen>
  );
};

export default Register;
