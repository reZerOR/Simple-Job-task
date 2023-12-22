import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import AddTask from "../Pages/Addtask/AddTask";
import PreviousTasks from "../Pages/PreviousTasks.jsx/PreviousTasks";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "addtask",
        element: <AddTask></AddTask>,
      },
      {
        path: "preavioustasks",
        element: <PreviousTasks></PreviousTasks>,
      },
    ],
  },
]);
export default router;
