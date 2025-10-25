/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

/* eslint-disable react/no-unescaped-entities */
function Blog() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  async function handleDelete(event) {
    try {
      event.preventDefault();

      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      //? Display success message
      toast.success(data.message);

      navigate("/blogs");
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(
    function () {
      const fetchBlog = async function () {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(`${url}/${id}`);
          const data = await res.json();

          if (!res.ok) throw new Error(data.message);

          setBlog(data.data.blog);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          setError(err.message);
        }
      };
      fetchBlog();
    },
    [id]
  );

  return (
    <div className="container">
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <article className="Blog">
          <header className="Blog__header">
            <div className="Blog__header__left">
              <div className="Blog__author">
                <div className="Blog__author__img__box">
                  <img
                    src="https://mockmind-api.uifaces.co/content/human/30.jpg"
                    alt={`Photo of ${blog.author}`}
                    className="Blog__author__img"
                  />
                </div>
                <div className="Blog__author__box">
                  <p className="Blog__author__name">Posted By {blog.author}</p>
                  <p className="Blog__author__date">
                    On {new Date(blog.date).toDateString()} &mdash; {blog.read}{" "}
                    read
                  </p>
                </div>
              </div>
            </div>
            <div className="Blog__author__right">
              <Link
                to={`/blogs/update/${blog._id}`}
                className="btn btn--md btn--green"
              >
                Update Blog
              </Link>
              <a
                href="#"
                className="btn btn--md btn--pink"
                onClick={handleDelete}
              >
                Delete Blog
              </a>
            </div>
          </header>
          <img src={blog.image} alt={blog.title} className="Blog__img" />
          <div className="Blog__content">
            <p className="Blog__title Blog__title__page">{blog.title}</p>
            <p className="Blog__description">{blog.description}</p>
            <p className="Blog__description">{blog.description}</p>

            {blog.points?.length > 0 ? (
              <>
                <p className="Blog__last">
                  Not sure which one you should choose?Below are different
                  reasons you should choose each:
                </p>
                <ul className="Blog__list">
                  {blog.points.map((point, idx) => (
                    <li className="Blog__item" key={idx}>
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="Blog__description">{blog.description}</p>
              </>
            )}
            <div className="like__container">
              <div className="like__el" style={{ display: "none" }}>
                <ion-icon name="heart-outline" className="like"></ion-icon>
              </div>
              <div className="like__el">
                <ion-icon name="heart" className="like"></ion-icon>
                <p className="like__text">5</p>
              </div>
            </div>
            <form className="form form--comment">
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Comment..."
                  className="form__input"
                />
                <button className="btn btn--small btn--green">Comment</button>
              </div>
            </form>

            <div className="comments">
              <div className="comment">
                <img src="../img/face1.jpg" className="comment__img" />
                <p className="comment__email">@dushimimana@gmail.com</p>
                <p className="comment__text">This is awesome stuff</p>
              </div>
              <div className="comment">
                <img src="../img/face2.jpg" className="comment__img" />
                <p className="comment__email">@dushimimana@gmail.com</p>
                <p className="comment__text">This is awesome stuff</p>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

export default Blog;
