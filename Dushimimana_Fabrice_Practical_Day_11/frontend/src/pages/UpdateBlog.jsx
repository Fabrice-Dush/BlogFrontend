/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

function UpdateBlog() {
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const id = useParams().id;
  const navigate = useNavigate();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);

      const formData = Object.fromEntries([...new FormData(event.target)]);
      formData.image = `img/${formData.image.name}`;

      const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      //? success message
      toast.success(data.message);
      setIsLoading(false);

      setTimeout(() => {
        navigate(`/blogs/${id}`);
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  }

  useEffect(
    function () {
      const fetchBlog = async function () {
        try {
          const res = await fetch(`${url}/${id}`);
          const data = await res.json();
          setBlog(data.data.blog);
        } catch (err) {
          console.error(`⛔⛔ ${err}`);
        }
      };
      fetchBlog();
    },
    [id]
  );

  return (
    <section className="section-cta">
      <form className="Form" onSubmit={handleSubmit}>
        <p className="Form__title">Update a blog here</p>
        <div className="Form__group">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" className="Form__input" />
        </div>
        <div className="Form__group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={blog.title}
            id="title"
            className="Form__input"
            required
          />
        </div>
        <div className="Form__group">
          <label htmlFor="sumMary">Summary</label>
          <input
            type="text"
            name="summary"
            defaultValue={blog.summary}
            id="summary"
            className="Form__input"
            required
          />
        </div>
        <div className="Form__group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            defaultValue={blog.description}
            className="Form__input"
            rows={5}
            cols={15}
            required
          ></textarea>
        </div>
        <button className="btn btn--big btn--green">
          Save Blog{" "}
          {<PulseLoader color="#000c18" loading={isLoading} size={10} />}
        </button>
      </form>
    </section>
  );
}

export default UpdateBlog;
