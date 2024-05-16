import { createBrowserRouter } from "react-router-dom";


import User from "../pages/User/User"
import Schedual from "../pages/Schedual/Schedual"
import Notes from "../pages/Notes/Notes"
import RegisterPatient from "../pages/Register/RegisterPatient";
import PatientOrDoctor from "../pages/Register/PatientOrDoctor"
import About from "../pages/About/About"
import Appointment from "../pages/Appointment/Appointment"
import ContactUs from "../pages/ContactUs/ContactUs"
import RegisterDoctor from "../pages/Register/RegisterDoctor";
import Login from "../pages/Login/Login";
import DocProvider from "../pages/Provider/Provider"
import NotFound from "../pages/NotFound/NotFound"
import Diagnosis from "../pages/Diagnosis/Diagnosis"
import Landing from "../pages/Landing/Landing"
import Main from "../layouts/Main";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
  
  {
    path: "/Register",
    element: <PatientOrDoctor/>,
  },
  {
    path: "/Register_Provider",
      element: <RegisterDoctor/>,
    },
    {
      path: "/Register_patient",
        element: <RegisterPatient/>,
      },
{
  path: "/About",
    element: <About/>,
  },
  {
    path: "/Appointment",
      element: <Appointment/>,
    },
    {
      path: "/ContactUs",
        element: <ContactUs/>,
      },
      {
        path: "/Diagnosis",
          element: <Diagnosis/>,
        },
        {
          path: "/",
            element: <Landing/>,
          },
          {
            path: "/Login",
              element: <Login/>,
            },
            {
              path: "/Notes",
                element: <Notes/>,
              },
              {
                path: "/Schedual",
                  element: <Schedual/>,
                },
                {
                  path: "/Provider",
                    element: <DocProvider/>,
                  },
                  {
                    path: "/User",
                      element: <User/>,
                    },
              {
                path: "*",
                  element: <NotFound/>,
                },]}])
