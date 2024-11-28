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
import AddPrinter from "./pages/Sidebar/AddPrinter";
import Payment from "./pages/Sidebar/Payment";
import UploadFilePage from "./pages/Sidebar/UploadFile";
import FileConfigurationPage from "./pages/Printer/FileConfiguration";
import { ToastContainer } from "react-toastify";
// import Report from "./pages/Sidebar/Report";
import StudentReport from "./pages/Sidebar/StudentReport";
import StudentRegister from "./pages/Register/StudentRegister";
import AdminRegister from "./pages/Register/AdminRegister";
import PrintRequests from "./pages/Sidebar/PrintRequests";
import GenerateReport from "./pages/Sidebar/GenerateReport";
import ConfirmDocument from "./pages/Sidebar/ConfirmDocument";
import { RatingPageStudent } from "./pages/Rating/RatingPrinting";
import { RatingPageAdmin } from "./pages/Rating/RatingPrintingAdmin";
// import PrivateRoute from './router/PrivateRoutes'
import Rating from "./pages/Sidebar/Rating";
import PublicRoute from "./public/PublicRoute";
import PrivateRoute from "./admin/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
function App() {
  return (
    <>
      <Routes>
        {/* <Route
          path="/"
          element={
            // <DashboardLayout>
            <Home />
            // </DashboardLayout>
          }
        ></Route> */}

        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>

        <Route
          path="/register/student"
          element={
            <PublicRoute>
              <StudentRegister />
            </PublicRoute>
          }
        />
        <Route
          path="/register/admin"
          element={
            <PublicRoute>
              <AdminRegister />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Payment"
          element={
            <PrivateRoute studentOnly={true}>
              <DashboardLayout>
                <Payment />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/printers"
          element={
            <PrivateRoute studentOnly={true}>
              <DashboardLayout>
                <Printers />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/uploadFile/fileConfigurationPage"
          element={
            <PrivateRoute studentOnly={true}>
              <DashboardLayout>
                <FileConfigurationPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/uploadFile"
          element={
            <PrivateRoute studentOnly={true}>
              <DashboardLayout>
                <UploadFilePage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <UserProfile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/studentreport"
          element={
            <PrivateRoute studentOnly={true}>
              <DashboardLayout>
                <StudentReport />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/confirm"
          element={
            <PrivateRoute studentOnly={true}>
              <DashboardLayout>
                <ConfirmDocument />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/student/rating/:idPrinting"
          element={
            <PrivateRoute studentOnly={true}>
              <DashboardLayout>
                <RatingPageStudent />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/rating/:idPrinting"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <RatingPageAdmin />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/userlist"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <UserList />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/admin/report"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <Report />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        /> */}

        <Route
          path="/admin/printerlist"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <AdminPrinterList />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/addprinter"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <AddPrinter />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/printrequests"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <PrintRequests />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/Rating"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <Rating />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/generate"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <GenerateReport />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Route cho 404 - Bất kỳ đường dẫn nào không khớp */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
