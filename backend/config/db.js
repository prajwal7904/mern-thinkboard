import mongoose  from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB run sucessfully");
        
    } catch (error) {
        console.log("Failed to connect mongoDb",error);
        process.exit(1);
        
        
    }
}