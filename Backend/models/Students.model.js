import mongoose, { Schema } from "mongoose";


const StudentsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, lastname: {
        type: String,
        required: true,
        trim: true
    },
    workEmail: {
        type: String,
        unique: true,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmpassword: {
        type: String,
        required: true,
        trim: true
    }, profileImage:
    {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },role :{
        type: String,
        default: 'user'
    }

}, { timestamps: true })

const StudentsModel = mongoose.model("new information", StudentsSchema);
export default StudentsModel