import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContext from "./context/AppContext";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import AssignmentDetails from "./pages/AssignmentDetails.jsx";
import ViewStudentPerformance from "./pages/ViewStudentPerformance.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContext>
        <MainLayout />
      </AppContext>
    ),
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/assignment/:id",
            element: <AssignmentDetails />,
          },
          {
            path: "/students/:id",
            element: <ViewStudentPerformance />,
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AppContext>
        <Login />
      </AppContext>
    ),
  },
  {
    path: "/signup",
    element: (
      <AppContext>
        <Signup />
      </AppContext>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);