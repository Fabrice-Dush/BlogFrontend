import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Blog from "./pages/Blog";
import PageNav from "./components/PageNav";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const url = "https://blogbackend-f35b.onrender.com/api/v1/blogs";

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
