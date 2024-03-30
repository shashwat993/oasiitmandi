// pages/api/getDetails.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import Student from '@/models/Student';
import connectDB from '@/lib/connectDB';

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'damttv6mm', 
  api_key: '241167299639618', 
  api_secret: 'Trnyr9VmbM_P1LnzOdWizwXoxKk' 
});

export async function POST(req, res) {
    const body = await req.json();

    
    try {
         await connectDB()
         const {name,roll,cgpa,address,email,roomNumber,dob,degree,phoneNumber,hostelName,category,bloodGroup,photo,score,rank} = body;
         if(!name || !cgpa || !roll || !email || !address || !roomNumber || !dob || !degree || !phoneNumber || !hostelName || !category || !bloodGroup || !photo || !score || !rank){
            return NextResponse.json({'msg':"Some data not available!!"},{status:201})
         }

 

         

         const user = await Student.findOne({roll})
         if(user){
            return NextResponse.json({'msg':"Roll Number Already Exist already!"},{status:209})
         }
        

         cloudinary.uploader.upload(`data:image/jpeg;base64,${photo}`,
         { folder: 'uploads' , public_id: `${roll}_image` },
           async function(error,result){
             if(error){
                console.log(error);
             }
             console.log(result.secure_url);
             const data ={
               roll:roll, name:name, cgpa:cgpa, address:address, email:email, roomNumber:roomNumber, dob:dob, degree:degree, phoneNumber:phoneNumber, category:category, bloodGroup:bloodGroup,photo:result.secure_url, score:score, rank:rank,hostelName:hostelName
   
            }
            const submittedData = await Student.create(data);
          }
          );

         return NextResponse.json({'msg':'Data Posted Successfilly!!'},{status:200})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({'msg':'Server Error'}, {status:500})
        
    }
}
