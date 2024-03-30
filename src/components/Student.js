import { Divider } from "primereact/divider";
import React from "react";
import Image from "next/image";
import Base64Image from "./Base64Img";

const Student = ({ studentData }) => {
  // console.log("img",studentData?.photo);
  return (
    <div className="bg-white px-10 py-5 rounded-2xl mb-24">
      <h2 className="text-3xl font-extrabold text-center">Student Detail</h2>
      <Divider />
      <div className="w-full flex flex-col  md:flex-row justify-center  font-medium ">
        <div className="flex justify-center items-center">
          <div>
            <div className="flex justify-center">
              <Base64Image base64String={studentData?.photo} />
            </div>
            <div className="my-2 text-pretty font-bold text-xl">
              <h2 className="text-center ">{studentData?.name} </h2>
              <h2 className="text-center">{studentData?.roll}</h2>
            </div>
          </div>
          <Divider layout="vertical" className="mx-10 hidden md:flex"   />
        </div>
        
        <div className="flex flex-col gap-2 md:gap-3 text-left mx-10  justify-center text-lg mt-4 md:mt-0">
          <h2 >Phone: {studentData?.phoneNumber}</h2>
          <h2>Email: <a href="https://mail.google.com/"  target="_blank" className="hover:underline text-blue-500">
          <span className="text-nowrap text-sm "> 
         
         {studentData.email}</span>
            </a>   </h2>
          <h2 >Hostel Name:{studentData?.hostelName}</h2>
          <h2 >Category: {studentData?.category}</h2>
          <h2 >Address:{studentData?.address}</h2>
          <h2 >JEE Rank:{studentData?.rank}</h2>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 text-left mx-10 justify-center text-lg mt-2 md:mt-0">
          <h2 >CGPA: {studentData?.cgpa}</h2>
          <h2>Degree: {studentData.degree}  </h2>
          <h2 >DOB:{studentData?.dob}</h2>
          <h2 >Room Number:{studentData?.roomNumber}</h2>
          <h2>Blood Group:{studentData?.bloodGroup}</h2>
          <h2> JEE Score:{studentData?.score}</h2>
        </div>
       
      </div>
    </div>
  );
};

export default Student;
