import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllModels from "../Pages/AllModels/AllModels";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
import AddModel from "../Pages/AddModel/AddModel";
import ModelDetails from "../Pages/ModelDetails/ModelDetails";
import UpdateModel from "../Pages/UpdateModel/UpdateModel";
import MyModels from "../Pages/MyModels/MyModels";
import MyDownloads from "../Pages/MyDownloads/MyDownloads";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`http://localhost:3000/latest-models?t=${new Date().getTime()}`)
      },
      {
        path: "/all-models",
        element: <AllModels />,
        loader: () => fetch(`http://localhost:3000/baseC?t=${new Date().getTime()}`)
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/add-model",
        element: <AddModel />,
      },
      {
        path: "/model-details/:id",
        element: <ModelDetails />,
      },

       {
        path: "/my-models",
        element: <MyModels />,
      },

       {
        path: "/my-downloads",
        element: <MyDownloads />,
      },

        {
        path: "/update-model/:id",
        element: <UpdateModel />,
        loader: ({params}) => fetch(`http://localhost:3000/baseC/${params.id}?t=${new Date().getTime()}`)
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);
