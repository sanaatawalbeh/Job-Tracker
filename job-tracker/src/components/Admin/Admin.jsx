import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Select,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const appsSnapshot = await getDocs(collection(db, "applications"));
        const appsData = appsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersMap = {};
        usersSnapshot.docs.forEach((doc) => {
          usersMap[doc.id] = doc.data().email;
        });

        const appsWithEmail = appsData.map((app) => ({
          ...app,
          email: usersMap[app.uid] || "No email",
        }));

        setApplications(appsWithEmail);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const docRef = doc(db, "applications", id);
      await updateDoc(docRef, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "applications", id);
      await deleteDoc(docRef);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Typography>Loading applications...</Typography>;

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        p: 2,
        ml: { xs: 0, sm: 36.2 }, // مارجن من اليسار للابتعاد عن Sidebar
        overflowX: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        All Applications
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#3b82f6" }}>
            {" "}
            {/* لون الخلفية أزرق */}
            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
              Company
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
              Position
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
              Status
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
              User Email
            </TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} hover>
              {" "}
              {/* hover يضيف تأثير عند المرور */}
              <TableCell>{app.company}</TableCell>
              <TableCell>{app.position}</TableCell>
              <TableCell>
                <Select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  size="small"
                >
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="interview">Interview</MenuItem>
                  <MenuItem value="accepted">Accepted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
