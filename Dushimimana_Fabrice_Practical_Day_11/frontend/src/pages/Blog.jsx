/* eslint-disable */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TIMEOUT_SEC, url } from "../App";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import timeout from "../utils/timeout";

function Blog({ user }) {
  const id = useParams().id;
  const navigate = useNavigate();

  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  //? derived state
  const isTrue =
    blog.user?.id === user?.user?.id || user?.user?.role === "admin";

  const hasLiked = likes?.some((like) => like?.id === user?.user?.id);

  async function getComments() {
    try {
      const res = await fetch(`${url}/blogs/${blog._id}/comments`, {
        method: "GET",
        headers: { authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setComments(data.data.comments);
    } catch (err) {
      throw err;
    }
  }

  async function handleComment(event) {
    try {
      event.preventDefault();

      if (!user) return toast.error("Login to make your opinion count");

      setIsLoadingComment(true);
      const commentUrl = `${url}/blogs/${blog._id}/comments`;

      const res = await fetch(commentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ comment }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await getComments();

      setComment("");
      setIsLoadingComment(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoadingComment(false);
    }
  }

  async function handleUpdateComment(event) {
    try {
      event.preventDefault();

      setIsLoadingComment(true);
      const res = await fetch(
        `${url}/blogs/${blog._id}/comments/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await getComments();

      setComment("");
      setIsUpdating(false);
      setIsLoadingComment(false);
    } catch (err) {
      console.error(err);
      toast.error(err);
      setIsLoadingComment(false);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      const res = await fetch(
        `${url}/blogs/${blog._id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${user.token}` },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await getComments();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteBlog(event) {
    try {
      const res = await fetch(`${url}/blogs/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${user.token}` },
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

  async function handleLike() {
    try {
      if (!user?.user) return toast.error("Login to spread your love");

      //? Update the likes on the frontend first
      if (likes.some((like) => like.id === user?.user?.id)) {
        setLikes((likes) => likes.filter((like) => like.id !== user?.user?.id));
      } else {
        setLikes((likes) => [...likes, user?.user]);
      }

      //? then send the request to the backend
      const res = await fetch(`${url}/blogs/${id}/likes`, {
        method: "PATCH",
        headers: { authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
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
          const res = await Promise.race([
            fetch(`${url}/blogs/${id}`),
            timeout(TIMEOUT_SEC),
          ]);

          const data = await res.json();

          if (!res.ok) throw new Error(data.message);

          setBlog(data.data.blog);
          setComments(data.data.blog.comments);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          setError(err.message);
          toast.error(err.message);
        }
      };
      fetchBlog();
    },
    [id]
  );

  useEffect(
    function () {
      if (blog.likes?.length > 0) setLikes(blog.likes);
    },
    [blog.likes]
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
                    src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                    alt={`Photo of ${blog.author}`}
                    className="Blog__author__img"
                  />
                </div>
                <div className="Blog__author__box">
                  <p className="Blog__author__name">
                    Posted By {blog.user?.name}
                  </p>
                  <p className="Blog__author__date">
                    On {new Date(blog.date).toDateString()} &mdash; {blog.read}{" "}
                    read
                  </p>
                </div>
              </div>
            </div>
            <div className="Blog__author__right">
              {user?.user && isTrue && (
                <>
                  <Link
                    to={`/blogs/update/${blog._id}`}
                    className="btn btn--md btn--green"
                  >
                    Update Blog
                  </Link>
                  <Link
                    href="#"
                    className="btn btn--md btn--pink"
                    onClick={handleDeleteBlog}
                  >
                    Delete Blog
                  </Link>
                </>
              )}
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
              <div className="like__el" onClick={handleLike}>
                {user?.user && hasLiked ? (
                  <ion-icon name="heart" className="like"></ion-icon>
                ) : (
                  <ion-icon name="heart-outline" className="like"></ion-icon>
                )}
                <p className="like__text">{likes.length || ""}</p>
              </div>
            </div>

            {!isUpdating ? (
              <Form
                onSubmit={handleComment}
                comment={comment}
                setComment={setComment}
                isLoadingComment={isLoadingComment}
              >
                {isLoadingComment ? "Commenting..." : "Comment"}
              </Form>
            ) : (
              <Form
                onSubmit={handleUpdateComment}
                comment={comment}
                isLoadingComment={isLoadingComment}
                setComment={setComment}
                content={comment}
              >
                {isLoadingComment ? "Updating..." : "Update"}
              </Form>
            )}

            <div className="comments">
              {comments?.map((comment) => {
                const isTrue =
                  comment?.user?.id === user?.user?.id ||
                  user?.user?.role === "admin";

                return (
                  <div className="comment" key={comment._id}>
                    <img
                      src={
                        comment?.user?.photo ??
                        `https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png`
                      }
                      className="comment__img"
                    />
                    <p className="comment__email">@{comment?.user?.email}</p>
                    <p className="comment__text">{comment.comment}</p>
                    <div className="comment__actions">
                      {user && isTrue && (
                        <>
                          <Link
                            to="#"
                            className="comment__btn comment__edit"
                            onClick={(event) => {
                              event.preventDefault();

                              setIsUpdating(true);
                              setCommentId(comment._id);
                              setComment(comment.comment);
                            }}
                          >
                            Edit
                          </Link>
                          <Link
                            to="#"
                            className="comment__btn comment__delete"
                            onClick={(event) => {
                              event.preventDefault();

                              handleDeleteComment(comment._id);
                            }}
                          >
                            Delete
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

function Form({ comment, setComment, isLoadingComment, onSubmit, children }) {
  return (
    <form className="form form--comment" onSubmit={onSubmit}>
      <div className="form__group">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment..."
          className="form__input"
          required
        />
        <div className="comment__btn__container">
          <button
            className={`btn btn--small btn--green${
              isLoadingComment ? " loading" : ""
            }`}
            disabled={isLoadingComment}
          >
            {children}
          </button>
          <button
            className="btn btn--small btn--overlay"
            type="reset"
            onClick={() => setComment("")}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default Blog;
