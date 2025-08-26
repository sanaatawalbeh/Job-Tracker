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
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPath = window.location.hash.replace("#", "");

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

  const navItems = [
    {
      label: "All Applications",
      path: "/admindashboard/admin",
      icon: <ListAltIcon />,
    },
  ];

  const drawerWidth = { xs: 280, sm: 300 }; // 🔹 عرض مختلف حسب الشاشة

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        bgcolor: "#3b82f6",
        color: "#fff",
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, px: 1 }}>
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

      {/* Nav Links */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <NavLink
              to={item.path}
              style={{ textDecoration: "none", color: "#fff", width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemButton
                sx={{
                  borderRadius: "12px",
                  mx: 1,
                  mb: 1,
                  transition: "all 0.3s",
                  backgroundColor:
                    currentPath === item.path
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>

      {/* Logout */}
      <Button
        variant="contained"
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        sx={{
          mt: "auto",
          borderRadius: "12px",
          py: 1.5,
          px: 3,
          fontSize: "16px",
          fontWeight: 600,
          bgcolor: "#3b82f6",
          alignSelf: "flex-start", // 👈 يزبطه عاليسار
          ml: 2, // 👈 مسافة من الطرف
          "&:hover": {
            bgcolor: "#2563eb",
            transform: "scale(1.05)",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* AppBar للموبايل فقط */}
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#3b82f6", display: { xs: "block", sm: "none" } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer للموبايل */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth.xs,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer ثابت للشاشات الكبيرة */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth.sm,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: { xs: 7, sm: 0 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
