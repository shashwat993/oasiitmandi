"use client";
import React, { useEffect, useRef, useState } from "react";
import { InputText } from "@/components/inputtext";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import axios from "axios";
import xml2js from 'xml2js';
import Student from "@/components/Student";
import NavBar from "@/components/NavBar";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



function convertBase64ToJPEG(base64String) {
  // Remove the data url part
  const base64Image = base64String.split(';base64,').pop();

  // Decode base64
  const binaryImg = atob(base64Image);
  const length = binaryImg.length;
  const binaryImgArray = new Uint8Array(length);

  // Convert binary to Uint8Array
  for (let i = 0; i < length; i++) {
      binaryImgArray[i] = binaryImg.charCodeAt(i);
  }

  // Create Blob
  const blob = new Blob([binaryImgArray], { type: 'image/jpeg' });

  // Create Object URL
  const imageURL = URL.createObjectURL(blob);

  return imageURL;
}


const Login = () => {
  const toast = useRef(null);
  const router = useRouter();

  const [studentData, setStudentData]=useState(null)
  const [loading, setLoading] = useState(false)

  const show = (data, servity) => {
    toast.current.show({
      severity: servity,
      detail: data,
      life: 4000,
    });
  };

 

  const defaultValues = { roll:"" };
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });
  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp; </small>
    );
  };


  const onSubmit = async (data) => {
    
    setLoading(true)
    const newData ={
      "Id":6,
      "status":data.roll,
      "EmpId":null
    }
    const rollNumber = data.roll;
    
    axios.post(`${BASE_URL}/api/getdetail`, newData).then((response)=>{
         
         const parser = new xml2js.Parser();
            parser.parseString(response.data.data.d, (err, result) => {
                if (err) {
                    show("Error parsing XML data", 'error');
                } else {
                   const studentDetail = {
                    name:result.NewDataSet.Table2[0].FirstName[0],
                    roll:result.NewDataSet.Table2[0].RollNo[0],
                    cgpa: rollNumber.startsWith('B20') || rollNumber.startsWith('b20') ?
                    (result.NewDataSet.Table18[1].CGPA[0]) : 'N/A',
                    address:result.NewDataSet.Table2[0].PermanentState[0],
                    email:result.NewDataSet.Table2[0].EmailId[0],
                    roomNumber:result.NewDataSet.Table10[0].RoomNo[0],
                    dob:result.NewDataSet.Table2[0].DOB[0],
                    degree:result.NewDataSet.Table1[0].Degree[0],
                    phoneNumber:result.NewDataSet.Table2[0].StuMobNo[0],
                    hostelName:result.NewDataSet.Table10[0].HostelName[0],
                    category:result.NewDataSet.Table2[0].Category[0],
                    bloodGroup:result.NewDataSet.Table2[0].BloodGroup[0],
                    photo:result.NewDataSet.Table17[0].PhotoContent[0],
                    score:result.NewDataSet.Table13[0].Score[0],
                    rank:result.NewDataSet.Table13[0].Rank[0],
                   }
                   const jpegURL = convertBase64ToJPEG(studentDetail.photo);
                   setStudentData(studentDetail)
                   show('Successfully Fetched Data From OAS','success')
                   
                   //sending data to database
                    axios.post(`${BASE_URL}/api/postdetail`,studentDetail)
                    .then((response)=>{
                      // console.log(response);
                      show(response.data.msg,'success')
                    })
                    .catch((err)=>{
                      console.log(err);
          
                      show('Error in sending data','error')
                    })
                 
                    setLoading(false)
                }
            });
    })
    .catch((errors)=>{
      show("Error in fetching data",'error')
      setLoading(false)
    })
    
   
  };
  useEffect(() => {
  }, [studentData]); 

  return (
    <div className="">
     

      <Toast ref={toast} />
      <div className=" absolute ">
      <NavBar />
        <div className=" w-screen">
          <h1 className="text-[#353B50] font-bold text-2xl text-center select-none my-5">
            Enter your Roll Number  and  get{" "}
            <span className="text-[#EC4899]  ">Detail</span>
          </h1>

        </div>  
        <div className="flex justify-center ">
          <div className="bg-white  md:w-[25rem] mx-10 px-4 shadow-xl rounded-xl mb-5 pt-12">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-column gap-2"
            >
              <div className="  flex flex-col ">
                <div className="flex flex-col gap-4 ">
                  <div className="card flex justify-content-center">
                    <div className="w-full">
                      <Controller
                        name="roll"
                        control={control}
                        rules={{
                          required: "Roll Number is Required.",
                          pattern: {
                            pattern: /^[A-Z]{0,2}\d{5}$/,
                            message: "Invalid Roll Number",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <>
                            <label
                              htmlFor={field.name}
                              className={classNames({
                                "p-error": errors.value,
                              })}
                            ></label>
                            <span className="p-float-label">
                              <InputText
                                id={field.name}
                                value={field.value}
                                className={classNames({
                                  "p-invalid": fieldState.error,
                                  "w-full": true,
                                })}
                                onChange={(e) => field.onChange(e.target.value)}
                                keyfilter="alphanum"
                              />
                              <label htmlFor={field.name}>Roll Number</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  
                </div>

                <div className="flex justify-center mt-4 mb-4">
                  <Button
                    label={loading ? "Fetching Data" :"Show Data"}
                    className="w-full"
                    icon="pi pi-check"
                    loading={loading}
                  />
                </div>
             

                
              </div>
            </form>
            
          </div>


        </div>
        
        <div>
      
           
          <div className=" container mx-auto  flex justify-center">
            {

            
                   studentData && <Student studentData ={studentData}  />
            }
                </div>
          </div>
         
          
      </div>
    </div>
  );
};

export default Login;
