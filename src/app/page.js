'use client'
import Image from "next/image";
import { Button } from 'primereact/button';
import axios from 'axios'
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import StudentCard from "@/components/Card";
import { useState, useEffect, useContext } from "react";
import SkeletonComp from "@/components/Skeleton";
import { useStudentContext } from "@/context/studentContext";



const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {

  const {isLoading, students} = useStudentContext();
  

  return (

    <div className="absolute w-full">
     <NavBar />
     
     <SideBar NumberOfStudent={students?.length}  />
     {isLoading ? ( 
          <div className="container mx-auto px-5 mt-5">
            <SkeletonComp />
            <br/>
            <SkeletonComp />
            <br/>
            <SkeletonComp />
            <br/>
            <SkeletonComp />
            <br/>
            <SkeletonComp />
            <br/>
            <SkeletonComp />
            <br/>
            
           
          </div>
      ) : (
        students.map((studentData,i)=>(
          
          students && <StudentCard studentData={studentData} key={i} />
        ))
      )}
    </div>
  );
}
