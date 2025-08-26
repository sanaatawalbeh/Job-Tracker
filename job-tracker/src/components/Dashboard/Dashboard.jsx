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
  IconButton,
  AppBar,
  Toolbar,
  ListItemIcon,
} from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPath = window.location.hash.replace("#", "");


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    { label: "My Profile", path: "profile", icon: <PersonIcon /> },
    { label: "Create Application", path: "createapp", icon: <AddCircleIcon /> },
    { label: "Applications List", path: "applications", icon: <ListAltIcon /> },
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

  // 🔹 محتوى الدروار
  const drawerContent = (
    <Box
      sx={{
        width: 350,
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
        JobTracker
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <NavLink
              to={item.path}
              style={{
                textDecoration: "none",
                color: "#fff",
                width: "100%",
              }}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemButton
                sx={{
                  borderRadius: "12px",
                  mx: 1,
                  mb: 1,
                  transition: "all 0.3s",
                  backgroundColor:
                    currentPath === `/dashboard/${item.path}`
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
      {/* 🔹 AppBar يظهر فقط على الشاشات الصغيرة */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#3b82f6",
          display: { xs: "block", sm: "none" },
        }}
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
            JobTracker Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🔹 Drawer للموبايل */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 🔹 Drawer ثابت للشاشات الكبيرة */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 325 },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* 🔹 محتوى الصفحة */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: { xs: 7, sm: 0 },
        }}
      >
        <Outlet context={{ applications, setApplications, loading }} />
      </Box>
    </Box>
  );
}
