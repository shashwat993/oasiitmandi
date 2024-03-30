'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react';

import axios from 'axios';

import reducer from '@/reducer/studentReducer'

const AppContext = createContext();

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;




const useStudentContext = () => useContext(AppContext);

const initialState = {
    isLoading:true,
    isError: false,
    students: [],
}

const AppProvider = ({children}) =>{
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const getStudentDatail = async (url) =>{
        dispatch({ type: "SET_LOADING" })
        try {
             const response = await axios.get(url);
             const student = await response.data
    
             dispatch( { type: "SET_API_DATA", payload:student } );
        } catch (error) {
            dispatch( {type:"API_ERROR"} )
        }

    }

    const sorting = (sortValue) => {
        dispatch({ type: "GET_SORT_VALUE", payload: sortValue });
    };

    const filterStudents = (filterValue)=>{
        dispatch({ type: "FILTER_STUDENT", payload: filterValue })
    }
    const searchPost = (searchQuery) =>{
        dispatch({ type: "SEARCH_STUDENT", payload:searchQuery })
    }


    useEffect(() => {
        const fetchData = async () => {
            // Fetch student data
            await getStudentDatail(`${BASE_URL}/api/showdata`);
    
            // Dispatch the sorting action with the default sorting value
            sorting("ROLL_NUMBER");
        };
    
        fetchData();
    }, []);
    

    return <AppContext.Provider value={{ ...state, sorting,filterStudents,searchPost }} >{ children }</AppContext.Provider>
}


export { AppProvider, useStudentContext }