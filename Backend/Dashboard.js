import mongoose, { Schema } from "mongoose";


const TaskSchema = new Schema({
    name1: {
        type: String,
        required: true,
        trim: true
    },date: {
        type: String,
        unique: true,
        required: true,
        
         
    },
   
    priority: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    }
   
}, { timestamps: true })

const TaskModel = mongoose.model("dashboard", TaskSchema);
export default TaskModel