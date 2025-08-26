import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
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
import Avatar from "@mui/material/Avatar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // 🔥 state لليوزر

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // بترجع الإيميل/الديسبلاي نيم
    });

    return () => unsubscribe();
  }, []);

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

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 380,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
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
          Admin Panel
        </Typography>

        {/* Admin Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
            px: 1,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#e5e7eb",
              color: "#374151",
              width: 48,
              height: 48,
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {user?.displayName
              ? user.displayName.slice(0, 2).toUpperCase()
              : user?.email?.slice(0, 2).toUpperCase()}
          </Avatar>

          <Typography fontWeight={600} fontSize="16px">
            {user?.displayName || user?.email}
          </Typography>
        </Box>

        <List sx={{ flexGrow: 1 }}>
          <ListItem disablePadding>
            <NavLink
              to="/admindashboard/admin"
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
                    primary="All Applications"
                    primaryTypographyProps={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
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

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
