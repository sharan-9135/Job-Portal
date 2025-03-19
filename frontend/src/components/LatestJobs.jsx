import React from 'react';
import LatestJobscard from './LatestJobscard';
import { useSelector } from 'react-redux';

function LatestJobs() {
  const { allJobs = [], loading, error } = useSelector((store) => store.job); // Ensure allJobs is an array by default

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error}</div>;
  }

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold '>
        <span className='text-[#6A38C2]'>Latest & Top</span> Jobs Opening
      </h1>

      {Array.isArray(allJobs) && allJobs.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobscard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <span>No job available</span>
      )}
    </div>
  );
}

export default LatestJobs;
