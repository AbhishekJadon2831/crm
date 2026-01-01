import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_DB);
        console.log("connected successfully", conn.connection.host);
        
    }catch (error){
        console.log("mongo db connection error", error.message);
        
    }

}

export default connectDB;
