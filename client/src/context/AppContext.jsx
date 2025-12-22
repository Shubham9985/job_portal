import React, { useEffect } from "react";
import  {createContext , useState} from 'react';
import { jobsData } from "../assets/assets";


export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    const [searchFilter , setSearchFilter ] = useState(
        {
            title : '',
            location : ''
        }
    )

    const [isSearched , setIsSeached] = useState(false)

    const[jobs , setJobs ] = useState([])

    //function to fetch jobs
    const fetchJobs = async()=>{
        setJobs(jobsData)
    }

    useEffect(()=>{
        fetchJobs()
    },[])
    
    const value = {
        setSearchFilter , searchFilter ,
        isSearched, setIsSeached , jobs , setJobs
    }

    return (<AppContext.Provider value={value}>
         {props.children}
    </AppContext.Provider>)
}