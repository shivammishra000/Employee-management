import mongoose from 'mongoose';
import validator from 'validator';

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 50   
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    contactNo: {
        type: String,
        required: true,
        maxlength: 12,
        match: /^[0-9]{10,12}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
})

export default mongoose.model("User", userSchema);