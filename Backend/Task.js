import mongoose, { Schema } from "mongoose";


const TaskSchema1 = new Schema({
    name1: {
        type: String,
        required: true,
        trim: true
    }, task: {
        type: String,
        unique: true,
        required: true,


    }, secondtask: {
        type: String,
        unique: true,
        required: true,


    },
    date: {
        type: String,
        unique: true,
        required: true,


    },

    priority: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true })

const TaskModel1 = mongoose.model("usertask", TaskSchema1);
export default TaskModel1