import { useNavigate } from "react-router-dom";
import { url } from "../App";
import { useState } from "react";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

function CreateBlog() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);

      const formData = new FormData(event.target);
      const obj = Object.fromEntries([...formData]);
      formData.append("image", obj.image.name);

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log(data);

      //? success message
      setIsLoading(false);
      toast.success(data.message);

      setTimeout(() => {
        navigate("/blogs");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  }

  return (
    <section className="section-cta">
      <form className="Form" onSubmit={handleSubmit}>
        <p className="Form__title">Create a new blog here</p>
        <div className="Form__group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="Form__input"
            required
          />
        </div>
        <div className="Form__group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="Form__input"
            required
          />
        </div>
        <div className="Form__group">
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            name="summary"
            id="summary"
            className="Form__input"
            required
          />
        </div>
        <div className="Form__group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
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

export default CreateBlog;
