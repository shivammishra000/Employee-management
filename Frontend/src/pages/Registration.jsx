import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography
} from "@mui/material";

function Registration() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

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

    password: Yup.string()
      .min(6, "Min 6 characters")
      .matches(/[A-Z]/, "Must contain uppercase")
      .matches(/[0-9]/, "Must contain number")
      .required("Password required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password required"),
  });

  const handleRegister = async (values, { resetForm }) => {
    try {
      await api.post("/user/register", values);

      setSeverity("success");
      setMessage("Registration successful");
      setOpen(true);

      resetForm();

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.log(err)
      setSeverity("error");
      setMessage("Registration failed");
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <Box
        sx={{
          width: 350,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" mb={2}>
          Sign up
        </Typography>

        <Formik
          initialValues={{
            name: "",
            email: "",
            contactNo: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form>

              <Field
                as={TextField}
                name="name"
                label="Name"
                required
                fullWidth
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <Field
                as={TextField}
                name="email"
                label="Email"
                required
                fullWidth
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                name="contactNo"
                label="Contact No"
                required
                fullWidth
                margin="normal"
                error={touched.contactNo && !!errors.contactNo}
                helperText={touched.contactNo && errors.contactNo}
              />

              <Field
                as={TextField}
                name="password"
                type="password"
                required
                label="Password"
                fullWidth
                margin="normal"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Field
                as={TextField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                required
                fullWidth
                margin="normal"
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign up
              </Button>

              <Button
                fullWidth
                onClick={() => navigate("/")}
                sx={{ mt: 1 }}
              >
                Back to Login
              </Button>

            </Form>
          )}
        </Formik>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Registration;