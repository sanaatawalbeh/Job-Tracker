import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        mb: 8,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          minHeight: "40vh",
          py: 3,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            fontSize: { xs: "28px", md: "56px" },
            color: "text.primary",
          }}
        >
          Find your{" "}
          <Box
            component="span"
            sx={{
              display: "inline-block",
              px: 1.5,
              borderRadius: "0.5em",
              bgcolor: "primary.main",
              color: "#fff",
              boxShadow: "0 6px 20px rgba(59,130,246,0.25)",
            }}
          >
            dream jobs
          </Box>{" "}
          <br />
          in{" "}
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              fontWeight: 900,
            }}
          >
            New Castle
          </Box>
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          component={RouterLink}
          to="/register"
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: "25px",
            fontWeight: 600,
            fontSize: "18px",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Register
        </Button>

        <Button
          component={RouterLink}
          to="/login"
          variant="outlined"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: "25px",
            fontWeight: 600,
            fontSize: "18px",
            transition: "0.3s",
            "&:hover": {
              bgcolor: "primary.main",
              color: "#fff",
              transform: "scale(1.05)",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
