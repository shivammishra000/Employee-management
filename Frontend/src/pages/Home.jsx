import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import { DataGrid } from "@mui/x-data-grid";
import { 
  Button, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Snackbar, 
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions, 
} 
from "@mui/material";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {

      const token = localStorage.getItem("token");

      await api.delete(`/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Employee deleted successfully");
      setOpen(true);

      fetchEmployees();

    } catch (err) {
      console.log(err);
    }
  };

  const rows = employees.map((emp) => ({
    id: emp._id,
    name: emp.name,
    email: emp.email,
    contactNo: emp.contactNo,
    department: emp.department,
    address: emp.address,
  }));

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNo", headerName: "Contact", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate(`/edit-employee/${params.row.id}`)}
            sx={{ mr: 1, alignSelf: "flex-start" }}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() =>{
              setSelectedId(params.row.id)
              setDeleteOpen(true)}}
            >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
    sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flex: 1 }} />

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ flex: 1, textAlign: "center" }}
        >
          Employee Management
        </Typography>

        <Box sx={{ flex: 1, textAlign: "right" }}>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

    <Box
      sx={{
        p: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate("/add-employee")}
        sx={{ mb: 2, alignSelf: "flex-start" }}
      >
        Add Employee
      </Button>

      <Box sx={{ flex: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          sx={{
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
    </Box>
    
    <Dialog
      open={deleteOpen}
      onClose={() => setDeleteOpen(false)}
    >
    <DialogTitle>Delete Employee</DialogTitle>

    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this employee?
    </DialogContentText>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setDeleteOpen(false)}>
      Cancel
    </Button>

    <Button
      color="error"
      onClick={() => {
        deleteEmployee(selectedId);
        setDeleteOpen(false);
      }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="success">
        {message}
      </Alert>
    </Snackbar>
  </Box>
  );
}

export default Home;