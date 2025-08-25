import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          fontWeight={800}
          sx={{ color: "#0C969C", fontSize: { xs: "6rem", md: "8rem" } }}
        >
          404
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, color: "#555", fontWeight: 500 }}>
          Oops! The page you're looking for doesn't exist.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            mt: 2,
            py: 1.2,
            px: 4,
            borderRadius: "12px",
            fontSize: "16px",
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
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
