import mongoose,{ Schema } from "mongoose";



const Leadschema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        sparse: true,
        
        required: true,
        
         
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    linkdin: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    }
   

}, { timestamps: true })

const LeadModel = mongoose.model("New Lead", Leadschema);

export default LeadModel

