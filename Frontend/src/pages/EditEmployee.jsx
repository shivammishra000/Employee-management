import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await api.get(`/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInitialValues(res.data.data);
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(`/employee/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        navigate("/home-page");
      }, 1000);
    } 
    catch (err) {
      console.log(err.response?.data || err.message);
    }
  };
  if (!initialValues) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>

      <Box sx={{ width: 400, p: 3, boxShadow: 3, textAlign: "center", fontFamily: "Arial" }}>

        <h2>Edit Employee</h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleUpdate}
        >
          {() => (
            <Form>

              <Field as={TextField} name="name" label="name" required  fullWidth margin="normal" />
              <Field as={TextField} name="email" label="email" required  fullWidth margin="normal" />
              <Field as={TextField} name="contactNo" label="contact.no" required  fullWidth margin="normal" />
              <Field as={TextField} name="department" label="department" required  fullWidth margin="normal" />
              <Field as={TextField} name="address" label="address" required  fullWidth margin="normal" />

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Update
              </Button>

              <Button fullWidth onClick={() => navigate("/home-page")} sx={{ mt: 1 }}>
                Cancel
              </Button>

            </Form>
          )}
        </Formik>

      </Box>

    </Box>
  );
}

export default EditEmployee;