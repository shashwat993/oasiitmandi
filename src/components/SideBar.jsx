import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { BsFilterRight } from "react-icons/bs";
import { Divider } from 'primereact/divider';
import { useStudentContext } from "@/context/studentContext";
import Filters from './Filters';

export default function SideBar({ NumberOfStudent }) {
    const [visible, setVisible] = useState(false);
    const [currentSorting, setCurrentSorting] = useState("ROLL_NUMBER"); // Set initial sorting to "ROLL_NUMBER"
    const { sorting } = useStudentContext();

    const handleSorting = (sortValue) => {
        sorting(sortValue);
        setCurrentSorting(sortValue);
        setVisible(false);
    };

    useEffect(() => {
        // Highlight the "Roll Number" sorting initially
        setCurrentSorting("ROLL_NUMBER");
    }, []);

    return (
        <div className="card flex justify-content-center ">
            <Sidebar visible={visible} onHide={() => setVisible(false)} className="w-[75%] sm:w-17rem  lg:w-20rem">
                <Divider align="left">
                   <h1 className='text-center text-lg md:text-xl '>SORT BY</h1>
                </Divider>
               
                <div className='text-md md:text-lg flex flex-col gap-2 mt-2 text-nowrap  text-black font-medium px-1 md:px-2 text-center cursor-default my-4' id='sort'>
                    <p onClick={() => handleSorting("ROLL_NUMBER")} className={currentSorting === "ROLL_NUMBER" ? "bg-pink-500 text-white rounded-md py-2 shadow-md text-nowrap select-none" : ""}> Roll Number</p>
                    <p onClick={() => handleSorting("CGPA_HIGH_TO_LOW")} className={currentSorting === "CGPA_HIGH_TO_LOW" ? "bg-pink-500 text-white rounded-md py-2 shadow-md text-nowrap select-none" : ""}> CGPA -- High to Low</p>
                    <p onClick={() => handleSorting("CGPA_LOW_TO_HIGH")} className={currentSorting === "CGPA_LOW_TO_HIGH" ? "bg-pink-500 text-white rounded-md py-2 shadow-md text-nowrap select-none" : ""}> CGPA -- Low to High</p>
                    <p onClick={() => handleSorting("JEE_SCORE_LOW_TO_HIGH")} className={currentSorting === "JEE_SCORE_LOW_TO_HIGH" ? "bg-pink-500 text-white rounded-md py-2 shadow-md text-nowrap select-none" : ""}> JEE score -- Low to High</p>
                    <p onClick={() => handleSorting("JEE_SCORE_HIGH_TO_LOW")} className={currentSorting === "JEE_SCORE_HIGH_TO_LOW" ? "bg-pink-500 text-white rounded-md py-2 shadow-md text-nowrap select-none" : ""}> JEE score -- High to Low</p>
                    <p onClick={() => handleSorting("DOB_YOUNGER_TO_OLDER")} className={currentSorting === "DOB_YOUNGER_TO_OLDER" ? "bg-pink-500 text-white rounded-md py-2 shadow-md text-nowrap select-none" : ""}> DOB -- Younger to Older</p>
                    <p onClick={() => handleSorting("DOB_OLDER_TO_YOUNGER")} className={currentSorting === "DOB_OLDER_TO_YOUNGER" ? "bg-pink-500 text-white rounded-md py-2 shadow-md text-nowrap select-none" : ""}> DOB -- Older to Younger</p>
                </div>
                <Divider align="left">
                   <h1 className='text-center text-lg md:text-xl '>FILTERS</h1>
                </Divider>
                <div >
                    <Filters hideSidebar={() => setVisible(false)} />
                </div>


            </Sidebar>
            <div className='container mx-auto mt-10'> 
                <div className='flex justify-start gap-5 w-screen px-5'>
                    <Button onClick={() => setVisible(true)} className='px-2 py-2'  >
                        <BsFilterRight size={30} />
                        <p className=' text-md md:text-lg font-medium mx-2' >Filters</p>
                    </Button>
                    <h2 className='text-md md:text-xl flex items-center font-bold'>{NumberOfStudent} Students</h2>
                </div>
            </div>
        </div>
    );
}
