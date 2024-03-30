import React from "react";
import { Fieldset } from "primereact/fieldset";
import Image from "next/image";


const truncate = (name) => {
    if (!name || name.length <= 14) {
        return name; 
    } else {
        return name.substring(0, 14) + '...'; 
    }
};

export default function StudentCard({ studentData,i }) {

 
  return (
    <div className="container mx-auto mt-10 px-5">
      <div className="card">
        <Fieldset legend={studentData?.roll}>
          <div className=" md:flex justify-around ">
            <div className="flex flex-col justify-center items-center">
              <Image
                src={studentData?.photo}
                alt={studentData?.roll}
                width={150}
                height={150}
                className="rounded-full border-4 border-pink-500"
                style={{ objectFit: "cover", aspectRatio: "1 / 1" }}
                priority={true}
              />

              <h2 className="text-center font-bold text-2xl mt-3 text-black">
                {truncate(studentData?.name)}
              </h2>
            </div>
            <div className=" hidden md:flex flex-col justify-center gap-3">
              <p> Roll: {studentData?.roll}</p>
              <p> Phone: {studentData?.phoneNumber} </p>
              <p> Hostel Name: {studentData?.hostelName} </p>
              <p> Category: {studentData?.category} </p>
            </div>
            <div className=" hidden md:flex flex-col justify-center gap-3 mt-3 md:mt-0">
              <p>CGPA:{studentData?.cgpa} </p>            
              <p>JEE Rank: {studentData?.rank} </p>
              <p> JEE Score: {studentData?.score} </p>
              <p>Degree:{studentData?.degree} </p>
              
            </div>
            <div className="hidden md:flex flex-col justify-center gap-3 mt-3 md:mt-0">
              <p> DOB:{studentData?.dob} </p>
              <p> Room No:{studentData?.roomNumber} </p>
              <p> Blood Group: {studentData?.bloodGroup} </p>
              <p> Address: {studentData?.address} </p>
            </div>

            <div className=" flex justify-around md:hidden mt-3 text-md">
              <div className="flex flex-col gap-2">
                <p> Roll: {studentData?.roll} </p>
                <p> Phone: {studentData?.phoneNumber} </p>
                <p> Hostel: {studentData?.hostelName} </p>
                <p> Category: {studentData?.category} </p>
                <p> Address: {studentData?.address} </p>
                <p>JEE Rank: {studentData?.rank} </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>CGPA:{studentData?.cgpa} </p>
                <p>Degree:{studentData?.degree} </p>
                <p> DOB:{studentData?.dob} </p>
                <p> Room No:{studentData?.roomNumber} </p>
                <p> Blood Group: {studentData?.bloodGroup} </p>
                <p> JEE Score: {studentData?.score} </p>
              </div>
            </div>
          </div>
        </Fieldset>
      </div>
    </div>
  );
}
