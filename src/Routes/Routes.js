import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import Login from "../Pages/Login/Login";
import MyTask from "../Pages/MyTask/MyTask";
import Signup from "../Pages/Signup/Signup";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children:[
        {
            path:'/',
            element:<AddTask/>
        },
        {
            path:'/my-task',
            element:<MyTask/>
        },
        {
            path:'/completed-task',
            element:<CompletedTask/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/sign-up',
            element:<Signup/>
        },
    ]
    
  },
]);

export default Routes;
