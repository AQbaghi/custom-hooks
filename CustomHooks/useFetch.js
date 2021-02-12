import { useState, useEffect } from 'react';

const useGET = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    const abortCont = new AbortController();
      
      try{
        const fetchPromise = await fetch(url, { signal: abortCont.signal });
        if (!fetchPromise.ok) { // error coming back from server
          throw Error('could not fetch data for resource');
        } 
        const data = await fetchPromise.json();
        setData(data);
        setError(null);
        setIsPending(false);
      }catch(err){
        if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
      }
     
    // abort the fetch
    return () => abortCont.abort();
    // dependency for url change
  }, [url])

  //data: the responce date
  //isPending: if the data is recieved yet
  //error: error message if any
  return { data, isPending, error };
}

const usePOST = (submition) => {
  
    const [data, setData] = useState(null);
    const [reqData, setReqData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
   

    useEffect(async ()=>{
      const abortCont = new AbortController();

      try{
        //if submit event fired, make POST fetch request
        if(submition===true){
          const fetchPromise = await fetch(reqData.url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqData)
          });
          if (!fetchPromise.ok) { // error coming back from server
            throw Error('could not fetch data for resource');
          } 
          const resData = await fetchPromise.json();
          setData(resData);
          setError(null);
          setIsPending(false);
        }
      }catch(err){
        if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
      }
      return () => abortCont.abort();
      //submition deppendency
    }, [submition]);

    //data: the responce date
    //isPending: if the data is recieved yet
    //error: error message if any
  return [{ data, isPending, error }, setReqData];
}

export {useGET, usePOST}