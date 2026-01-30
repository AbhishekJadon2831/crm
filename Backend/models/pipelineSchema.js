import mongoose, { Schema } from "mongoose";



const PipelineSchema = new Schema({
       name: {
        type: String,
        required: true,
        trim: true
    }, value: {
        type: String,
        unique: true,
        required: true,
        unique: true
         
    },
    stage: {
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



const PipelineModel = mongoose.model("new Pipeline", PipelineSchema);
export default PipelineModel