import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

function JobDescription() {
  const dispatch = useDispatch(); 
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  // State to track if the user has applied
  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        dispatch(setSingleJob(res.data.updatedJob)); // Updated job received from the API
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          // Set if the user has already applied after fetching the job
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div>
            <Badge className="text-blue-700 font-bold" variant="ghost">Position: {singleJob?.position}</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`rounded-full ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#5a0891] hover:bg-[#5a0891]'}`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">0-5 Years </span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length || 0}</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{new Date(singleJob?.createdAt).toLocaleDateString()}</span></h1>
      </div>
    </div>
  );
}

export default JobDescription;
