import { Box, Typography } from "@mui/material";
import SideHeader from "../components/SideHeader";
import DashboardTable from "../components/DashboardTable";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";

const AdminDashboard = () => {
  const [lockerCodes, setLockerCodes] = React.useState([]);
  const [reservedLockers, setReservedLockers] = React.useState([]);
  const [availableLockers, setAvailableLockers] = React.useState([]);
  const [pendingRequests, setPendingRequests] = React.useState([]);

  useEffect(() => {
    const subscription = supabase
      .channel("table_db_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        (payload) => {
          // Update your state or trigger a function to fetch updated data
          fetchUpdatedLockerStats();
          console.log("Change received: ", payload);
        }
      )
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getLockerCodes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/available_lockers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed to fetch lockers");
        }
        const lockers = await response.json();
        setLockerCodes(lockers.data);
      } catch (error) {
        console.error("Error fetching lockers: ", error);
      }
    };
    getLockerCodes();
  }, []);

  const fetchUpdatedLockerStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/available_lockers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("failed to fetch lockers");
      }
      const lockers = await response.json();
      setLockerCodes(lockers.data);
    } catch (error) {
      console.error("Error fetching lockers: ", error);
    }
  };

  const totalLockers = lockerCodes.length;
  useEffect(() => {
    const reserved = lockerCodes.filter(
      (locker) =>
        locker.reservations !== null &&
        locker.reservations.status === "Reserved"
    );
    const pending = lockerCodes.filter(
      (locker) =>
        locker.reservations !== null && locker.reservations.status === "Pending"
    );
    const available = lockerCodes.filter(
      (locker) => locker.reservations === null
    );

    setReservedLockers(reserved.length);
    setPendingRequests(pending.length);
    setAvailableLockers(available.length);
  }, [lockerCodes]);

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
            }}
          >
            Welcome !
          </Typography>
          <Box
            sx={{
              display: { xs: "grid", md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
              gridTemplateColumns: "auto auto",
              width: "100%",
            }}
          >
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, rgb(252, 175, 68) , rgb(102, 39, 62))",
                padding: "1em 2em",
                width: { xs: "90%", md: "24%" },
                borderRadius: "5px",
                margin: "1em 0",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600 }}
              >
                Total Lockers
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#0D0D0D", fontSize: "2.25rem", fontWeight: 600 }}
              >
                {totalLockers}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, rgb(247, 231, 170) , rgb(234, 166, 120))",
                padding: "1em 2em",
                width: { xs: "90%", md: "24%" },
                borderRadius: "5px",
                margin: "1em 0",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600 }}
              >
                Available Lockers
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#0D0D0D", fontSize: "2.25rem", fontWeight: 600 }}
              >
                {availableLockers}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, rgb(170, 217, 233) , rgb(154, 120, 160))",
                padding: "1em 2em",
                width: { xs: "90%", md: "24%" },
                borderRadius: "5px",
                margin: "1em 0",
              }}
            >
              <Link
                to="/reserved"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600 }}
                >
                  Reserved Lockers
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#0D0D0D",
                    fontSize: "2.25rem",
                    fontWeight: 600,
                  }}
                >
                  {reservedLockers}
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to right, rgb(217, 171, 93) , rgb(218, 106, 94))",
                padding: "1em 2em",
                width: { xs: "90%", md: "24%" },
                borderRadius: "5px",
                margin: "1em 0",
              }}
            >
              <Link
                to="/pending"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600 }}
                >
                  Pending Requests
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#0D0D0D",
                    fontSize: "2.25rem",
                    fontWeight: 600,
                  }}
                >
                  {pendingRequests}
                </Typography>
              </Link>
            </Box>
          </Box>
          <DashboardTable />
        </Box>
      </Box>
    </SideHeader>
  );
};

export default AdminDashboard;
