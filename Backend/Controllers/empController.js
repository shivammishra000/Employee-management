import Employee from "../Models/Employee.js";
import bcrypt from "bcrypt";

export const getEmployees = async (req, res) => {
  try {

    const employees = await Employee.find({IsDeleted: false,});

    res.status(200).json({
      success: true,
      data: employees,
    });
  } 
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, contactNo, department, address, } = req.body;

    if(!name || !email || !contactNo || !department || !address) {                                                                               
        return res.status(400).json({
            success: false,
            message: "All fileds are required"
        })
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailFormat.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    if (contactNo.length < 10 || contactNo.length > 12) {
        return res.status(400).json({
            success: false,
            message: "Contact number must be 10 to 12 digits"
        });
    }

    const newEmployee = new Employee({ name, email, contactNo, department, address });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      data: newEmployee,
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, contactNo, password, department, address } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, contactNo, password, department, address, }, {  new: true, });

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedEmployee,
    });
  } 
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id, {IsDeleted: true});

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedEmployee,
    });
  } 
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if(!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  }
  catch(err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}