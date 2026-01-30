import mongoose, { Schema } from "mongoose";



const Leadschema = new Schema({
    fullname: {
        type: String,

        trim: true
    }, email: {
        type: String,
        sparse: true,




    },
    number: {
        type: String,

        trim: true
    },
    assignee: {
        type: String,

        trim: true
    }, status: {
        type: String,
        enum: ["NEW", "CONTACTED", "INTERESTED", "CLOSED", "LOST"],
        default: "NEW"

    }


}, { timestamps: true })

const LeadModel = mongoose.model("New Lead", Leadschema);

export default LeadModel

