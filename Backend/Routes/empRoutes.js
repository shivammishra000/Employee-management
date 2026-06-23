import express from "express";
const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee,} from "../Controllers/empController.js";

router.get("/employee",authMiddleware, getEmployees);
router.get("/employee/:id", authMiddleware, getEmployeeById);
router.post("/employee/0",authMiddleware, createEmployee);
router.put("/employee/:id",authMiddleware, updateEmployee);
router.delete("/employee/:id",authMiddleware, deleteEmployee);

export default router;