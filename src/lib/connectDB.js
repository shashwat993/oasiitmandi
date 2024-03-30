import mongoose from "mongoose";
const uri = process.env.MONGODB_URL

export default async () =>{
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.log(error);
    }
}