import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SideHeader from "../components/SideHeader";
import { ArrowBackIos } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../supabaseClient";

const ReservedLockers = () => {
  const [openModal, setOpenModal] = React.useState(false); // State for managing modal visibility
  const [lockerCodes, setLockerCodes] = React.useState([]);
  const [selectedLockerId, setSelectedLockerId] = React.useState(null);

  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  const user_id = user.id;

  useEffect(() => {
    const subscription = supabase
      .channel("table_db_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        (payload) => {
          // Update your state or trigger a function to fetch updated data
          fetchUpdatedLockers();
          console.log("Change received: ", payload);
        }
      )
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleReservation = async (lockerCode, id) => {
    setSelectedLockerId(id); // Set the selected locker ID
    console.log(selectedLockerId);
    deleteReservaion(lockerCode);
    setOpenModal(true); // Open the modal
    console.log(
      `Reserving locker with the locker code: ${lockerCode} with the id: ${id}`
    );
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    const getLockerCodes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/reservations`,
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

  const deleteReservaion = async (lockerId) => {
    try {
      const reservationData = {
        user_id: user_id,
        locker_id: lockerId,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/reservations/${user_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete column");
      }
    } catch (error) {
      console.error("Error deleting column:", error);
      // Handle any errors, such as displaying an error message to the user
    }
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getSearchedItems = () => {
    const filteredItems = lockerCodes.filter((item) =>
      item.reservation_id
        .toString()
        .padStart(3, "0")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    const rearrangedItems = filteredItems.sort(
      (a, b) =>
        a.reservation_id
          .toString()
          .padStart(3, "0")
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) -
        b.reservation_id
          .toString()
          .padStart(3, "0")
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase())
    );
    return rearrangedItems;
  };

  // const handleClose = () => {
  //   setOpenModal(false); // Close the modal only when the source is the button
  // };

  const fetchUpdatedLockers = async () => {
    try {
      const updatedResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/reservations`,
        {
          method: "GET",
        }
      );

      // Check if fetching updated lockers was successful
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated lockers");
      }

      // Update state with updated locker codes
      const updatedLockers = await updatedResponse.json();
      setLockerCodes(updatedLockers.data);
      setOpenModal(false);
    } catch (error) {
      console.error("Error fetching updated lockers", error);
    }
  };

  return (
    <SideHeader>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: { sm: "13px", md: "16px" },
        }}
      >
        <Box sx={{ width: "98%" }}>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              sx={{
                color: "#002347",
                fontSize: "1.75rem",
                fontWeight: 700,
                margin: "1em 0",
                marginRight: "3em",
              }}
            >
              Reserved Lockers
            </Typography>
            <Autocomplete
              sx={{ borderRadius: "50px", width: "50%" }}
              freeSolo
              disableClearable
              options={lockerCodes.map((item) => item.locker_id.toString())}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a locker"
                  onChange={handleSearchChange}
                  InputProps={{
                    type: "search",
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer
              sx={{
                backgroundColor: "#E9E9E9",
                width: { sm: "90%", md: "80%" },
                borderRadius: "15px",
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    width: "100%",
                  }}
                >
                  <TableRow>
                    <TableCell
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Locker Code
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Reservation ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    width: "100%",
                  }}
                >
                  {getSearchedItems()
                    .filter((item) => item.status === "Reserved")
                    .map((item) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={item.id}
                      >
                        <TableCell
                          sx={{
                            fontSize: "1.25rem",
                            fontWeight: 400,
                            textAlign: "center",
                          }}
                        >
                          {item.locker_id.toString().padStart(3, "0")}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            color: "#041526",
                            textAlign: "center",
                          }}
                        >
                          {item.reservation_id}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "1.25rem",
                            fontWeight: 400,
                            textAlign: "center",
                          }}
                        >
                          <Button
                            onClick={() =>
                              handleReservation(
                                item.locker_id.toString(),
                                item.id
                              )
                            }
                            sx={{
                              backgroundColor:
                                location.pathname === "/pending"
                                  ? "#0D5B00"
                                  : "#DD0000",
                              color: "#FFFFFF",
                              fontSize: "1.29206rem",
                              fontWeight: 600,
                              textTransform: "none",
                              padding: ".2em 1em",
                              borderRadius: "17px",
                              "&:hover": {
                                backgroundColor:
                                  location.pathname === "/pending"
                                    ? "#0D5B00"
                                    : "#DD0000",
                              },
                            }}
                            disableRipple
                          >
                            {location.pathname === "/pending"
                              ? "Confirm"
                              : "Checkout"}
                          </Button>
                          <Modal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 700,
                                bgcolor: "#040E18",
                                boxShadow: 24,
                                p: 4,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                borderRadius: "50px",
                              }}
                            >
                              <Typography
                                variant="h4"
                                sx={{
                                  color: "#fff",
                                  fontSize: {
                                    xs: "1.2rem",
                                    sm: "1.5rem",
                                    md: "2rem",
                                  },
                                  fontWeight: 500,
                                  padding: "3em",
                                }}
                              >
                                Checkout successful
                              </Typography>

                              {/* <Button
                                onClick={() => handleClose()}
                                sx={{
                                  color: "#040E18",
                                  backgroundColor: "#fff",
                                  fontSize: "1.19906rem",
                                  fontWeight: 600,
                                  textTransform: "none",
                                  padding: ".3em 6em",
                                  borderRadius: "10px",
                                  marginTop: "2em",
                                  "&:hover": { backgroundColor: "#fff" },
                                }}
                                disableRipple
                              >
                                Continue
                              </Button> */}
                            </Box>
                          </Modal>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </SideHeader>
  );
};

export default ReservedLockers;
