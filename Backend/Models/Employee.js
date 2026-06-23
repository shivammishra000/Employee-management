import mongoose from 'mongoose';
import validator from 'validator';

let employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 4,
        maxlength: 50   
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: {
        type: String,
        required: true,
        maxlength: 12,
        match: /^[0-9]{10,12}$/
    },
    department: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Employee", employeeSchema);