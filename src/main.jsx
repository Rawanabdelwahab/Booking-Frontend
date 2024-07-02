/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import Booking from "./components/Booking.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/RegisterForm",
    element: <RegisterForm />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/Booking",
    element: (
      <ProtectedRoute>
        <Booking />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
