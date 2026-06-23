import bcrypt from "bcrypt";
import Users from "../Models/User.js";
import jwt from "jsonwebtoken";                                                                                        

export const register = async (req, res) => {
  try {
        const { name, email, contactNo, password, confirmPassword } = req.body;

        if(!name || !email || !contactNo, !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required"
            })
        }

        const existingUser = await Users.findOne({ email });

        if (existingUser) {
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

        const passwordFormat = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$/;

        if (!passwordFormat.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain uppercase, number and special character"
            });
        }

        if (contactNo.length < 10 || contactNo.length > 12) {
            return res.status(400).json({
                success: false,
                message: "Contact number must be 10 to 12 digits"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            name,
            email,
            contactNo,
            password: hashedPassword, 
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User registered successfully",    
            data: newUser,  
        });
    } 
    catch (err) {
            res.status(500).json({
            success: false,
            message: err.message,   
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400).json({
                success: false,
                message: "email and password are required!"
            })
        }

        const verifyUser = await Users.findOne({ email });

        if (!verifyUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",  
            });
        }

        const isMatch = await bcrypt.compare(password, verifyUser.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            }); 
        }

        const token = jwt.sign(
            {
                id: verifyUser._id,
                email: verifyUser.email,
            },
                process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({  
            success: true,
            message: "Login successfull",
            token: token,
            user: verifyUser
        });
    } 
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};