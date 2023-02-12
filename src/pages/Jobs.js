import React from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";

const Jobs = () => {
  const navigate = useNavigate();
  const{ data,isLoading,isError} = useGetJobsQuery();
  // const {position,companyName} = data.data || {};

  // if(isLoading){
  //   <p>Loading.....</p>
  // }
  
  
  return (
    <div className='pt-14'>
      <h1>This is job page</h1>
      <div className=' p-5 rounded-2xl'>
       {/* { 
        data?.data?.map((jobData)=>(<div> 
          <h1>{jobData?.position}</h1>
          <p>{jobData?.companyName}</p>
        
        <button onClick={()=>navigate(`/job-details/${jobData?._id}`)}>Details</button>
        </div>))
       } */}
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
      { 
        data?.data?.map((jobData)=><JobCard jobData= { jobData}/>)
       }
        
      </div>
    </div>
  );
};

export default Jobs;
