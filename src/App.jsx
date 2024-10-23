// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
// import RoomPage from './pages/RoomPage/RoomPage'
// import RoomDetails from './pages/RoomDetails/RoomDetails'

// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Sidebar from "./components/Sidebar/Sidebar";
import { Dashboard } from "./pages/Sidebar/Dashboard";
import DashboardLayout from "./components/Layout/DashBoardLayout";
import UserList from "./pages/Sidebar/UserList";
import UserProfile from "./pages/Sidebar/UserProfile";
import Printers from "./pages/Sidebar/Printers";
import AdminPrinterList from "./pages/Sidebar/AdminPrinterList";
import UploadFilePage from "./pages/Sidebar/UploadFile";
import FileConfigurationPage from "./pages/Printer/FileConfiguration";
import { ToastContainer } from "react-toastify";
// import PrivateRoute from './router/PrivateRoutes'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>

        <Route
          path="login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
            <Layout>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/printers"
          element={
            // <PrivateRoute>
            <Layout>
              <DashboardLayout>
                <Printers />
              </DashboardLayout>
            </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/printers/:userId/:fileId"
          element={
            <Layout>
              <DashboardLayout>
                <FileConfigurationPage />
              </DashboardLayout>
            </Layout>
          }
        />

        <Route
          path="/uploadFile"
          element={
            <Layout>
              <DashboardLayout>
                <UploadFilePage />
              </DashboardLayout>
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            // <PrivateRoute>
            <Layout>
              <DashboardLayout>
                <UserProfile />
              </DashboardLayout>
            </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/admin/userlist"
          element={
            // <PrivateRoute>
            <Layout>
              <DashboardLayout>
                <UserList />
              </DashboardLayout>
            </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/admin/printerlist"
          element={
            // <PrivateRoute>
            <Layout>
              <DashboardLayout>
                <AdminPrinterList />
              </DashboardLayout>
            </Layout>
            // </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
