import { BrowserRouter, Route, Routes } from "react-router-dom";
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

// export const url = "https://blogbackend-f35b.onrender.com/api/v1/blogs";
export const url = "http://localhost:8000/api/v1/blogs";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageNav />
        <Routes>
          <Route path="/" element={<Blogs />}>
            <Route path="/blogs" element={<Blogs />} />
          </Route>
          <Route path="/blogs/create/" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs/update/:id" element={<UpdateBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
