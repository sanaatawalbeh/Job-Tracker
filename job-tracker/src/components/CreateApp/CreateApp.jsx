import { useState } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";

export default function CreateApp() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        Swal.fire("Oops!", "You must be logged in!", "error");
        return;
      }

      await addDoc(collection(db, "applications"), {
        uid: user.uid,
        company,
        position,
        status,
        createdAt: serverTimestamp(),
      });

      Swal.fire({
        title: "Application Added ",
        icon: "success",
        confirmButtonColor: "#0C969C",
      });

      setCompany("");
      setPosition("");
      setStatus("applied");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
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
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "15px",
          width: "100%",
          maxWidth: 500,
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          sx={{ mb: 3, color: "#0c969c" }}
        >
          Add Job Application
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <TextField
            label="Position / Job Title"
            variant="outlined"
            fullWidth
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          >
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="interview">Interview</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: 600,
              bgcolor: "#3b82f6",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#2563eb",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
              },
            }}
          >
            Save Application
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
