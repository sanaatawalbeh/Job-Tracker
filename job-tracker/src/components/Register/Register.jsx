import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const firebaseErrorMessages = {
    "auth/email-already-in-use": "This email is already registered",
    "auth/invalid-email": "Please enter a valid email address",
    "auth/weak-password": "Password must be at least 6 characters",
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password",
    "auth/too-many-requests": "Too many attempts. Try again later",
    "auth/user-disabled": "This account has been disabled",
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ تحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match",
        confirmButtonColor: "#0C969C",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      Swal.fire({
        title: "Registration successful",
        icon: "success",
        confirmButtonColor: "#0C969C",
      }).then(() => {
        navigate("/dashboard/profile");
      });
    } catch (error) {
      const message = firebaseErrorMessages[error.code] || error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        confirmButtonColor: "#0C969C",
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        mt: 8,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "18px",
          width: "380px",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 1 }}>
          Create Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: 600,
              bgcolor: "#3b82f6",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#2563eb",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
              },
            }}
          >
            Register
          </Button>
        </Box>

        <Typography align="center" variant="body2" sx={{ mt: 1 }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{
              color: "#0C969C",
              fontWeight: 600,
              "&:hover": { color: "#079292" },
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
