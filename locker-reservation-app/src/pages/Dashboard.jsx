import { Box, Typography } from "@mui/material";
import SideHeader from "../components/SideHeader";
import DashboardTable from "../components/DashboardTable";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <SideHeader>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "98%" }}>
          <Typography
            variant="h4"
            sx={{
              color: "#002347",
              fontSize: "1.75rem",
              fontWeight: 700,
              margin: "1em 0",
              textTransform: "capitalize",
            }}
          >
            Hello {user.fullname.split(" ")[0]}
          </Typography>
          <DashboardTable />
        </Box>
      </Box>
    </SideHeader>
  );
};

export default Dashboard;
