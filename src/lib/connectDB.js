import mongoose from "mongoose";
const uri = "mongodb+srv://jisas:Jisas%40123@cluster0.w2tqe99.mongodb.net/pixelSparx?retryWrites=true&w=majority"

export default async () =>{
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.log(error);
    }
}
