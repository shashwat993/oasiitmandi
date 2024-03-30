// pages/api/getDetails.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req, res) {
    
  try {
    const body = await req.json();
    const response = await axios.post('https://oas.iitmandi.ac.in/student/Services/StdService.asmx/GetDetails',body);
    return NextResponse.json({'data':response.data },{status:202})
  } catch (error) {
    console.log(error);
    return NextResponse.json({'msg':'Internal Server Error' },{status:500})
  }
}
