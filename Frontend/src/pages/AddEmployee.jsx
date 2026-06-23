import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";

function AddEmployee() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

   const validationSchema = Yup.object({
        name: Yup.string()
           .matches(/^[A-Za-z ]+$/, "Only letters and spaces are allowed")
           .min(2, "Name must be at least 2 characters")
           .max(50, "Name must be at most 50 character")
           .required("Name is required"),
   
        email: Yup.string()
         .email("Invalid email")
         .required("Email is required"),
   
        contactNo: Yup.string()
         .min(10, "Min 10 digits")
         .max(12, "Max 12 digits")
         .matches(/^[0-9]{10,12}$/, "Must contain only digits!")
         .required("Contact number is required"),

        department: Yup.string()
          .required("Department is required"),

        address: Yup.string()
          .required("Address is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");

      await api.post("/employee/0", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSeverity("success");
      setMessage("Employee Added Successfully");
      setOpen(true);

      setTimeout(() => navigate( "/home-page"), 1000);
    } 
    catch (error) {
      setSeverity("error");
      console.log(error)
      setMessage(
        error.response?.data?.message || "Failed to Add Employee"
      );
      setOpen(true);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>

      <Box sx={{ width: 400, p: 3, boxShadow: 3, textAlign: "center", fontFamily: "Arial" }}>

        <h2>Add Employee</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            contactNo: "",
            department: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>

              <Field as={TextField} name="name" label="Name" fullWidth margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <Field as={TextField} name="email" label="Email" fullWidth margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <Field as={TextField} name="contactNo" label="Contact" fullWidth margin="normal"
                error={touched.contactNo && !!errors.contactNo}
                helperText={touched.contactNo && errors.contactNo}
              />

              <Field as={TextField} name="department" label="Department" fullWidth margin="normal"
                error={touched.department && !!errors.department}
                helperText={touched.department && errors.department}
              />

              <Field as={TextField} name="address" label="Address" fullWidth margin="normal" 
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Save
              </Button>

              <Button fullWidth onClick={() => navigate("/home-page")} sx={{ mt: 1 }}>
                Cancel
              </Button>

            </Form>
          )}
        </Formik>

      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert 
          severity={severity}
          onClose={() => setOpen(false)}>{message}</Alert>
      </Snackbar>

    </Box>
  );
}

export default AddEmployee;

