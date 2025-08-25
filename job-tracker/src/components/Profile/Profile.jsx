import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Button,
} from "@mui/material";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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

  if (!user) return null;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "18px",
          textAlign: "center",
          width: 320,
        }}
      >
        <Avatar
          src={`https://ui-avatars.com/api/?name=${
            userData?.username || "User"
          }&background=3b82f6&color=fff&size=120`}
          alt="Profile Avatar"
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: "3px solid #3b82f6",
            mx: "auto",
          }}
        />

        <Typography variant="h5" fontWeight={600} color="#031716" gutterBottom>
          {userData?.username || "User"}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          {user.email}
        </Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              bgcolor: "#3b82f6",
              borderRadius: "18px",
              px: 3,
              py: 1,
              fontSize: "16px",
              fontWeight: 600,
              transition: "all 0.3s",
              "&:hover": {
                bgcolor: "#2563eb",
                transform: "scale(1.05)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
