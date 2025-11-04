/* eslint-disable  */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TIMEOUT_SEC, url } from "../App";
import Spinner from "../components/Spinner";
import timeout from "../utils/timeout";
import { toast } from "react-toastify";

function Blogs({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    const fetchBlogs = async function () {
      try {
        setIsLoading(true);
        setError("");

        const res = await Promise.race([
          fetch(`${url}/blogs`),
          timeout(TIMEOUT_SEC),
        ]);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setBlogs(data.data.blogs);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err);
        toast.error(err.message);
        console.error(`⛔⛔ ${err}`);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="section__blogs">
      <div className="container blogs__header">
        <div className="blogs__left">
          <h3 className="heading-tertiary">Daily blogs</h3>
          <p className="blogs__header__wrapper">
            <span>Posts</span>
          </p>
          <p className="blogs__header__text">
            Free posts, guides, and tutorials to learn in demand skills, get
            hired and advance your career
          </p>
        </div>
        <div className="blogs__right">
          {user && (
            <Link to="/blogs/create" className="blogs__link">
              Create a new blog
            </Link>
          )}
        </div>
      </div>
      <div className="container blogs">
        {isLoading && <Spinner />}
        {!isLoading &&
          !error &&
          blogs.length > 0 &&
          blogs.map((blog) => <Blog blog={blog} key={blog.id} />)}
        {!isLoading && !error && blogs.length === 0 && (
          <p className="text--big">Blogs that you create will appear here...</p>
        )}
      </div>
    </section>
  );
}

function Blog({ blog }) {
  return (
    <article className={`blog blog--${blog.id + 1}`}>
      <img src={blog.image} alt={blog.title} className="blog__img" />
      <div className="blog__content">
        <div className="blog__header">
          <p className="blog__date">{new Date(blog.date).toDateString()}</p>
          <span className="dot"></span>
          <p className="blog__read">{blog.read} read</p>
        </div>
        <p className="blog__title">{blog.title}</p>
        <p className="blog__text">{blog.summary}</p>
        <div className="blog__owner">
          <img
            src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
            alt="Blog writer image"
            className="blog__owner-img"
          />
          <p className="blog__owner-name">{blog.user.name}</p>
        </div>
        <div className="blog__bottom">
          <p className="blog__tag">{blog.tags.at(0)}</p>
          <Link to={`/blogs/${blog.id}`} className="blog__view">
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Blogs;
