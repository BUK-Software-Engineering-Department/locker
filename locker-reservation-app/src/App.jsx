import {
  Box,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
} from "@mui/material";
import Layout from "./components/Layout";

const theme = createTheme({
  typography: {
    fontFamily: [
      "nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#565656",
          "--TextField-brandBorderHoverColor": "#565656",
          "--TextField-brandBorderFocusedColor": "#565656",
          "& label.Mui-focused": {
            color: "#565656",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "1px solid #565656",
          borderRadius: "10px",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "#565656",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "#565656",
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Layout />
      </Box>
    </ThemeProvider>
  );
};

export default App;
