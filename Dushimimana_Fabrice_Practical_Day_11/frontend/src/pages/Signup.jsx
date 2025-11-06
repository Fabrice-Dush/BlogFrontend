/* eslint-disable */
import { useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../App";
import { toast } from "react-toastify";
import Svg from "../components/Svg";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState("password");

  const handleSetType = function () {
    setType((type) => (type === "text" ? "password" : "text"));
  };

  const handleSetTypeConfirm = function () {
    setTypeConfirm((typeConfirm) =>
      typeConfirm === "text" ? "password" : "text"
    );
  };

  const handleSubmit = async function (event) {
    try {
      event.preventDefault();

      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !passwordConfirm.trim()
      )
        return;

      setIsLoading(true);

      const res = await fetch(`${url}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <form className="form form--login" onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="fullname" className="form__label">
          Fullname
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form__input"
          autoComplete="on"
          placeholder="Dios Ella"
          required
        />
      </div>
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form__input"
          autoComplete="on"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="........"
          className="form__input"
          required
        />
        <Svg type={type} onClick={handleSetType} />
      </div>
      <div className="form__group">
        <label htmlFor="passwordConfirm" className="form__label">
          Confirm Password
        </label>
        <input
          type={typeConfirm}
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="........"
          className="form__input"
          required
        />
        <Svg type={typeConfirm} onClick={handleSetTypeConfirm} />
      </div>
      <div className="form__group">
        <button
          className={`btn btn--submit${isLoading ? " loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? `Signing up...` : "Signup"}
        </button>
        <p className="form__additional">
          Already have an account ? <Link to="/login">Login here</Link>
        </p>
      </div>
    </form>
  );
}

export default Signup;
