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
    }

}, { timestamps: true })

const StudentsModel = mongoose.model("new information", StudentsSchema);
export default StudentsModel