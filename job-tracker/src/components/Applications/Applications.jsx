// src/components/User/ApplicationsTable.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
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
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      // Fetch from Firestore only if Redux state is empty
      if (applications.length === 0) {
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
          dispatch(setApplications(apps));
        } catch (error) {
          console.error(error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, applications.length]);

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
      dispatch(setApplications(applications.filter((app) => app.id !== id)));
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
    <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
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
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
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
