import { createBrowserRouter } from "react-router-dom";
// import NavBar from "../layouts/NaveBar/NavBar";
// import User from "../pages/User"
// import Main from "../pages/Main";
import addNewDoctor from "../pages/Register/RegisterDoctor"
import Login from "../pages/Login/Login";
export const router = createBrowserRouter([
  {
    path: "*",
    element: < Login/>,
  },
//   {
//     path: "/",
//     element: <Main />,
//     children: [{ path: "/nav", element: <NavBar /> }],
//   },
]);
