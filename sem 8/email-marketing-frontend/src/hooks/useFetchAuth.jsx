import { useCallback, useEffect, useState } from "react";
import authAxios from "../config/AuthAxios";

export const useFetchAuth = (url)=>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async(signal)=>{
        setLoading(true);
        try{
            const response  = await authAxios({
                url: url,
                signal: signal,
            })
            if(response.status===200){
                setData(response?.data?.data);
            }
        } catch(e){
            if(e.response){
                setError(e.response.data.message);
            }
        } finally{
            setLoading(false);
        }
    },[url])

    useEffect(()=>{
        const controller = new AbortController();
        (async()=>{await fetchData(controller.signal)} )();
    },[fetchData])

    return {data,error,loading,fetchData};
}