import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from "../Layout/Home/Home";
import Root from "../Layout/Root/Root";
import SignUp from "../Layout/SignUp/SignUp";
import Login from "../Layout/Login/Login";
import useAxiosrequest from "../Hooks/useAxiosrequest";
import Dashboard from "../DashboardLayout/Dashboard/Dashboard";
import MyTask from "../DashboardLayout/MyTask/MyTask";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
const Routes = () => {
  const axiosrequest = useAxiosrequest()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
      ]
    },
    {
      path: "dashboard",
      element: <PrivetRoute><Dashboard /></PrivetRoute>,
      children: [
        {
          path: '/dashboard',
          element: <PrivetRoute><MyTask /></PrivetRoute>
        },
        // {
        //   path:'mytask',
        //   element: <MyTask/>
        // }
      ]
    },
  ]);
  return <RouterProvider router={router} />
}

export default Routes
