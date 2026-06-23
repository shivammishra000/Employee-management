import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await api.post("/user/login", values);

      localStorage.setItem("token", response.data.token);

      setMessage("Login Successful");
      setSeverity("success");
      setOpen(true);

      setTimeout(() => {
        navigate("/home-page");
      }, 1000);

    } catch (error) {
      console.log(error);

      setMessage("Login Failed");
      setSeverity("error");
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
        <h2>Login</h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>

              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                  fontFamily: "Arial",
                }}
              >
                <Typography variant="body5">
                  Don't have an account?
                </Typography>

                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate("/register")}
                  x={{ ml: 1, minWidth: "auto", p: 0 }}
                >
                  Sign up
                </Button>
                </Box>

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

export default Login;