/* eslint-disable */
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../App";
import { toast } from "react-toastify";
import Svg from "../components/Svg";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");

  const handleSetType = function () {
    setType((type) => (type === "text" ? "password" : "text"));
  };

  const handleSubmit = async function (event) {
    try {
      event.preventDefault();
      if (!email.trim() || !password.trim()) return;

      setIsLoading(true);
      const res = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const user = { user: data.data.user, token: data.token };

      setIsLoading(false);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(data.message);

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <form className="form form--login" onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form__input"
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
        />
      </div>
      <div className="form__group">
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          type={type}
          name="password"
          autoComplete="on"
          placeholder="........"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form__input"
          required
        />
        <Svg type={type} onClick={handleSetType} />

        <Link to="/forgotPassword" className="form__forgot">
          Forgot your password ?
        </Link>
      </div>
      <div className="form__group">
        <button
          className={`btn btn--submit${isLoading ? " loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="form__additional">
          Don't have an account ?<Link to="/signup"> Signup here</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
