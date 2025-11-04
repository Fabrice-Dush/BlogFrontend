/* eslint-disable */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Blog from "./pages/Blog";
import PageNav from "./components/PageNav";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerification from "./pages/EmailVerification";
import { useState } from "react";
import Logout from "./pages/Logout";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

//!Remember to change this before pushing to github
import ForgotPassword from "./pages/ForgotPassword";

export const TIMEOUT_SEC = 20;
export const url = "http://localhost:8000/api/v1";
// export const url = "https://blogbackend-f35b.onrender.com/api/v1";

function App() {
  const [user, setUser] = useState(function () {
    return JSON.parse(localStorage.getItem("user")) ?? null;
  });

  return (
    <>
      <BrowserRouter>
        <PageNav user={user} />
        <Routes>
          <Route path="/" element={<Blogs user={user} />}>
            <Route path="/blogs" element={<Blogs user={user} />} />
          </Route>

          <Route
            path="/blogs/create/"
            element={
              user ? <CreateBlog user={user} /> : <Navigate to="/login" />
            }
          />

          <Route path="/blogs/:id" element={<Blog user={user} />} />
          <Route
            path="/blogs/update/:id"
            element={
              user ? <UpdateBlog user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyEmail/:token" element={<EmailVerification />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
