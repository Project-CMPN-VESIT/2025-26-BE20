import { useCallback, useEffect, useState } from "react"
import { guestAxios } from './../config/guestAxios';

export const useFetchGuest = (url) =>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null);


    const fetchData = useCallback(async(signal)=>{
        setLoading(true);
        try{
            const response = await guestAxios({
                url:url,
                signal:signal,
            })
            if(response.status === 200){
                setData(response?.data?.data)
            }
        }catch(e){
            if(e.response && e.response.status === 400){
                setError(e.response.data.data);
            }
        }
        finally{
            setLoading(false);
        }


    },[url])

    useEffect(()=>{
        const controller = new AbortController();
        (async()=>{
            await fetchData(controller.signal);
        })();
    },[fetchData])

    return {data,error,loading,fetchData};
}