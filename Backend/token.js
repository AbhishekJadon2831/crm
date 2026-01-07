

import jwt from "jsonwebtoken"

const getaccess=async()=>{
    try{
        const conn= await jwt.sign(process.env. ACCESS_SECRPT_KEY);
         return conn
        
    }catch (error){
        console.log("mongo db connection error", error.message);
        
    }

}

export default getaccess;