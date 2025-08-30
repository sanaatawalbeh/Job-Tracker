// src/components/User/ApplicationsTable.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
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
  FormControl,
  InputLabel,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setApplications } from "../../redux/applicationsSlice";

export default function ApplicationsTable() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.list);

  useEffect(() => {
    let unsubscribeSnapshot = () => {};

    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(currentUser);

      // Realtime listener
      const q = query(
        collection(db, "applications"),
        where("uid", "==", currentUser.uid)
      );

      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const apps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setApplications(apps));
        setLoading(false);
      });
    });

    // Clean up both listeners on unmount
    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, [dispatch]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const docRef = doc(db, "applications", id);
      await updateDoc(docRef, { status: newStatus });
      dispatch(
        setApplications(
          applications.map((app) =>
            app.id === id ? { ...app, status: newStatus } : app
          )
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "applications", id);
      await deleteDoc(docRef);
      dispatch(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Filter applications
  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  if (loading) return <Typography>Loading applications...</Typography>;
  if (!user)
    return <Typography>Please log in to see your applications.</Typography>;

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        p: 2,
        ml: { xs: 0, sm: 36.2 }, // margin-left لتباعد عن Sidebar
        overflowX: "auto",
      }}
    >
      {/* Header + Filter */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Your Applications</Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filter}
            label="Status Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="interview">Interview</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#3b82f6" }}>
            {" "}
            {/* لون الصف الأزرق */}
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
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredApplications.map((app) => (
            <TableRow key={app.id}>
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
