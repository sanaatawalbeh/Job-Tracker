import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "rgba(250, 102, 102, 1)",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      await auth.signOut();
      navigate("/login");
    }
  };

  const navItems = [
    { label: "My Profile", path: "profile" },
    { label: "Create Application", path: "createapp" },
    { label: "Applications List", path: "applications" },
  ];

  // 🔹 Fetch applications once when dashboard loads
  useEffect(() => {
    const fetchApplications = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setApplications([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "applications"),
          where("uid", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const apps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(apps);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            bgcolor: "#3b82f6",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            p: 2,
          },
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 4, textAlign: "start" }}
        >
          JobTracker
        </Typography>

        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: "#fff",
                  width: "100%",
                })}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      borderRadius: "12px",
                      mx: 1,
                      mb: 1,
                      transition: "all 0.3s",
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.15)"
                        : "transparent",
                      "&:hover": {
                        transform: "scale(1.05)",
                        backgroundColor: "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            mt: "auto",
            borderRadius: "12px",
            py: 1.5,
            fontSize: "16px",
            fontWeight: 600,
            bgcolor: "#3b82f6",
            "&:hover": {
              bgcolor: "#2563eb",
              transform: "scale(1.05)",
            },
          }}
        >
          Logout
        </Button>
      </Drawer>

      {/* Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Outlet context={{ applications, setApplications, loading }} />
      </Box>
    </Box>
  );
}
