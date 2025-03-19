import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/shared/Navbar"

import Home from "./components/Home"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/Admin/Companies"
import CompaniesCreate from "./components/Admin/CompaniesCreate"
import CompaniesSetup from "./components/Admin/CompaniesSetup"
import AdminJobs from "./components/Admin/AdminJobs"
import PostJob from "./components/Admin/PostJob"
import Applicants from "./components/Admin/Applicants"
import ProtectedRoute from "./components/Admin/ProtectedRoute"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />

  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  // now start for admin.
  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute> 
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CompaniesCreate/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element: <ProtectedRoute><CompaniesSetup/></ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }
])



function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
