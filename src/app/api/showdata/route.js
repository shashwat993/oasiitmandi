import connectDB from "@/lib/connectDB";
import Student from "@/models/Student";
import { NextResponse } from 'next/server';


export async function GET(){
    try {
        await connectDB();
        const student = await Student.find();
        // console.log(student);
        return NextResponse.json(student)
    } catch (error) {
        console.log(error);
        return NextResponse.json({'msg':'Error in Fetching data from server!!'},{status:500})

        
    }

}